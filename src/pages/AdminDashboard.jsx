import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../context/PropertiesContext';

export default function AdminDashboard() {
  const { properties, deleteProperty } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  // Filtrado de propiedades
  const filtered = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? p.type === filterType : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <h1 className="font-serif text-3xl text-dark">Gestión de Propiedades</h1>
        <Link
          to="/admin/add"
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 self-start"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Propiedad
        </Link>
      </div>

      {/* Barra de búsqueda y filtro */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition text-dark placeholder-muted"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-dark focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition"
        >
          <option value="">Todos los tipos</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-light/50 text-dark/80 text-left">
                <th className="py-4 px-4 font-semibold">Imagen</th>
                <th className="py-4 px-4 font-semibold">Título</th>
                <th className="py-4 px-4 font-semibold">Tipo</th>
                <th className="py-4 px-4 font-semibold">Precio</th>
                <th className="py-4 px-4 font-semibold">Ciudad</th>
                <th className="py-4 px-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-light/30 transition-colors">
                  <td className="py-3 px-4">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-16 h-12 object-cover rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-dark">{p.title}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        p.type === 'venta'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-sky-50 text-sky-700 border border-sky-200'
                      }`}
                    >
                      {p.type === 'venta' ? 'Venta' : 'Alquiler'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-dark font-medium">
                    ${p.price.toLocaleString()}
                    {p.type === 'alquiler' && <span className="text-muted text-xs">/mes</span>}
                  </td>
                  <td className="py-3 px-4 text-muted">{p.address.city}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/edit/${p.id}`}
                        className="p-2 rounded-lg text-dark/60 hover:text-brand hover:bg-brand/10 transition-colors"
                        title="Editar propiedad"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => deleteProperty(p.id)}
                        className="p-2 rounded-lg text-dark/60 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Eliminar propiedad"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-muted">
                    No se encontraron propiedades con esos criterios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}