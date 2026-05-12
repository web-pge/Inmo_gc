import { useParams, Link } from 'react-router-dom';
import { useProperties } from '../context/PropertiesContext';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { getProperty } = useProperties();
  const property = getProperty(id);

  if (!property) return <div className="text-center py-20">Propiedad no encontrada</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/catalog" className="text-luxury-gold hover:underline mb-4 inline-block">&larr; Volver al catálogo</Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Galería de imágenes */}
        <div>
          <div className="rounded-xl overflow-hidden">
            <img src={property.images[0]} alt={property.title} className="w-full h-96 object-cover" />
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {property.images.map((img, i) => (
              <img key={i} src={img} alt={`vista ${i+1}`} className="w-24 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-luxury-gold" />
            ))}
          </div>
        </div>
        {/* Info */}
        <div>
          <span className="inline-block bg-luxury-gold/20 text-luxury-dark font-semibold px-3 py-1 rounded-full text-sm mb-2">
            {property.type === 'venta' ? 'EN VENTA' : 'EN ALQUILER'}
          </span>
          <h1 className="font-serif text-3xl font-bold mb-4">{property.title}</h1>
          <p className="text-3xl font-bold text-luxury-dark mb-6">
            ${property.price.toLocaleString()}{property.type === 'alquiler' ? '/mes' : ''}
          </p>
          <p className="text-gray-600 mb-6">{property.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div className="bg-gray-100 p-3 rounded-lg"><span className="font-semibold">{property.surface}</span> m²</div>
            <div className="bg-gray-100 p-3 rounded-lg"><span className="font-semibold">{property.rooms}</span> habitaciones</div>
            <div className="bg-gray-100 p-3 rounded-lg"><span className="font-semibold">{property.bathrooms}</span> baños</div>
            <div className="bg-gray-100 p-3 rounded-lg"><span className="font-semibold">{property.features?.length || 0}</span> extras</div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {property.features.map((f, i) => (
              <span key={i} className="bg-luxury-gold/10 text-luxury-dark px-3 py-1 rounded-full text-xs font-medium">{f}</span>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Ubicación</h3>
            <p>{property.address.street}, {property.address.city}, {property.address.zip}</p>
          </div>
          <button className="mt-6 w-full bg-luxury-gold hover:bg-amber-400 text-black font-semibold py-3 rounded-lg transition">
            Contactar por esta propiedad
          </button>
        </div>
      </div>
    </div>
  );
}