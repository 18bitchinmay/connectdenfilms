import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhotoSection from './components/PhotoSection';
import ReelsCarousel from './components/ReelsCarousel';
import CinematicsCarousel from './components/CinematicsCarousel';
import ServicesGrid from './components/ServicesGrid';
import AboutSection from './components/AboutSection';
import StatsBar from './components/StatsBar';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <PhotoSection />
      <ReelsCarousel />
      <CinematicsCarousel />
      <ServicesGrid />
      <AboutSection />
      <StatsBar />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
