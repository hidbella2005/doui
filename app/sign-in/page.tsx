'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);
    const form = new FormData(event.currentTarget);
    const result = await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      redirect: false,
      callbackUrl: '/dashboard',
    });
    if (result?.error) {
      setError('We could not sign you in with those details.');
      setPending(false);
      return;
    }
    window.location.assign(result?.url ?? '/dashboard');
  }

  return (
    <main className="onboarding page-shell">
      <section className="consent-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in to your Doui space.</h1>
        <p>Use the email and password connected to your Doui account.</p>
        <form onSubmit={submit}>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className="password-field">
            <span>Password</span>
            <span className="password-input-wrap">
              <input name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required />
              <button className="password-toggle" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>
                {showPassword ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.2A11.4 11.4 0 0 1 12 5c5.2 0 9 5.6 9 7s-1.3 3.2-3.7 4.9M6.1 6.1C3.9 7.6 3 10.6 3 12c0 1.4 3.8 7 9 7 1 0 2-.2 2.8-.5" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s3.8-7 9-7 9 7 9 7-3.8 7-9 7-9-7-9-7Z" /><circle cx="12" cy="12" r="2.5" /></svg>}
              </button>
            </span>
          </label>
          {error && <p role="alert">{error}</p>}
          <button className="button button-primary" type="submit" disabled={pending}>
            {pending ? 'Signing in…' : 'Sign in'} <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>
    </main>
  );
}
