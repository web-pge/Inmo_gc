import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const slides = [
  {
    id: 1,
    background: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Encuentra tu hogar",
    subtitle: "ideal",
    description: "Más de 20 años convirtiendo propiedades en experiencias de vida.",
    buttonText: "Ver Propiedades",
  },
  {
    id: 2,
    background: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80",
    title: "Vende tu propiedad",
    subtitle: "sin problemas",
    description: "Te acompañamos desde la tasación hasta la firma.",
    buttonText: "Solicitar Tasación",
  },
  {
    id: 3,
    background: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Alquila con",
    subtitle: "confianza",
    description: "Las mejores ubicaciones y condiciones para vos.",
    buttonText: "Ver Alquileres",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 700);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    if (index === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 700);
  };

  const slide = slides[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen overflow-hidden"
    >
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url(${slide.background})`, opacity: isTransitioning ? 0 : 1 }}
        />
        <div className="absolute inset-0 bg-dark/70" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <img
            src="/inmo2.jpg"
            alt="Gonzalez & Carril"
            className="h-20 md:h-24 w-auto rounded-full shadow-[0_0_20px_rgba(255,255,255,0.25)] mx-auto object-cover"
          />
        </motion.div>

        <div className={`transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-wide">
            {slide.title} <span className="text-brand">{slide.subtitle}</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl font-light text-light">
            {slide.description}
          </p>
        </div>

        <div className={`mt-10 transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <a
            href="/catalog"
            className="inline-block bg-brand hover:bg-brand/80 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {slide.buttonText}
          </a>
        </div>

        <div className="absolute bottom-8 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-brand scale-125 shadow-[0_0_10px_rgba(163,29,29,0.6)]'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}