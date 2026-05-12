import { motion } from 'framer-motion';

const testimonials = [
  { name: 'María García', text: 'Encontré el apartamento perfecto en tiempo récord. El equipo es muy profesional.' },
  { name: 'Carlos López', text: 'Vendí mi casa al mejor precio gracias a su asesoramiento. Totalmente recomendados.' },
  { name: 'Ana Martínez', text: 'El proceso de alquiler fue sencillo y claro. Sin duda volveré.' },
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
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

export default function Testimonials() {
  return (
    <section className="py-16 bg-light/30">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="font-serif text-3xl md:text-4xl text-dark mb-8"
        >
          Lo que dicen <span className="text-brand">nuestros clientes</span>
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow"
            >
              <p className="text-muted italic">"{t.text}"</p>
              <p className="mt-4 font-semibold text-dark">{t.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}