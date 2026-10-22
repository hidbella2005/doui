import Link from 'next/link';
import { requireUser } from '../../lib/auth/guards';

export default async function DashboardPage() {
  const user = await requireUser();
  const firstName = user.name?.split(' ')[0] ?? 'there';
  return <main className="page-shell dashboard-page">
    <div className="dashboard-heading">
      <div><p className="eyebrow">Your Doui space</p><h1>Good morning, {firstName}.</h1><p className="dashboard-intro">A calm place to keep your next step in view.</p></div>
      <Link className="button button-primary" href="/therapists">Explore care <span aria-hidden="true">↗</span></Link>
    </div>
    <div className="dashboard-grid">
      <section className="dashboard-card large dashboard-journey">
        <div><p className="eyebrow">Your care journey</p><h2>Small steps still count.</h2><p>Start by finding a therapist whose approach feels right for you.</p></div>
        <div className="journey-progress" aria-label="Care journey: profile not yet complete"><span style={{ width: '24%' }} /></div>
        <div className="journey-meta"><span>Getting started</span><strong>1 of 4 steps</strong></div>
        <Link className="button button-light" href="/therapists">Choose a therapist <span aria-hidden="true">↗</span></Link>
      </section>
      <section className="dashboard-card dashboard-session">
        <div className="card-heading"><p className="eyebrow">Next session</p><span className="dashboard-icon" aria-hidden="true">◷</span></div>
        <h2>Not booked yet</h2>
        <p className="muted">When you are ready, choose a time that works with your life.</p>
        <Link className="text-link" href="/therapists">Browse available times →</Link>
      </section>
      <section className="dashboard-card dashboard-messages">
        <div className="card-heading"><p className="eyebrow">Messages</p><span className="dashboard-icon" aria-hidden="true">↗</span></div>
        <h2>Nothing waiting.</h2>
        <p className="muted">Your private conversations will appear here.</p>
        <Link className="text-link" href="/dashboard/messages">Open messages →</Link>
      </section>
      <section className="dashboard-card dashboard-privacy">
        <div className="card-heading"><p className="eyebrow">Privacy check-in</p><span className="privacy-dot" aria-hidden="true" /></div>
        <h2>Your choices stay yours.</h2>
        <p className="muted">Review consent, security, and data settings whenever you need.</p>
        <Link className="text-link" href="/dashboard/settings">Review settings →</Link>
      </section>
    </div>
  </main>;
}
