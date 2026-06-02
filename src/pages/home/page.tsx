import Navbar from '@/components/feature/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import GalleryPricing from './components/GalleryPricing';
import Reviews from './components/Reviews';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { SeoHead } from '@/content/SeoHead';

export default function Home() {
  return (
    <>
      <SeoHead />
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