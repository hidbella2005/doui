import Link from 'next/link';
import { notFound } from 'next/navigation';
import { therapists } from '../../../lib/mock-data';

export default function TherapistProfile({ params }: { params: { id: string } }) {
  const therapist = therapists.find((item) => item.id === params.id);
  if (!therapist) notFound();
  return <main className="page-shell profile-page"><Link className="back-link" href="/therapists">← Back to profiles</Link><section className="profile-layout"><div><div className="profile-avatar" style={{ background: therapist.accent }}>{therapist.initials}</div><p className="eyebrow">{therapist.verified ? 'Verified professional' : 'Profile under review'}</p><h1>{therapist.name}</h1><p className="profile-title">{therapist.title}</p></div><div className="profile-panel"><p className="eyebrow">A possible fit because</p><p>They work with {therapist.specialties.join(' and ').toLowerCase()}, and offer sessions in {therapist.languages.join(' and ')}.</p><div className="profile-facts"><span>Languages<strong>{therapist.languages.join(' · ')}</strong></span><span>Formats<strong>{therapist.formats.join(' · ')}</strong></span><span>Starting at<strong>{therapist.feeMad} MAD</strong></span></div><Link className="button button-primary" href={`/booking/${therapist.id}`}>See available times <span aria-hidden="true">↗</span></Link></div></section><section className="profile-copy"><p className="eyebrow">About their approach</p><h2>A conversation shaped around your goals.</h2><p>This demo profile shows the information Doui would make available before a booking: professional background, therapeutic approach, languages, format, fees, availability, and verification status.</p></section></main>;
}
