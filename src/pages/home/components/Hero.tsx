import { useContent } from '@/content/ContentContext';

export default function Hero() {
  const { hero } = useContent();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster=""
      >
        <source src={hero.videoUrl} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>

      <div className="relative z-10 h-full w-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <h1 className="font-heading text-white font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-0 max-w-4xl">
          <span className="block">{hero.titleLine1}</span>
          <span className="block">{hero.titleLine2}</span>
          <span className="block">{hero.titleLine3}</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-8 md:gap-20 mt-12 md:mt-16 max-w-4xl">
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-md font-light">
            {hero.subtitleLeft}
          </p>
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-md font-light md:mt-8">
            {hero.subtitleRight}
          </p>
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-12 h-12 flex items-center justify-center cursor-pointer animate-bounce"
      >
        <i className="ri-arrow-down-line text-white text-3xl"></i>
      </a>
    </section>
  );
}
