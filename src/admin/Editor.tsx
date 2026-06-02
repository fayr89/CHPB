import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { defaultContent } from '@/content/defaults';
import { mergeContent } from '@/content/merge';
import { useContentCtx } from '@/content/ContentContext';
import type { SiteContent } from '@/content/types';
import { Field, ImageInput, Section, ListEditor, StringListEditor, uid } from './ui';
import { ChangePassword } from './ChangePassword';

export function Editor() {
  const { reload } = useContentCtx();
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    let alive = true;
    supabase
      .from('site_content')
      .select('data')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        if (!alive) return;
        setDraft(mergeContent(defaultContent, (data?.data ?? {}) as Partial<SiteContent>));
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!draft) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Загрузка…</div>;
  }

  const d = draft;

  function set<K extends keyof SiteContent>(section: K, patch: Partial<SiteContent[K]>) {
    setDraft((cur) => (cur ? { ...cur, [section]: { ...cur[section], ...patch } } : cur));
  }

  const save = async () => {
    setSaving(true);
    setMsg(null);
    const { error } = await supabase.from('site_content').update({ data: draft }).eq('id', 1);
    if (error) {
      setMsg({ kind: 'err', text: 'Ошибка сохранения: ' + error.message });
    } else {
      setMsg({ kind: 'ok', text: 'Изменения сохранены ✓' });
      await reload();
    }
    setSaving(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div>
            <h1 className="font-bold text-gray-900 leading-tight">Админ-панель</h1>
            <p className="text-xs text-gray-400 leading-tight">Черным по белому</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100"
            >
              Открыть сайт
            </a>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="px-4 py-2 rounded-md bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50"
            >
              {saving ? 'Сохранение…' : 'Сохранить'}
            </button>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="px-3 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-100"
              title="Выйти"
            >
              <i className="ri-logout-box-r-line" />
            </button>
          </div>
        </div>
        {msg && (
          <div
            className={`text-sm px-4 py-2 text-center ${
              msg.kind === 'ok' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {msg.text}
          </div>
        )}
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-sm text-gray-500 mb-4">
          Меняйте любой текст и изображения. После правок нажмите «Сохранить» — сайт обновится сразу.
        </p>

        {/* SEO */}
        <Section title="SEO — поисковая оптимизация">
          <Field label="Заголовок страницы (title)" value={d.seo.title} onChange={(v) => set('seo', { title: v })} textarea />
          <Field label="Описание (meta description)" value={d.seo.description} onChange={(v) => set('seo', { description: v })} textarea />
          <Field label="Ключевые слова (keywords)" value={d.seo.keywords} onChange={(v) => set('seo', { keywords: v })} textarea />
          <Field label="Заголовок для соцсетей (og:title)" value={d.seo.ogTitle} onChange={(v) => set('seo', { ogTitle: v })} />
          <Field label="Описание для соцсетей (og:description)" value={d.seo.ogDescription} onChange={(v) => set('seo', { ogDescription: v })} textarea />
        </Section>

        {/* Brand & navigation */}
        <Section title="Логотип и меню" defaultOpen>
          <ImageInput label="Логотип" value={d.brand.logo} onChange={(v) => set('brand', { logo: v })} />
          <Field label="Название компании" value={d.brand.name} onChange={(v) => set('brand', { name: v })} />
          <div className="grid grid-cols-2 gap-x-4">
            <Field label="Меню: Услуги" value={d.nav.services} onChange={(v) => set('nav', { services: v })} />
            <Field label="Меню: Галерея" value={d.nav.gallery} onChange={(v) => set('nav', { gallery: v })} />
            <Field label="Меню: Прайс" value={d.nav.pricing} onChange={(v) => set('nav', { pricing: v })} />
            <Field label="Меню: Отзывы" value={d.nav.reviews} onChange={(v) => set('nav', { reviews: v })} />
            <Field label="Меню: Контакты" value={d.nav.contacts} onChange={(v) => set('nav', { contacts: v })} />
            <Field label="Кнопка: Заявка" value={d.nav.request} onChange={(v) => set('nav', { request: v })} />
          </div>
        </Section>

        {/* Hero */}
        <Section title="Главный экран (Hero)">
          <Field label="Заголовок, строка 1" value={d.hero.titleLine1} onChange={(v) => set('hero', { titleLine1: v })} />
          <Field label="Заголовок, строка 2" value={d.hero.titleLine2} onChange={(v) => set('hero', { titleLine2: v })} />
          <Field label="Заголовок, строка 3" value={d.hero.titleLine3} onChange={(v) => set('hero', { titleLine3: v })} />
          <Field label="Текст слева" value={d.hero.subtitleLeft} onChange={(v) => set('hero', { subtitleLeft: v })} textarea />
          <Field label="Текст справа" value={d.hero.subtitleRight} onChange={(v) => set('hero', { subtitleRight: v })} textarea />
          <Field label="Ссылка на видео (MP4)" value={d.hero.videoUrl} onChange={(v) => set('hero', { videoUrl: v })} />
        </Section>

        {/* About */}
        <Section title="О компании">
          <Field label="Заголовок" value={d.about.title} onChange={(v) => set('about', { title: v })} textarea />
          <div className="mb-4">
            <span className="block text-xs font-semibold text-gray-600 mb-1.5">Теги-категории</span>
            <StringListEditor items={d.about.categories} onChange={(v) => set('about', { categories: v })} placeholder="Категория" />
          </div>
          <Field label="Бейдж блока" value={d.about.serviceTag} onChange={(v) => set('about', { serviceTag: v })} />
          <Field label="Заголовок блока" value={d.about.serviceTitle} onChange={(v) => set('about', { serviceTitle: v })} />
          <Field label="Описание блока" value={d.about.serviceDesc} onChange={(v) => set('about', { serviceDesc: v })} textarea rows={4} />
          <ImageInput label="Фото покрасочной камеры" value={d.about.boothImage} onChange={(v) => set('about', { boothImage: v })} />
          <div className="mt-2">
            <span className="block text-xs font-semibold text-gray-600 mb-2">Слайды (переключатели с фото)</span>
            <ListEditor
              items={d.about.services}
              onChange={(items) => set('about', { services: items })}
              factory={() => ({ id: uid(), tag: '', image: '' })}
              addLabel="Добавить слайд"
              render={(item, update) => (
                <>
                  <Field label="Подпись" value={item.tag} onChange={(v) => update({ tag: v })} />
                  <ImageInput label="Изображение" value={item.image} onChange={(v) => update({ image: v })} />
                </>
              )}
            />
          </div>
        </Section>

        {/* Features */}
        <Section title="Преимущества">
          <Field label="Надзаголовок" value={d.features.label} onChange={(v) => set('features', { label: v })} />
          <Field label="Заголовок" value={d.features.title} onChange={(v) => set('features', { title: v })} />
          <span className="block text-xs font-semibold text-gray-600 mb-2 mt-2">Карточки</span>
          <ListEditor
            items={d.features.items}
            onChange={(items) => set('features', { items })}
            factory={() => ({ id: uid(), icon: 'ri-star-line', title: '', description: '' })}
            addLabel="Добавить карточку"
            render={(item, update) => (
              <>
                <Field label="Иконка (класс RemixIcon, напр. ri-shield-check-line)" value={item.icon} onChange={(v) => update({ icon: v })} />
                <Field label="Заголовок" value={item.title} onChange={(v) => update({ title: v })} />
                <Field label="Описание" value={item.description} onChange={(v) => update({ description: v })} textarea />
              </>
            )}
          />
        </Section>

        {/* Gallery */}
        <Section title="Галерея работ">
          <Field label="Заголовок" value={d.gallery.title} onChange={(v) => set('gallery', { title: v })} />
          <span className="block text-xs font-semibold text-gray-600 mb-2 mt-2">Работы</span>
          <ListEditor
            items={d.gallery.items}
            onChange={(items) => set('gallery', { items })}
            factory={() => ({ id: uid(), title: '', category: '', price: '', image: '' })}
            addLabel="Добавить работу"
            render={(item, update) => (
              <>
                <ImageInput label="Фото" value={item.image} onChange={(v) => update({ image: v })} />
                <Field label="Название" value={item.title} onChange={(v) => update({ title: v })} />
                <div className="grid grid-cols-2 gap-x-4">
                  <Field label="Категория" value={item.category} onChange={(v) => update({ category: v })} />
                  <Field label="Цена" value={item.price} onChange={(v) => update({ price: v })} />
                </div>
              </>
            )}
          />
        </Section>

        {/* Pricing */}
        <Section title="Прайс-лист">
          <Field label="Заголовок" value={d.pricing.title} onChange={(v) => set('pricing', { title: v })} />
          <span className="block text-xs font-semibold text-gray-600 mb-2 mt-2">Позиции</span>
          <ListEditor
            items={d.pricing.items}
            onChange={(items) => set('pricing', { items })}
            factory={() => ({ id: uid(), name: '', price: '', note: '' })}
            addLabel="Добавить позицию"
            render={(item, update) => (
              <>
                <Field label="Наименование" value={item.name} onChange={(v) => update({ name: v })} />
                <div className="grid grid-cols-2 gap-x-4">
                  <Field label="Цена" value={item.price} onChange={(v) => update({ price: v })} />
                  <Field label="Примечание" value={item.note} onChange={(v) => update({ note: v })} />
                </div>
              </>
            )}
          />
        </Section>

        {/* Reviews */}
        <Section title="Отзывы">
          <Field label="Надзаголовок" value={d.reviews.label} onChange={(v) => set('reviews', { label: v })} />
          <Field label="Заголовок" value={d.reviews.title} onChange={(v) => set('reviews', { title: v })} />
          <div className="grid grid-cols-2 gap-x-4">
            <ImageInput label="Фоновое фото 1" value={d.reviews.image1} onChange={(v) => set('reviews', { image1: v })} />
            <ImageInput label="Фоновое фото 2" value={d.reviews.image2} onChange={(v) => set('reviews', { image2: v })} />
          </div>
          <span className="block text-xs font-semibold text-gray-600 mb-2 mt-2">
            Отзывы (первые 5 используются в раскладке)
          </span>
          <ListEditor
            items={d.reviews.items}
            onChange={(items) => set('reviews', { items })}
            factory={() => ({ id: uid(), name: '', role: '', text: '', avatar: '' })}
            addLabel="Добавить отзыв"
            render={(item, update) => (
              <>
                <ImageInput label="Аватар" value={item.avatar} onChange={(v) => update({ avatar: v })} />
                <div className="grid grid-cols-2 gap-x-4">
                  <Field label="Имя" value={item.name} onChange={(v) => update({ name: v })} />
                  <Field label="Роль" value={item.role} onChange={(v) => update({ role: v })} />
                </div>
                <Field label="Текст отзыва" value={item.text} onChange={(v) => update({ text: v })} textarea rows={4} />
              </>
            )}
          />
        </Section>

        {/* CTA */}
        <Section title="Блок заявки (CTA)">
          <Field label="Заголовок" value={d.cta.title} onChange={(v) => set('cta', { title: v })} />
          <Field label="Подзаголовок" value={d.cta.subtitle} onChange={(v) => set('cta', { subtitle: v })} textarea />
          <Field label="Текст кнопки" value={d.cta.button} onChange={(v) => set('cta', { button: v })} />
          <ImageInput label="Фоновое изображение" value={d.cta.bgImage} onChange={(v) => set('cta', { bgImage: v })} />
          <span className="block text-xs font-semibold text-gray-600 mb-2 mt-2">Варианты услуг в форме</span>
          <ListEditor
            items={d.cta.serviceOptions}
            onChange={(items) => set('cta', { serviceOptions: items })}
            factory={() => ({ id: uid(), value: uid().slice(0, 6), label: '' })}
            addLabel="Добавить вариант"
            render={(item, update) => (
              <Field label="Название услуги" value={item.label} onChange={(v) => update({ label: v })} />
            )}
          />
        </Section>

        {/* Form labels */}
        <Section title="Подписи формы">
          <div className="grid grid-cols-2 gap-x-4">
            <Field label="Плейсхолдер: Имя" value={d.form.name} onChange={(v) => set('form', { name: v })} />
            <Field label="Плейсхолдер: Телефон" value={d.form.phone} onChange={(v) => set('form', { phone: v })} />
            <Field label="Плейсхолдер: Email" value={d.form.email} onChange={(v) => set('form', { email: v })} />
            <Field label="Плейсхолдер: Услуга" value={d.form.service} onChange={(v) => set('form', { service: v })} />
          </div>
          <Field label="Плейсхолдер: Описание" value={d.form.description} onChange={(v) => set('form', { description: v })} />
          <Field label="Сообщение об успехе" value={d.form.success} onChange={(v) => set('form', { success: v })} textarea />
          <Field label="Сообщение об ошибке" value={d.form.error} onChange={(v) => set('form', { error: v })} textarea />
        </Section>

        {/* Footer / contacts */}
        <Section title="Контакты и футер">
          <Field label="Адрес" value={d.footer.address} onChange={(v) => set('footer', { address: v })} />
          <div className="grid grid-cols-2 gap-x-4">
            <Field label="Телефон" value={d.footer.phone} onChange={(v) => set('footer', { phone: v })} />
            <Field label="Email" value={d.footer.email} onChange={(v) => set('footer', { email: v })} />
          </div>
          <Field label="Заголовок рассылки" value={d.footer.newsletterTitle} onChange={(v) => set('footer', { newsletterTitle: v })} />
          <Field label="Плейсхолдер рассылки" value={d.footer.newsletterPlaceholder} onChange={(v) => set('footer', { newsletterPlaceholder: v })} />
          <Field label="Подсказка рассылки" value={d.footer.newsletterHint} onChange={(v) => set('footer', { newsletterHint: v })} />
          <div className="grid grid-cols-2 gap-x-4">
            <Field label="Заголовок «Меню»" value={d.footer.menuTitle} onChange={(v) => set('footer', { menuTitle: v })} />
            <Field label="Заголовок «Соцсети»" value={d.footer.socialTitle} onChange={(v) => set('footer', { socialTitle: v })} />
          </div>
          <Field label="Копирайт" value={d.footer.copyright} onChange={(v) => set('footer', { copyright: v })} />
          <Field label="Крупный текст внизу" value={d.footer.bigText} onChange={(v) => set('footer', { bigText: v })} />
          <span className="block text-xs font-semibold text-gray-600 mb-2 mt-2">Соцсети</span>
          <ListEditor
            items={d.footer.socials}
            onChange={(items) => set('footer', { socials: items })}
            factory={() => ({ id: uid(), label: '', icon: 'ri-links-line', url: '' })}
            addLabel="Добавить соцсеть"
            render={(item, update) => (
              <>
                <div className="grid grid-cols-2 gap-x-4">
                  <Field label="Название" value={item.label} onChange={(v) => update({ label: v })} />
                  <Field label="Иконка (RemixIcon)" value={item.icon} onChange={(v) => update({ icon: v })} />
                </div>
                <Field label="Ссылка" value={item.url} onChange={(v) => update({ url: v })} />
              </>
            )}
          />
        </Section>

        {/* Legal / requisites */}
        <Section title="Реквизиты и право (для политики конфиденциальности)">
          <Field label="Юр. название (ИП / ООО)" value={d.legal.companyName} onChange={(v) => set('legal', { companyName: v })} />
          <div className="grid grid-cols-2 gap-x-4">
            <Field label="ИНН" value={d.legal.inn} onChange={(v) => set('legal', { inn: v })} />
            <Field label="ОГРН / ОГРНИП" value={d.legal.ogrn} onChange={(v) => set('legal', { ogrn: v })} />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Показываются в подвале сайта и на странице «Политика конфиденциальности» (/privacy).
          </p>
        </Section>

        {/* Account / password */}
        <Section title="Аккаунт — смена пароля">
          <ChangePassword />
        </Section>

        <div className="flex justify-end py-6">
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="px-6 py-2.5 rounded-md bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Сохранение…' : 'Сохранить изменения'}
          </button>
        </div>
      </main>
    </div>
  );
}
