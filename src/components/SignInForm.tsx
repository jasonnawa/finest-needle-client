'use client';

import { useState } from 'react';
import { signIn } from '@/api/auth/authService';

export default function SignInForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    window.location.assign('/matches');

    //TODO: login feature with auth
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await signIn(form);
      console.log('Signed in:', user);
      // Save token, redirect, etc.
    } catch (err: any) {
      setError(err.response?.data?.message || 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--accent)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ff4d88] transition"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
