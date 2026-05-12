import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMobile();
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-[#A31D1D]/40 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-r from-[#8B1A1A] via-[#A31D1D] to-[#8B1A1A] shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Nombre en una línea */}
          <Link to="/" className="flex items-center group" onClick={closeMobile}>
            <div className="relative h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center p-1 transition-all duration-300 group-hover:bg-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-105">
              <img
                src="/inmo2.jpg"
                alt="Gonzalez & Carril"
                className="h-full w-full object-contain rounded-full"
              />
            </div>

            {/* Texto en línea con animación */}
            <motion.div
              initial={false}
              animate={{
                opacity: scrolled ? 0 : 1,
                x: scrolled ? -20 : 0,
                width: scrolled ? 0 : 'auto',
                marginLeft: scrolled ? 0 : 12,
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="text-white/90 font-serif text-base md:text-lg font-semibold tracking-wide">
                Gonzalez & Carril
              </span>
            </motion.div>
          </Link>

          {/* Menú desktop */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-white/90">
            <Link to="/" className="relative py-1 transition-colors duration-300 hover:text-white group">
              Inicio
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/catalog" className="relative py-1 transition-colors duration-300 hover:text-white group">
              Propiedades
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/admin/login" className="relative py-1 transition-colors duration-300 hover:text-white group">
              {user ? 'Panel' : 'Acceso'}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {user && (
              <button onClick={handleLogout} className="relative py-1 transition-colors duration-300 hover:text-white group">
                Salir
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
            )}
          </div>

          {/* Botón hamburguesa mobile */}
          <button
            onClick={toggleMobile}
            className="md:hidden text-white focus:outline-none transition-transform duration-300 hover:scale-110"
            aria-label="Abrir menú"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6 transition-transform duration-300 rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menú mobile con glass */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        } ${scrolled ? 'bg-[#A31D1D]/50 backdrop-blur-md' : 'bg-[#8B1A1A]/95'}`}
      >
        <div className="px-4 py-3 space-y-2">
          <Link to="/" onClick={closeMobile} className="block text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:translate-x-1">
            Inicio
          </Link>
          <Link to="/catalog" onClick={closeMobile} className="block text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:translate-x-1">
            Propiedades
          </Link>
          <Link to="/admin/login" onClick={closeMobile} className="block text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:translate-x-1">
            {user ? 'Panel' : 'Acceso'}
          </Link>
          {user && (
            <button onClick={handleLogout} className="block w-full text-left text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:translate-x-1">
              Salir
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}