import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  const { id, title, price, type, surface, images, address } = property;

  // Estilos condicionales según tipo
  const badgeStyles =
    type === 'venta'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : 'bg-sky-50 text-sky-700 border-sky-200';

  const priceLabel = type === 'alquiler' ? '/mes' : '';

  return (
    <Link
      to={`/property/${id}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {/* Imagen */}
      <div className="h-52 overflow-hidden relative">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badge de tipo */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyles} backdrop-blur-sm`}
        >
          {type === 'venta' ? 'VENTA' : 'ALQUILER'}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-bold text-dark line-clamp-1 group-hover:text-brand transition-colors">
          {title}
        </h3>
        <p className="text-muted text-sm mt-1">{address.city}</p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-dark">
            ${price.toLocaleString()}
            {priceLabel && <span className="text-base font-normal text-muted">{priceLabel}</span>}
          </span>
          <span className="text-sm text-muted bg-gray-50 px-2 py-1 rounded-md">
            {surface} m²
          </span>
        </div>

        {/* Características rápidas */}
        <div className="mt-3 flex gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {property.rooms} hab.
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            {property.bathrooms} baños
          </span>
        </div>
      </div>
    </Link>
  );
}