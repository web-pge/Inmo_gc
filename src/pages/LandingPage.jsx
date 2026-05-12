import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import FeaturedProperties from '../components/landing/FeaturedProperties';
import Testimonials from '../components/landing/Testimonials';
import ContactSection from '../components/landing/ContactSection';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProperties />
      <Testimonials />
    </>
  );
}