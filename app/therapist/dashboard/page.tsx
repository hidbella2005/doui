import Link from 'next/link';
import { UserRole } from '@prisma/client';
import { prisma } from '../../../lib/db/prisma';
import { requireRole } from '../../../lib/auth/guards';

const formatLabels = {
  VIDEO: 'Video',
  VOICE: 'Voice',
  MESSAGING: 'Messaging',
} as const;

export default async function TherapistDashboardPage() {
  const user = await requireRole([UserRole.THERAPIST]);
  const [profile, sessions, openSlots] = await Promise.all([
    prisma.therapistProfile.findUnique({
      where: { userId: user.id },
      select: { title: true, verificationStatus: true, languages: true, formats: true },
    }),
    prisma.session.findMany({
      where: { therapistId: user.id, startsAt: { gte: new Date() }, status: { in: ['PENDING', 'CONFIRMED'] } },
      orderBy: { startsAt: 'asc' },
      take: 3,
      select: { id: true, startsAt: true, format: true, status: true, feeMad: true, client: { select: { name: true } } },
    }),
    prisma.availabilitySlot.count({ where: { therapist: { userId: user.id }, status: 'AVAILABLE', startsAt: { gte: new Date() } } }),
  ]);
  const firstName = user.name?.split(' ')[0] ?? 'there';
  const dateFormatter = new Intl.DateTimeFormat('en-MA', { weekday: 'short', day: 'numeric', month: 'short' });
  const timeFormatter = new Intl.DateTimeFormat('en-MA', { hour: '2-digit', minute: '2-digit' });

  return <main className="page-shell dashboard-page therapist-dashboard">
    <div className="dashboard-heading">
      <div><p className="eyebrow">Therapist space</p><h1>Good morning, {firstName}.</h1><p className="dashboard-intro">Your care practice, organized with intention.</p></div>
      <Link className="button button-primary" href="/dashboard/settings">Account settings <span aria-hidden="true">↗</span></Link>
    </div>
    <div className="dashboard-grid">
      <section className="dashboard-card large dashboard-journey">
        <div><p className="eyebrow">Professional profile</p><h2>{profile?.title ?? 'Complete your profile.'}</h2><p>{profile ? 'Your profile is ready to be reviewed and discovered by people looking for care.' : 'Add your professional details, languages, and session formats to begin your review.'}</p></div>
        <div className="journey-meta"><span>Verification status</span><strong>{profile?.verificationStatus ?? 'Not started'}</strong></div>
        <Link className="button button-light" href="/dashboard/settings">{profile ? 'Review profile' : 'Complete profile'} <span aria-hidden="true">↗</span></Link>
      </section>
      <section className="dashboard-card">
        <div className="card-heading"><p className="eyebrow">Upcoming sessions</p><span className="dashboard-icon" aria-hidden="true">◷</span></div>
        <h2>{sessions.length}</h2>
        <p className="muted">{sessions.length ? 'Sessions needing your attention.' : 'No upcoming sessions yet.'}</p>
        <Link className="text-link" href="/therapist/dashboard">Refresh schedule →</Link>
      </section>
      <section className="dashboard-card">
        <div className="card-heading"><p className="eyebrow">Open availability</p><span className="dashboard-icon" aria-hidden="true">+</span></div>
        <h2>{openSlots}</h2>
        <p className="muted">Available times visible to clients.</p>
        <Link className="text-link" href="/dashboard/settings">Manage availability →</Link>
      </section>
      <section className="dashboard-card therapist-session-list">
        <div className="card-heading"><p className="eyebrow">Your next sessions</p><span className="privacy-dot" aria-hidden="true" /></div>
        {sessions.length ? <div className="session-list">{sessions.map((session) => <div className="session-row" key={session.id}><div><strong>{session.client.name ?? 'Doui client'}</strong><span>{dateFormatter.format(session.startsAt)} · {timeFormatter.format(session.startsAt)}</span></div><span>{formatLabels[session.format]}</span></div>)}</div> : <p className="muted">Once a client books a time, the details will appear here.</p>}
      </section>
      <section className="dashboard-card">
        <div className="card-heading"><p className="eyebrow">Practice snapshot</p><span className="dashboard-icon" aria-hidden="true">✦</span></div>
        <p className="muted">Languages</p><h3>{profile?.languages.join(' · ') || 'Not added yet'}</h3>
        <p className="muted">Formats</p><h3>{profile?.formats.map((format) => formatLabels[format]).join(' · ') || 'Not added yet'}</h3>
      </section>
    </div>
  </main>;
}
