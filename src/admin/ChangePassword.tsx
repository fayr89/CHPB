import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const inputCls =
  'w-full px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500';

export function ChangePassword() {
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (pwd.length < 6) {
      setMsg({ kind: 'err', text: 'Пароль должен быть не короче 6 символов' });
      return;
    }
    if (pwd !== pwd2) {
      setMsg({ kind: 'err', text: 'Пароли не совпадают' });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pwd });
    if (error) {
      setMsg({ kind: 'err', text: 'Ошибка: ' + error.message });
    } else {
      setMsg({ kind: 'ok', text: 'Пароль изменён ✓' });
      setPwd('');
      setPwd2('');
    }
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="max-w-sm">
      <p className="text-sm text-gray-500 mb-3">
        Меняет пароль текущего пользователя, под которым вы вошли.
      </p>
      <label className="block mb-3">
        <span className="block text-xs font-semibold text-gray-600 mb-1.5">Новый пароль</span>
        <input
          type="password"
          autoComplete="new-password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className={inputCls}
        />
      </label>
      <label className="block mb-4">
        <span className="block text-xs font-semibold text-gray-600 mb-1.5">Повторите пароль</span>
        <input
          type="password"
          autoComplete="new-password"
          value={pwd2}
          onChange={(e) => setPwd2(e.target.value)}
          className={inputCls}
        />
      </label>
      {msg && (
        <p className={`text-sm mb-3 ${msg.kind === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
          {msg.text}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="px-4 py-2 rounded-md bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50"
      >
        {busy ? 'Сохранение…' : 'Сменить пароль'}
      </button>
    </form>
  );
}
