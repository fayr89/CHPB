// Public configuration — safe to ship in the client bundle.
// The Supabase anon key is designed for the browser and is constrained by Row Level
// Security on the chpb-site project. NEVER put a service-role key here.
//
// IMPORTANT: Supabase (*.supabase.co) is unreliable/blocked from some RU networks,
// so the browser talks to our OWN domain, and nginx on the server reverse-proxies
// to Supabase:
//   <origin>/sb/...            -> chpb-site Supabase (auth, rest, storage)
//   <origin>/api/lead-intake   -> CRM (crm-v3) lead-intake edge function
// Using window.location.origin keeps it same-origin (no CORS) on whatever host the
// site is served from.

const env = import.meta.env as unknown as Record<string, string | undefined>;

const PROXY_ORIGIN =
  (typeof window !== 'undefined' && window.location && window.location.origin) ||
  'https://xn---54-5cdyrpfkrkr.xn--p1ai';

export const SUPABASE_URL = env.VITE_SUPABASE_URL || `${PROXY_ORIGIN}/sb`;

export const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3b2tjZ21ybnJ1Z25ybGZwcnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODI0MzYsImV4cCI6MjA5NTk1ODQzNn0.PYfAAy5fX5Xs7HzP1EMt_x51o06M9A2ROTYq-ELkIaQ';

// Public lead-intake endpoint, proxied through our domain (see nginx config).
export const LEAD_INTAKE_URL = env.VITE_LEAD_INTAKE_URL || `${PROXY_ORIGIN}/api/lead-intake`;

// CRM project id for leads from this site («ЧПБ»). Sent as project_id so leads
// appear with the «ЧПБ» project sticker in the CRM.
export const CRM_PROJECT_ID = 1;

export const SITE_IMAGES_BUCKET = 'site-images';
