import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FORM_URL = 'https://readdy.ai/api/form/d8f4devf63rh9ldpubpg';

export default function CTA() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    description: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value);
      });

      const response = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', service: '', description: '' });
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
          src="https://readdy.ai/api/search-image?query=Warm%20industrial%20workshop%20interior%20with%20powder%20coated%20metal%20parts%20in%20various%20stages%2C%20large%20spray%20booth%20in%20background%2C%20professional%20workshop%20environment%20with%20warm%20amber%20lighting%2C%20organized%20industrial%20space%2C%20atmospheric%20photography%20with%20depth%20and%20texture%2C%20rich%20warm%20metallic%20tones&width=1800&height=1000&seq=cta-bg-01&orientation=landscape"
          alt="Цех порошковой покраски"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wide mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          data-readdy-form
          className="max-w-lg mx-auto bg-background-50/10 backdrop-blur-md rounded-lg p-8 border border-white/10"
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('form.name')}
              required
              className="w-full px-4 py-3 rounded-md bg-white/95 text-foreground-950 text-sm placeholder:text-foreground-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('form.phone')}
              required
              className="w-full px-4 py-3 rounded-md bg-white/95 text-foreground-950 text-sm placeholder:text-foreground-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('form.email')}
              className="w-full px-4 py-3 rounded-md bg-white/95 text-foreground-950 text-sm placeholder:text-foreground-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-white/95 text-foreground-950 text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
            >
              <option value="">{t('form.service')}</option>
              <option value="discs">Покраска дисков</option>
              <option value="structures">Металлоконструкции</option>
              <option value="forged">Кованые изделия</option>
              <option value="auto">Автодетали</option>
              <option value="other">Другое</option>
            </select>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t('form.description')}
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
                <span>{t('cta.button')}</span>
                <i className="ri-arrow-right-up-line"></i>
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="text-center text-green-400 text-sm mt-4 font-medium">
              {t('form.success')}
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-400 text-sm mt-4 font-medium">
              {t('form.error')}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}