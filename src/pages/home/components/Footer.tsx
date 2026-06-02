import { useState } from 'react';
import { useContent } from '@/content/ContentContext';
import { LEAD_INTAKE_URL } from '@/lib/config';

export default function Footer() {
  const { brand, nav, footer, legal } = useContent();
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubStatus('loading');

    try {
      const response = await fetch(LEAD_INTAKE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: 'Подписка на рассылку',
          email,
          source: 'website',
          description: '🔖 Подписка на рассылку — сайт «Черным по белому» (ЧПБ)',
        }),
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

  const menuLinks = [
    { href: '#services', label: nav.services },
    { href: '#gallery', label: nav.gallery },
    { href: '#pricing', label: nav.pricing },
    { href: '#reviews', label: nav.reviews },
    { href: '#contacts', label: nav.contacts },
  ];

  return (
    <footer id="contacts" className="bg-secondary-800 text-white">
      {/* Top: 4-column layout */}
      <div className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + Contacts */}
          <div>
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-10 w-auto object-contain mb-6 brightness-0 invert"
            />
            <div className="space-y-3 text-sm text-white/50">
              <p>{footer.address}</p>
              <p>{footer.phone}</p>
              <p>{footer.email}</p>
            </div>
          </div>

          {/* Col 2: Newsletter */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white/40 mb-5">
              {footer.newsletterTitle}
            </h4>
            <form onSubmit={handleSubscribe}>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={footer.newsletterPlaceholder}
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
              {footer.newsletterHint}
            </p>
          </div>

          {/* Col 3: Menu */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white/40 mb-5">
              {footer.menuTitle}
            </h4>
            <div className="flex flex-col gap-3">
              {menuLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Social */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white/40 mb-5">
              {footer.socialTitle}
            </h4>
            <div className="flex flex-col gap-3">
              {footer.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <i className={s.icon}></i> {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Large typography */}
      <div className="px-6 md:px-12 lg:px-20 py-12 border-t border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-heading text-[clamp(2rem,8vw,8rem)] font-black text-white/5 leading-none tracking-tighter select-none whitespace-nowrap">
            {footer.bigText}
          </p>
          <p className="text-white/25 text-xs mt-6">
            {footer.copyright}
          </p>
          {(legal.companyName || legal.inn || legal.ogrn) && (
            <p className="text-white/20 text-[11px] mt-2">
              {legal.companyName}
              {legal.inn ? ` · ИНН ${legal.inn}` : ''}
              {legal.ogrn ? ` · ОГРН ${legal.ogrn}` : ''}
            </p>
          )}
          <a
            href="/privacy"
            className="inline-block text-white/30 hover:text-white/70 text-[11px] mt-2 underline transition-colors"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
