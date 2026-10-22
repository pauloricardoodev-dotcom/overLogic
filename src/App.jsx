import Loader from './components/Loader';
import TechBackground from './components/TechBackground';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import HowWeWorkSection from './components/HowWeWorkSection';
import AboutSection from './components/AboutSection';
import DifferentialsSection from './components/DifferentialsSection';
import ContactSection from './components/ContactSection';

function App() {
  return (
    <>
      <Loader />
      <TechBackground />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <HowWeWorkSection />
      <DifferentialsSection />
      <ContactSection />
    </>
  );
}

export default App;
