import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProperties } from '../context/PropertiesContext';
import PropertyCard from '../components/catalog/PropertyCard';

export default function CatalogPage() {
  const { properties } = useProperties();

  // Estados de los filtros (valores del formulario)
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [city, setCity] = useState('');

  // Filtros aplicados (se actualizan al hacer clic en Buscar)
  const [appliedFilters, setAppliedFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    city: '',
  });

  const handleSearch = () => {
    setAppliedFilters({ type, minPrice, maxPrice, city });
  };

  const handleClear = () => {
    setType('');
    setMinPrice('');
    setMaxPrice('');
    setCity('');
    setAppliedFilters({ type: '', minPrice: '', maxPrice: '', city: '' });
  };

  // Aplicar filtros al array de propiedades
  const filtered = properties.filter(p => {
    if (appliedFilters.type && p.type !== appliedFilters.type) return false;
    if (appliedFilters.minPrice && p.price < Number(appliedFilters.minPrice)) return false;
    if (appliedFilters.maxPrice && p.price > Number(appliedFilters.maxPrice)) return false;
    if (appliedFilters.city && !p.address.city.toLowerCase().includes(appliedFilters.city.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl text-center mb-10">
        Catálogo de <span className="text-brand">Propiedades</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar de filtros */}
        <aside className="lg:w-1/4">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-6 sticky top-24">
            <h2 className="font-serif text-xl font-semibold text-dark mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtros
            </h2>

            {/* Tipo */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-dark mb-1">Tipo de operación</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand transition-shadow hover:shadow-md"
              >
                <option value="">Todos</option>
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>

            {/* Rango de precio */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-dark mb-1">Precio</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Mín"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand transition-shadow hover:shadow-md"
                />
                <input
                  type="number"
                  placeholder="Máx"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand transition-shadow hover:shadow-md"
                />
              </div>
            </div>

            {/* Ciudad */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-dark mb-1">Ciudad</label>
              <input
                type="text"
                placeholder="Buscar ciudad..."
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand transition-shadow hover:shadow-md"
              />
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSearch}
                className="w-full bg-brand hover:bg-brand/90 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95"
              >
                Buscar propiedades
              </button>
              <button
                onClick={handleClear}
                className="w-full text-sm text-muted hover:text-dark underline underline-offset-2 transition"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </aside>

        {/* Área de resultados */}
        <main className="lg:w-3/4">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted"
            >
              <p className="text-lg">No se encontraron propiedades con esos filtros.</p>
              <button onClick={handleClear} className="mt-4 text-brand hover:underline">Mostrar todas</button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filtered.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}