import { useTranslation } from 'react-i18next';
import { galleryItems } from '@/mocks/gallery';
import { pricingItems } from '@/mocks/pricing';

export default function GalleryPricing() {
  const { t } = useTranslation();

  return (
    <>
      {/* Gallery */}
      <section id="gallery" className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground-950 text-center mb-14">
            {t('gallery.title')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="bg-background-50 rounded-lg overflow-hidden group cursor-pointer"
                data-product-shop
              >
                <div className="relative h-64 md:h-72 overflow-hidden bg-background-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    title={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-primary-500 text-white">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-heading text-base font-bold text-foreground-950">
                    {item.title}
                  </h3>
                  <p className="text-accent-600 text-sm font-semibold mt-2">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-background-100">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground-950 text-center mb-14">
            {t('pricing.title')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pricingItems.map((item) => (
              <div
                key={item.id}
                className="bg-background-50 rounded-lg p-6 flex flex-col items-center text-center"
              >
                <h4 className="font-heading text-sm font-semibold text-foreground-950 mb-3">
                  {item.name}
                </h4>
                <p className="text-accent-600 text-xl font-extrabold">
                  {item.price}
                </p>
                <p className="text-foreground-500 text-xs mt-3">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}