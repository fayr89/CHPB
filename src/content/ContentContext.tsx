import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { defaultContent } from './defaults';
import { mergeContent } from './merge';
import type { SiteContent } from './types';

interface ContentCtxValue {
  content: SiteContent;
  loading: boolean;
  reload: () => Promise<void>;
}

const ContentCtx = createContext<ContentCtxValue>({
  content: defaultContent,
  loading: true,
  reload: async () => {},
});

export function useContent(): SiteContent {
  return useContext(ContentCtx).content;
}

export function useContentCtx(): ContentCtxValue {
  return useContext(ContentCtx);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await supabase
        .from('site_content')
        .select('data')
        .eq('id', 1)
        .maybeSingle();
      if (data?.data && typeof data.data === 'object') {
        setContent(mergeContent(defaultContent, data.data as Partial<SiteContent>));
      } else {
        setContent(defaultContent);
      }
    } catch {
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <ContentCtx.Provider value={{ content, loading, reload: load }}>
      {children}
    </ContentCtx.Provider>
  );
}
