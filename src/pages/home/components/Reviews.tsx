import { useContent } from '@/content/ContentContext';

export default function Reviews() {
  const { reviews } = useContent();
  const items = reviews.items;

  return (
    <section id="reviews" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-background-100">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <p className="inline-flex items-center gap-2 text-accent-600 text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
            {reviews.label}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground-950 leading-tight max-w-2xl mx-auto">
            {reviews.title}
          </h2>
        </div>

        {/* Asymmetric grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - text */}
          {items[0] && (
            <div className="bg-background-50 rounded-lg p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={items[0].avatar}
                    alt={items[0].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground-950">
                      {items[0].name}
                    </p>
                    <p className="text-foreground-500 text-xs">{items[0].role}</p>
                  </div>
                </div>
                <p className="text-foreground-700 text-sm leading-relaxed">
                  &ldquo;{items[0].text}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Card 2 - text */}
          {items[1] && (
            <div className="bg-background-50 rounded-lg p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={items[1].avatar}
                    alt={items[1].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground-950">
                      {items[1].name}
                    </p>
                    <p className="text-foreground-500 text-xs">{items[1].role}</p>
                  </div>
                </div>
                <p className="text-foreground-700 text-sm leading-relaxed">
                  &ldquo;{items[1].text}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Card 3 - image background */}
          <div className="relative rounded-lg overflow-hidden h-full min-h-[280px]">
            <img
              src={reviews.image1}
              alt="Порошковая покраска"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <p className="font-heading text-sm font-bold text-white">{items[2]?.name}</p>
              <p className="text-white/60 text-xs">{items[2]?.role}</p>
            </div>
          </div>

          {/* Card 4 - wide image background (spans ~1.5 cols) */}
          <div className="md:col-span-2 relative rounded-lg overflow-hidden h-[300px]">
            <img
              src={reviews.image2}
              alt="Цех покраски"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <p className="font-heading text-base font-bold text-white">{items[3]?.name}</p>
              <p className="text-white/60 text-xs mb-3">{items[3]?.role}</p>
              <p className="text-white/85 text-sm leading-relaxed max-w-md">
                &ldquo;{items[3]?.text}&rdquo;
              </p>
            </div>
          </div>

          {/* Card 5 - text (small, stacked with another) */}
          {items[4] && (
            <div className="bg-background-50 rounded-lg p-6 flex flex-col justify-between">
              <div>
                <p className="text-foreground-700 text-sm leading-relaxed">
                  &ldquo;{items[4].text}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-background-200">
                <img
                  src={items[4].avatar}
                  alt={items[4].name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-heading text-xs font-bold text-foreground-950">
                    {items[4].name}
                  </p>
                  <p className="text-foreground-500 text-[11px]">{items[4].role}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
