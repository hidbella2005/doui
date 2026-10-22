'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.2A11.4 11.4 0 0 1 12 5c5.2 0 9 5.6 9 7s-1.3 3.2-3.7 4.9M6.1 6.1C3.9 7.6 3 10.6 3 12c0 1.4 3.8 7 9 7 1 0 2-.2 2.8-.5" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s3.8-7 9-7 9 7 9 7-3.8 7-9 7-9-7-9-7Z" /><circle cx="12" cy="12" r="2.5" /></svg>
  );
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const passwordChecks = [
    { label: '12 characters minimum', valid: password.length >= 12 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'One number', valid: /\d/.test(password) },
  ];
  const strength = passwordChecks.filter((check) => check.valid).length;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);
    const confirmation = String(form.get('passwordConfirmation') ?? '');
    if (password !== confirmation) {
      setError('Your passwords do not match.');
      return;
    }
    if (strength < passwordChecks.length) {
      setError('Please meet all password requirements before continuing.');
      return;
    }

    setPending(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          password,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        setError(result?.error ?? 'We could not create your account. Please try again.');
        setPending(false);
        return;
      }

      const signInResult = await signIn('credentials', {
        email: form.get('email'),
        password,
        redirect: false,
        callbackUrl: '/dashboard',
      });
      if (signInResult?.error) {
        window.location.assign('/sign-in');
        return;
      }
      window.location.assign(signInResult?.url ?? '/dashboard');
    } catch {
      setError('We could not reach Doui. Check your connection and try again.');
      setPending(false);
    }
  }

  return (
    <main className="onboarding page-shell auth-page">
      <div className="auth-layout">
        <section className="auth-intro">
          <p className="eyebrow">A private beginning</p>
          <h1>Create space for your next step.</h1>
          <p>Join Doui to keep your therapist search, sessions, and care choices together in one calm place.</p>
          <div className="auth-promise"><span aria-hidden="true">✦</span><span>We will never diagnose you or make a choice on your behalf.</span></div>
        </section>
        <section className="consent-card auth-card">
          <p className="eyebrow">Create your account</p>
          <h2>Welcome to Doui.</h2>
          <p className="auth-card-intro">Your account is the private home for your care journey.</p>
          <form onSubmit={submit}>
            <label><span>Your name</span><input name="name" type="text" autoComplete="name" placeholder="How should we call you?" minLength={2} maxLength={100} required /></label>
            <label><span>Email address</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            <label className="password-field">
              <span>Password</span>
              <span className="password-input-wrap">
                <input name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                <button className="password-toggle" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}><EyeIcon hidden={showPassword} /></button>
              </span>
            </label>
            <div className="password-checks" aria-label="Password requirements">
              {passwordChecks.map((check) => <span className={check.valid ? 'valid' : ''} key={check.label}><span aria-hidden="true">{check.valid ? '✓' : '○'}</span>{check.label}</span>)}
            </div>
            <label className="password-field">
              <span>Confirm password</span>
              <span className="password-input-wrap">
                <input name="passwordConfirmation" type={showConfirmation ? 'text' : 'password'} autoComplete="new-password" required />
                <button className="password-toggle" type="button" onClick={() => setShowConfirmation((visible) => !visible)} aria-label={showConfirmation ? 'Hide confirmation password' : 'Show confirmation password'} aria-pressed={showConfirmation}><EyeIcon hidden={showConfirmation} /></button>
              </span>
            </label>
            <label className="consent-row auth-consent"><input name="consent" type="checkbox" required /><span>I agree to Doui using my account details to provide this service. I understand this is not an emergency service.</span></label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary auth-submit" type="submit" disabled={pending}>{pending ? 'Creating your space…' : 'Create my account'} <span aria-hidden="true">↗</span></button>
          </form>
          <p className="auth-switch">Already have an account? <Link href="/sign-in">Sign in</Link></p>
        </section>
      </div>
    </main>
  );
}
