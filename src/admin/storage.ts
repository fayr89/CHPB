import { supabase } from '@/lib/supabase';
import { SITE_IMAGES_BUCKET } from '@/lib/config';

// Uploads an image to the public storage bucket and returns its public URL.
export async function uploadImage(file: File): Promise<string> {
  const rawExt = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  const ext = rawExt || 'jpg';
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(SITE_IMAGES_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(SITE_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
