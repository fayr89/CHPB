import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setErr('Неверный логин или пароль');
    setBusy(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-sm"
      >
        <h1 className="text-xl font-bold text-gray-900 mb-1">Админ-панель</h1>
        <p className="text-sm text-gray-500 mb-6">Черным по белому</p>

        <label className="block mb-4">
          <span className="block text-xs font-semibold text-gray-600 mb-1.5">Email</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </label>

        <label className="block mb-5">
          <span className="block text-xs font-semibold text-gray-600 mb-1.5">Пароль</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </label>

        {err && <p className="text-red-500 text-sm mb-4">{err}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full py-2.5 rounded-md bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          {busy ? 'Вход…' : 'Войти'}
        </button>
      </form>
    </div>
  );
}
