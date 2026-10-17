import Link from 'next/link';
import { therapists } from '../../lib/mock-data';

export default function TherapistsPage() {
  return <main className="page-shell listing-page"><div className="listing-heading"><div><p className="eyebrow">Your care shortlist</p><h1>People who could be a good place to begin.</h1></div><p>These suggestions are based on preferences, not a diagnosis. Take your time and choose the person who feels right.</p></div><div className="therapist-grid">{therapists.map((therapist) => <article className="therapist-card" key={therapist.id}><div className="avatar" style={{ background: therapist.accent }}>{therapist.initials}</div><div className="verified">✓ Verified profile</div><h2>{therapist.name}</h2><p className="muted">{therapist.title}</p><div className="tag-list">{therapist.specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}</div><p className="card-detail">Speaks {therapist.languages.join(' · ')}<br />From {therapist.feeMad} MAD · {therapist.nextSlot}</p><Link className="button button-outline" href={`/therapists/${therapist.id}`}>View profile <span aria-hidden="true">↗</span></Link></article>)}</div></main>;
}
