import { useContent } from '@/content/ContentContext';

export default function Features() {
  const { features } = useContent();

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-background-100">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-14">
          <p className="text-foreground-500 text-xs font-semibold uppercase tracking-widest mb-4">
            {features.label}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground-950 leading-tight max-w-2xl">
            {features.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.items.map((item) => (
            <div
              key={item.id}
              className="bg-background-50 rounded-lg p-8 md:p-10 group hover:bg-background-50 transition-colors duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <i className={`${item.icon} text-3xl text-primary-600`}></i>
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground-950 mt-6 mb-3">
                {item.title}
              </h3>
              <p className="text-foreground-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
