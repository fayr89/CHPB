import { useTranslation } from 'react-i18next';
import { reviews } from '@/mocks/reviews';

export default function Reviews() {
  const { t } = useTranslation();

  return (
    <section id="reviews" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-background-100">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <p className="inline-flex items-center gap-2 text-accent-600 text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
            {t('reviews.label')}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground-950 leading-tight max-w-2xl mx-auto">
            {t('reviews.title')}
          </h2>
        </div>

        {/* Asymmetric grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - text */}
          <div className="bg-background-50 rounded-lg p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={reviews[0].avatar}
                  alt={reviews[0].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-heading text-sm font-bold text-foreground-950">
                    {reviews[0].name}
                  </p>
                  <p className="text-foreground-500 text-xs">
                    {reviews[0].role}
                  </p>
                </div>
              </div>
              <p className="text-foreground-700 text-sm leading-relaxed">
                &ldquo;{reviews[0].text}&rdquo;
              </p>
            </div>
          </div>

          {/* Card 2 - text */}
          <div className="bg-background-50 rounded-lg p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={reviews[1].avatar}
                  alt={reviews[1].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-heading text-sm font-bold text-foreground-950">
                    {reviews[1].name}
                  </p>
                  <p className="text-foreground-500 text-xs">
                    {reviews[1].role}
                  </p>
                </div>
              </div>
              <p className="text-foreground-700 text-sm leading-relaxed">
                &ldquo;{reviews[1].text}&rdquo;
              </p>
            </div>
          </div>

          {/* Card 3 - image background */}
          <div className="relative rounded-lg overflow-hidden h-full min-h-[280px]">
            <img
              src="https://readdy.ai/api/search-image?query=High%20quality%20powder%20coated%20black%20metal%20parts%20and%20automotive%20components%20displayed%20on%20a%20workshop%20table%2C%20professional%20industrial%20photography%20with%20dramatic%20lighting%2C%20dark%20moody%20atmosphere%20with%20metallic%20highlights%2C%20textured%20surfaces%20and%20perfect%20finish&width=800&height=600&seq=review-bg-01&orientation=landscape"
              alt="Порошковая покраска"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <p className="font-heading text-sm font-bold text-white">
                {reviews[2].name}
              </p>
              <p className="text-white/60 text-xs">{reviews[2].role}</p>
            </div>
          </div>

          {/* Card 4 - wide image background (spans ~1.5 cols) */}
          <div className="md:col-span-2 relative rounded-lg overflow-hidden h-[300px]">
            <img
              src="https://readdy.ai/api/search-image?query=Industrial%20powder%20coating%20workshop%20with%20freshly%20coated%20metal%20structures%20in%20matte%20black%20finish%2C%20professional%20workshop%20environment%20with%20organized%20tools%20and%20equipment%2C%20warm%20industrial%20lighting%2C%20clean%20modern%20factory%20setting%2C%20atmospheric%20photography&width=1000&height=600&seq=review-bg-02&orientation=landscape"
              alt="Цех покраски"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <p className="font-heading text-base font-bold text-white">
                {reviews[3].name}
              </p>
              <p className="text-white/60 text-xs mb-3">{reviews[3].role}</p>
              <p className="text-white/85 text-sm leading-relaxed max-w-md">
                &ldquo;{reviews[3].text}&rdquo;
              </p>
            </div>
          </div>

          {/* Card 5 - text (small, stacked with another) */}
          <div className="bg-background-50 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <p className="text-foreground-700 text-sm leading-relaxed">
                &ldquo;{reviews[4].text}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-background-200">
              <img
                src={reviews[4].avatar}
                alt={reviews[4].name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-heading text-xs font-bold text-foreground-950">
                  {reviews[4].name}
                </p>
                <p className="text-foreground-500 text-[11px]">
                  {reviews[4].role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}