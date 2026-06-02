import { useState } from 'react';
import { useContent } from '@/content/ContentContext';
import { LEAD_INTAKE_URL } from '@/lib/config';

export default function CTA() {
  const { cta, form } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    description: '',
    company_website: '', // honeypot — real users never see/fill this
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Honeypot — real users never fill this hidden field
      if (formData.company_website.trim()) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', service: '', description: '', company_website: '' });
        setTimeout(() => setStatus('idle'), 4000);
        return;
      }

      const serviceLabel =
        cta.serviceOptions.find((o) => o.value === formData.service)?.label ?? formData.service;
      const tokens = formData.name.trim().split(/\s+/).filter(Boolean);
      const descParts = ['🔖 Заявка с сайта «Черным по белому» (ЧПБ)'];
      if (serviceLabel) descParts.push(`Услуга: ${serviceLabel}`);
      if (formData.description.trim()) descParts.push(formData.description.trim());

      const response = await fetch(LEAD_INTAKE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: tokens[0] || formData.name.trim() || 'Заявка',
          last_name: tokens.length > 1 ? tokens.slice(1).join(' ') : undefined,
          phone: formData.phone,
          email: formData.email || undefined,
          source: 'website',
          description: descParts.join('\n'),
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', service: '', description: '', company_website: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="cta" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="absolute inset-0">
        <img
          src={cta.bgImage}
          alt="Цех порошковой покраски"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wide mb-6">
            {cta.title}
          </h2>
          <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {cta.subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-background-50/10 backdrop-blur-md rounded-lg p-8 border border-white/10"
        >
          <div className="flex flex-col gap-4">
            {/* Honeypot field (hidden from real users) */}
            <input
              type="text"
              name="company_website"
              value={formData.company_website}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={form.name}
              required
              className="w-full px-4 py-3 rounded-md bg-white/95 text-foreground-950 text-sm placeholder:text-foreground-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={form.phone}
              required
              className="w-full px-4 py-3 rounded-md bg-white/95 text-foreground-950 text-sm placeholder:text-foreground-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={form.email}
              className="w-full px-4 py-3 rounded-md bg-white/95 text-foreground-950 text-sm placeholder:text-foreground-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-white/95 text-foreground-950 text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
            >
              <option value="">{form.service}</option>
              {cta.serviceOptions.map((o) => (
                <option key={o.id} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={form.description}
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 rounded-md bg-white/95 text-foreground-950 text-sm placeholder:text-foreground-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full mt-6 py-3.5 rounded-full bg-accent-500 text-white font-heading text-sm font-bold uppercase tracking-wider hover:bg-accent-600 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <i className="ri-loader-4-line animate-spin"></i>
            ) : (
              <>
                <span>{cta.button}</span>
                <i className="ri-arrow-right-up-line"></i>
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="text-center text-green-400 text-sm mt-4 font-medium">
              {form.success}
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-400 text-sm mt-4 font-medium">
              {form.error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
