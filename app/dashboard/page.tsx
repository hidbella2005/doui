import Link from 'next/link';
import { requireUser } from '../../lib/auth/guards';

export default async function DashboardPage() {
  const user = await requireUser();
  const firstName = user.name?.split(' ')[0] ?? 'there';
  return <main className="page-shell dashboard-page"><div className="dashboard-heading"><div><p className="eyebrow">Your Doui space</p><h1>Good morning, {firstName}.</h1></div><Link className="button button-primary" href="/therapists">Explore care <span aria-hidden="true">↗</span></Link></div><div className="dashboard-grid"><section className="dashboard-card large"><p className="eyebrow">Next step</p><h2>Your care plan starts with a conversation.</h2><p className="muted">Once you book, this space will hold your appointment details, consent records, and therapist messages.</p><Link className="text-link" href="/therapists">Find a therapist →</Link></section><section className="dashboard-card"><p className="eyebrow">Messages</p><h2>Nothing waiting.</h2><Link className="text-link" href="/dashboard/messages">Open messages →</Link></section><section className="dashboard-card"><p className="eyebrow">Account</p><h2>Privacy first.</h2><Link className="text-link" href="/dashboard/settings">Review settings →</Link></section></div></main>;
}
