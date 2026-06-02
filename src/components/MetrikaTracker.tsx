import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageview } from '@/lib/metrika';

// Reports SPA route changes to Yandex.Metrika as pageviews.
// The first pageview is already counted by the counter init in index.html,
// so we skip the initial render and only report subsequent navigations.
export function MetrikaTracker() {
  const location = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    trackPageview(window.location.href);
  }, [location.pathname, location.search]);

  return null;
}
