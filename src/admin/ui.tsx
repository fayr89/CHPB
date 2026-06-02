import { useState } from 'react';
import type { ReactNode } from 'react';
import { uploadImage } from './storage';

const inputCls =
  'w-full px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent';

export function uid(): string {
  const c = globalThis.crypto as Crypto | undefined;
  return c?.randomUUID ? c.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function Field({
  label,
  value,
  onChange,
  textarea,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</span>
      {textarea ? (
        <textarea
          className={`${inputCls} resize-y`}
          rows={rows ?? 3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

export function ImageInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr('');
    try {
      onChange(await uploadImage(file));
    } catch {
      setErr('Не удалось загрузить файл');
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  return (
    <div className="mb-4">
      <span className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</span>
      <div className="flex items-start gap-3">
        {value ? (
          <img
            src={value}
            alt=""
            className="w-20 h-20 object-cover rounded-md border border-gray-200 flex-none bg-gray-50"
          />
        ) : (
          <div className="w-20 h-20 rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-300 flex-none">
            <i className="ri-image-line text-2xl" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <input
            className={inputCls}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL изображения"
          />
          <div className="mt-2 flex items-center gap-3">
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-700 cursor-pointer transition-colors">
              <i className="ri-upload-2-line" />
              {busy ? 'Загрузка…' : 'Загрузить файл'}
              <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={busy} />
            </label>
            {err && <span className="text-red-500 text-xs">{err}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Section({
  title,
  children,
  defaultOpen,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className="border border-gray-200 rounded-lg mb-3 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800">{title}</span>
        <i className={`text-gray-400 ${open ? 'ri-subtract-line' : 'ri-add-line'}`} />
      </button>
      {open && <div className="px-5 pb-5 pt-1 border-t border-gray-100">{children}</div>}
    </div>
  );
}

export function StringListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((val, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            className={inputCls}
            value={val}
            placeholder={placeholder}
            onChange={(e) => {
              const next = items.slice();
              next[idx] = e.target.value;
              onChange(next);
            }}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, i) => i !== idx))}
            className="w-9 flex-none rounded-md bg-white border border-gray-200 text-red-500 hover:bg-red-50"
            title="Удалить"
          >
            <i className="ri-delete-bin-line" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-dashed border-gray-300 text-xs text-gray-600 hover:border-primary-500 hover:text-primary-600"
      >
        <i className="ri-add-line" /> Добавить
      </button>
    </div>
  );
}

export function ListEditor<T extends { id: string }>({
  items,
  onChange,
  factory,
  addLabel,
  render,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  factory: () => T;
  addLabel: string;
  render: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
}) {
  const update = (id: string, patch: Partial<T>) =>
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const remove = (id: string) => onChange(items.filter((it) => it.id !== id));
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = items.slice();
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div key={it.id} className="border border-gray-200 rounded-md p-3 bg-gray-50">
          <div className="flex justify-end gap-1 mb-2">
            <button
              type="button"
              onClick={() => move(idx, -1)}
              disabled={idx === 0}
              className="w-7 h-7 rounded bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
              title="Вверх"
            >
              <i className="ri-arrow-up-line" />
            </button>
            <button
              type="button"
              onClick={() => move(idx, 1)}
              disabled={idx === items.length - 1}
              className="w-7 h-7 rounded bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
              title="Вниз"
            >
              <i className="ri-arrow-down-line" />
            </button>
            <button
              type="button"
              onClick={() => remove(it.id)}
              className="w-7 h-7 rounded bg-white border border-gray-200 text-red-500 hover:bg-red-50"
              title="Удалить"
            >
              <i className="ri-delete-bin-line" />
            </button>
          </div>
          {render(it, (patch) => update(it.id, patch))}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, factory()])}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-dashed border-gray-300 text-sm text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors"
      >
        <i className="ri-add-line" /> {addLabel}
      </button>
    </div>
  );
}
