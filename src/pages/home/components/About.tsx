import { useState } from 'react';
import { useContent } from '@/content/ContentContext';

export default function About() {
  const { about } = useContent();
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = about.services;
  const active = slides[activeSlide] ?? slides[0];

  return (
    <section id="services" className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left: Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[560px] w-full">
              {active && (
                <img
                  src={active.image}
                  alt={active.tag}
                  className="w-full h-full object-cover object-top"
                />
              )}
              <div className="absolute top-6 left-6 flex gap-3">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      idx === activeSlide
                        ? 'bg-white/95 text-foreground-950 backdrop-blur-sm'
                        : 'bg-white/30 text-white hover:bg-white/50 backdrop-blur-sm'
                    }`}
                  >
                    {s.tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground-950 leading-tight">
                {about.title}
              </h2>

              <div className="flex gap-4 mt-8">
                {about.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-4 py-2 rounded-full text-xs font-medium text-foreground-700 border border-background-300 bg-background-50 whitespace-nowrap"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 bg-primary-500 rounded-lg p-8 md:p-10 relative overflow-hidden">
              <span className="absolute top-5 left-6 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-accent-500 text-white">
                {about.serviceTag}
              </span>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mt-4">
                {about.serviceTitle}
              </h3>
              <p className="text-white/75 text-sm md:text-base leading-relaxed mt-4 max-w-lg">
                {about.serviceDesc}
              </p>
              <div className="mt-8 w-full h-48 rounded-md overflow-hidden">
                <img
                  src={about.boothImage}
                  alt={about.serviceTitle}
                  className="w-full h-full object-cover object-top rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
