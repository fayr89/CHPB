import type { SiteContent } from './types';

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function deepMerge(base: unknown, override: unknown): unknown {
  if (override === undefined || override === null) return base;
  if (isPlainObject(base) && isPlainObject(override)) {
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(override)) {
      out[key] = key in base ? deepMerge(base[key], override[key]) : override[key];
    }
    return out;
  }
  // Arrays and primitives: a provided override replaces the default wholesale.
  return override;
}

// Deep-merge a stored (possibly partial / older) content document over the
// in-code defaults, so missing fields always have a sensible value.
export function mergeContent(base: SiteContent, override: Partial<SiteContent>): SiteContent {
  return deepMerge(base, override) as SiteContent;
}
