// Public lead-intake endpoint for the «Черным по белому» marketing site.
//
// Deployed to the CRM Supabase project (crm-v3) — NOT this one — with
// verify_jwt = false, so the public site can POST a lead without any CRM
// credentials being shipped to the browser. It uses the auto-injected
// service-role key server-side to insert into `public.leads`, where the lead
// appears in the CRM list and the first ("new") kanban column.
//
// Deploy:  supabase functions deploy lead-intake --no-verify-jwt --project-ref fwsrmodnfuuidzvwlfog
// (kept here for version control; it was deployed via the Supabase API.)

import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, x-client-info, apikey, authorization',
};

const OWNER_ID = 1; // fayr89@yandex.ru (admin) in crm-v3.users

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function clip(v: unknown, max: number): string {
  return String(v ?? '').trim().slice(0, max);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  // Honeypot: bots fill this hidden field. Pretend success, insert nothing.
  if (clip(body.company_website, 100)) return json({ ok: true });

  const name = clip(body.name, 200);
  const phone = clip(body.phone, 50);
  const email = clip(body.email, 200);
  const service = clip(body.service, 200);
  const description = clip(body.description, 2000);

  if (!name) return json({ error: 'name is required' }, 422);
  if (!phone && !email) return json({ error: 'phone or email is required' }, 422);

  const parts: string[] = [];
  if (service) parts.push(`Услуга: ${service}`);
  if (description) parts.push(description);
  const fullDescription = parts.length ? parts.join('\n') : null;

  const tokens = name.split(/\s+/).filter(Boolean);
  const firstName = tokens[0] || name;
  const lastName = tokens.length > 1 ? tokens.slice(1).join(' ') : null;

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const { error } = await supabase.from('leads').insert({
    first_name: firstName,
    last_name: lastName,
    email: email || null,
    phone: phone || null,
    description: fullDescription,
    source: 'website',
    status: 'new',
    owner_id: OWNER_ID,
  });

  if (error) {
    console.error('lead insert failed:', error.message);
    return json({ error: 'Could not save lead' }, 500);
  }

  return json({ ok: true });
});
