import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProperties } from '../context/PropertiesContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminPropertyForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { addProperty, updateProperty, getProperty } = useProperties();
  const navigate = useNavigate();

  const emptyProperty = {
    title: '',
    description: '',
    type: 'venta',
    price: '',
    surface: '',
    rooms: '',
    bathrooms: '',
    address: { street: '', city: '', zip: '' },
    images: [],
    features: [''],
    featured: false,
  };

  const [form, setForm] = useState(emptyProperty);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (isEditing) {
      const existing = getProperty(id);
      if (existing) {
        setForm({ ...existing });
        setImagePreviews(existing.images || []);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setForm((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleImageUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      const newImages = [...form.images];
      newImages[index] = dataUrl;
      setForm((prev) => ({ ...prev, images: newImages }));
      const newPreviews = [...imagePreviews];
      newPreviews[index] = dataUrl;
      setImagePreviews(newPreviews);
    };
    reader.readAsDataURL(file);
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ''] }));
    setImagePreviews((prev) => [...prev, null]);
  };

  const removeImageField = (index) => {
    const newImages = form.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => setForm((prev) => ({ ...prev, features: [...prev.features, ''] }));
  const removeFeature = (index) => {
    const newFeatures = form.features.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = {
      ...form,
      price: Number(form.price),
      surface: Number(form.surface),
      rooms: Number(form.rooms),
      bathrooms: Number(form.bathrooms),
      images: form.images.filter((url) => url && url !== ''),
      features: form.features.filter((f) => f.trim() !== ''),
    };

    if (isEditing) {
      updateProperty(id, cleaned);
    } else {
      addProperty(cleaned);
    }
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-3xl text-dark mb-8"
      >
        {isEditing ? 'Editar Propiedad' : 'Nueva Propiedad'}
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
      >
        {/* Título */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-dark mb-1">Título</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/60 text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            placeholder="Ej: Piso reformado en el centro"
          />
        </motion.div>

        {/* Descripción */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-dark mb-1">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/60 text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition resize-none"
            placeholder="Describe la propiedad..."
          />
        </motion.div>

        {/* Tipo, Precio, Superficie, Habitaciones, Baños */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-dark">Tipo</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2.5 rounded-xl bg-white/70 border border-white/60 text-dark focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            >
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-dark">Precio</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2.5 rounded-xl bg-white/70 border border-white/60 text-dark focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-dark">Superficie (m²)</label>
            <input
              type="number"
              name="surface"
              value={form.surface}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2.5 rounded-xl bg-white/70 border border-white/60 text-dark focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-dark">Habitaciones</label>
            <input
              type="number"
              name="rooms"
              value={form.rooms}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2.5 rounded-xl bg-white/70 border border-white/60 text-dark focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-dark">Baños</label>
            <input
              type="number"
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2.5 rounded-xl bg-white/70 border border-white/60 text-dark focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
          </div>
        </motion.div>

        {/* Dirección */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-dark mb-2">Dirección</label>
          <div className="grid grid-cols-3 gap-3">
            <input
              placeholder="Calle"
              name="address.street"
              value={form.address.street}
              onChange={handleChange}
              className="px-3 py-2.5 rounded-xl bg-white/70 border border-white/60 text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
            <input
              placeholder="Ciudad"
              name="address.city"
              value={form.address.city}
              onChange={handleChange}
              className="px-3 py-2.5 rounded-xl bg-white/70 border border-white/60 text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
            <input
              placeholder="Cód. postal"
              name="address.zip"
              value={form.address.zip}
              onChange={handleChange}
              className="px-3 py-2.5 rounded-xl bg-white/70 border border-white/60 text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
            />
          </div>
        </motion.div>

        {/* Imágenes */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-dark mb-2">Imágenes</label>
          <div className="space-y-3">
            {form.images.map((_, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleImageUpload(index, file);
                    }}
                    className="w-full text-sm text-dark file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand file:text-white file:font-medium hover:file:bg-brand/90 transition"
                  />
                </div>
                {imagePreviews[index] && (
                  <div className="w-16 h-12 flex-shrink-0 rounded-lg overflow-hidden shadow">
                    <img src={imagePreviews[index]} alt={`preview ${index}`} className="w-full h-full object-cover" />
                  </div>
                )}
                {form.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="text-red-500 hover:text-red-600 p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="text-brand hover:text-brand/80 text-sm font-medium transition"
            >
              + Añadir otra imagen
            </button>
          </div>
        </motion.div>

        {/* Características */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-dark mb-2">Características</label>
          <div className="space-y-2">
            {form.features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={f}
                  onChange={(e) => handleFeatureChange(i, e.target.value)}
                  placeholder="Ej: Piscina, Terraza..."
                  className="flex-1 px-3 py-2 rounded-xl bg-white/70 border border-white/60 text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                />
                {form.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="text-red-500 hover:text-red-600 p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="text-brand hover:text-brand/80 text-sm font-medium transition"
            >
              + Añadir característica
            </button>
          </div>
        </motion.div>

        {/* Destacado */}
        <motion.label variants={itemVariants} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand/30"
          />
          <span className="text-sm text-dark">Destacar en la página principal</span>
        </motion.label>

        {/* Botones */}
        <motion.div variants={itemVariants} className="flex justify-end gap-3 pt-4 border-t border-white/60">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-2.5 rounded-xl border border-gray-300 text-dark hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-xl bg-brand hover:bg-brand/90 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95"
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Propiedad'}
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}