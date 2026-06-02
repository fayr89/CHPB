import { useEffect } from 'react';
import { useContent } from './ContentContext';

const SITE_URL = 'https://полимерка-54.рф/';

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  if (!content) return;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Keeps the document head (title, meta, Open Graph, Twitter, JSON-LD) in sync
// with the admin-editable content. Static defaults live in index.html; this
// updates them at runtime so admin edits are reflected.
export function SeoHead() {
  const { seo, brand, footer } = useContent();

  useEffect(() => {
    if (seo.title) document.title = seo.title;

    const ogTitle = seo.ogTitle || seo.title;
    const ogDesc = seo.ogDescription || seo.description;

    upsertMeta('meta[name="description"]', 'name', 'description', seo.description);
    upsertMeta('meta[name="keywords"]', 'name', 'keywords', seo.keywords);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', ogTitle);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', ogDesc);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', seo.ogImage);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', ogTitle);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', ogDesc);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seo.ogImage);

    // Dynamic LocalBusiness structured data built from current content (NAP, socials)
    const sameAs = footer.socials
      .map((s) => s.url)
      .filter((u) => u && u !== '#' && /^https?:\/\//.test(u));

    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: brand.name,
      description: seo.description,
      url: SITE_URL,
      image: seo.ogImage,
      address: {
        '@type': 'PostalAddress',
        streetAddress: footer.address,
        addressLocality: 'Новосибирск',
        addressCountry: 'RU',
      },
      areaServed: 'Новосибирск',
      priceRange: '₽₽',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '19:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '10:00',
          closes: '16:00',
        },
      ],
    };
    if (footer.phone) schema.telephone = footer.phone;
    if (footer.email) schema.email = footer.email;
    if (sameAs.length) schema.sameAs = sameAs;

    const ld = document.getElementById('ld-business');
    if (ld) ld.textContent = JSON.stringify(schema);
  }, [seo, brand, footer]);

  return null;
}
