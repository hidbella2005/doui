'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

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
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
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
