import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LOGO_URL = 'https://storage.readdy-site.link/project_files/dac7b5c1-5ea6-4978-906f-e0865bae6c6e/6e0b8e92-7eaf-472d-8825-64f314f1931c_Gemini_Generated_Image_nbmue2nbmue2nbmu.png';

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: t('nav.services') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#reviews', label: t('nav.reviews') },
    { href: '#contacts', label: t('nav.contacts') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background-50/95 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between pl-3 md:pl-4 pr-6 md:pr-12 h-28 md:h-32">
        <a href="/" className="flex-shrink-0 -ml-1">
          <img
            src={LOGO_URL}
            alt="Черным по белому"
            className="h-[6.24rem] md:h-[7.8rem] w-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200 ${
                scrolled
                  ? 'text-foreground-800 hover:text-foreground-950'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200 ${
                scrolled
                  ? 'text-foreground-800 hover:text-foreground-950'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              scrolled
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-white text-primary-900 hover:bg-white/90'
            }`}
          >
            {t('nav.request')}
          </a>
        </div>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <i
            className={`text-2xl transition-colors ${
              scrolled ? 'text-foreground-950' : 'text-white'
            } ${mobileOpen ? 'ri-close-line' : 'ri-menu-line'}`}
          ></i>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background-50 border-t border-background-200">
          <div className="flex flex-col px-6 py-4 gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-foreground-800 text-sm font-medium py-2 hover:text-foreground-950 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-5 py-3 rounded-full text-sm font-semibold text-center bg-primary-500 text-white hover:bg-primary-600 transition-colors cursor-pointer"
            >
              {t('nav.request')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}