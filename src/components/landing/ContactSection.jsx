import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
      className="py-16 bg-dark text-white text-center"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">Contáctanos</h2>
        <p className="text-muted mb-8">Déjanos tu mensaje y te responderemos en breve.</p>
        <form className="flex flex-col md:flex-row gap-4 justify-center">
          <input type="text" placeholder="Nombre" className="px-4 py-3 rounded-lg text-dark" />
          <input type="email" placeholder="Email" className="px-4 py-3 rounded-lg text-dark" />
        </form>
      </div>
    </motion.section>
  );
}