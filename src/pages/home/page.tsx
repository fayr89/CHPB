import Navbar from '@/components/feature/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import GalleryPricing from './components/GalleryPricing';
import Reviews from './components/Reviews';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <GalleryPricing />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </>
  );
}