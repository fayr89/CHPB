import { useEffect } from 'react';
import { useContent } from './ContentContext';

// Applies admin-editable SEO fields to the document head on the public site.
// (Static defaults live in index.html; this keeps them in sync with admin edits.)
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

export function SeoHead() {
  const { seo } = useContent();

  useEffect(() => {
    if (seo.title) document.title = seo.title;
    upsertMeta('meta[name="description"]', 'name', 'description', seo.description);
    upsertMeta('meta[name="keywords"]', 'name', 'keywords', seo.keywords);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', seo.ogTitle || seo.title);
    upsertMeta(
      'meta[property="og:description"]',
      'property',
      'og:description',
      seo.ogDescription || seo.description,
    );
  }, [seo]);

  return null;
}
