import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LOGO_URL = 'https://storage.readdy-site.link/project_files/dac7b5c1-5ea6-4978-906f-e0865bae6c6e/6e0b8e92-7eaf-472d-8825-64f314f1931c_Gemini_Generated_Image_nbmue2nbmue2nbmu.png';
const NEWSLETTER_URL = 'https://readdy.ai/api/form/d8f4devf63rh9ldpubq0';

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubStatus('loading');

    try {
      const formBody = new URLSearchParams();
      formBody.append('email', email);

      const response = await fetch(NEWSLETTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      if (response.ok) {
        setSubStatus('success');
        setEmail('');
        setTimeout(() => setSubStatus('idle'), 4000);
      } else {
        setSubStatus('error');
        setTimeout(() => setSubStatus('idle'), 4000);
      }
    } catch {
      setSubStatus('error');
      setTimeout(() => setSubStatus('idle'), 4000);
    }
  };

  return (
    <footer id="contacts" className="bg-secondary-800 text-white">
      {/* Top: 4-column layout */}
      <div className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + Contacts */}
          <div>
            <img
              src={LOGO_URL}
              alt="Черным по белому"
              className="h-10 w-auto object-contain mb-6 brightness-0 invert"
            />
            <div className="space-y-3 text-sm text-white/50">
              <p>{t('footer.address')}</p>
              <p>{t('footer.phone')}</p>
              <p>{t('footer.email')}</p>
            </div>
          </div>

          {/* Col 2: Newsletter */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white/40 mb-5">
              {t('footer.newsletter_title')}
            </h4>
            <form onSubmit={handleSubscribe} data-readdy-form>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter_placeholder')}
                  required
                  className="w-full bg-transparent border-0 border-b border-white/20 py-2 pr-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={subStatus === 'loading'}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white/50 hover:text-accent-500 transition-colors cursor-pointer disabled:opacity-30"
                >
                  <i className={`text-lg ${subStatus === 'loading' ? 'ri-loader-4-line animate-spin' : 'ri-arrow-right-line'}`}></i>
                </button>
              </div>
              {subStatus === 'success' && (
                <p className="text-green-400 text-xs mt-2">Подписка оформлена!</p>
              )}
              {subStatus === 'error' && (
                <p className="text-red-400 text-xs mt-2">Ошибка, попробуйте позже.</p>
              )}
            </form>
            <p className="text-white/25 text-[11px] mt-3 leading-relaxed">
              {t('footer.newsletter_hint')}
            </p>
          </div>

          {/* Col 3: Menu */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white/40 mb-5">
              {t('footer.menu_title')}
            </h4>
            <div className="flex flex-col gap-3">
              <a href="#services" className="text-sm text-white/60 hover:text-white transition-colors">
                {t('footer.menu_services')}
              </a>
              <a href="#gallery" className="text-sm text-white/60 hover:text-white transition-colors">
                {t('footer.menu_gallery')}
              </a>
              <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">
                {t('footer.menu_pricing')}
              </a>
              <a href="#reviews" className="text-sm text-white/60 hover:text-white transition-colors">
                {t('footer.menu_reviews')}
              </a>
              <a href="#contacts" className="text-sm text-white/60 hover:text-white transition-colors">
                {t('footer.menu_contacts')}
              </a>
            </div>
          </div>

          {/* Col 4: Social */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white/40 mb-5">
              {t('footer.social_title')}
            </h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                <i className="ri-telegram-line"></i> Telegram
              </a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                <i className="ri-whatsapp-line"></i> WhatsApp
              </a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                <i className="ri-instagram-line"></i> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Large typography */}
      <div className="px-6 md:px-12 lg:px-20 py-12 border-t border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-heading text-[clamp(2rem,8vw,8rem)] font-black text-white/5 leading-none tracking-tighter select-none whitespace-nowrap">
            ЧЕРНЫМПОБЕЛОМУ
          </p>
          <p className="text-white/25 text-xs mt-6">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}