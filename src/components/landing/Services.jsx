import { motion } from 'framer-motion';

const services = [
  { title: 'Venta de propiedades', desc: 'Encuentra la casa de tus sueños con nuestra exclusiva selección.' },
  { title: 'Alquileres', desc: 'Los mejores inmuebles para vivir la experiencia que mereces.' },
  { title: 'Tasación profesional', desc: 'Valoramos tu propiedad con precisión y transparencia.' },
  { title: 'Asesoría legal', desc: 'Te acompañamos en cada paso hasta la firma.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Services() {
  return (
    <section className="py-16 bg-light">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="font-serif text-3xl md:text-4xl text-dark mb-12"
        >
          Nuestros <span className="text-brand">Servicios</span>
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div className="w-12 h-12 mx-auto bg-brand/10 rounded-full flex items-center justify-center mb-4">🏠</div>
              <h3 className="font-serif text-xl font-semibold mb-2 text-dark">{s.title}</h3>
              <p className="text-muted text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}