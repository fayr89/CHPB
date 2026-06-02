// Public configuration — safe to ship in the client bundle.
// The Supabase anon key is designed for the browser and is constrained by Row Level
// Security on the chpb-site project. NEVER put a service-role key here.

const env = import.meta.env as unknown as Record<string, string | undefined>;

export const SUPABASE_URL =
  env.VITE_SUPABASE_URL || 'https://bwokcgmrnrugnrlfprzb.supabase.co';

export const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3b2tjZ21ybnJ1Z25ybGZwcnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODI0MzYsImV4cCI6MjA5NTk1ODQzNn0.PYfAAy5fX5Xs7HzP1EMt_x51o06M9A2ROTYq-ELkIaQ';

// Public edge function on the CRM (crm-v3) that records an incoming lead.
// It is deployed with JWT verification disabled, so it needs no key — no CRM
// credentials are ever shipped to the browser.
export const LEAD_INTAKE_URL =
  env.VITE_LEAD_INTAKE_URL ||
  'https://fwsrmodnfuuidzvwlfog.supabase.co/functions/v1/lead-intake';

export const SITE_IMAGES_BUCKET = 'site-images';
