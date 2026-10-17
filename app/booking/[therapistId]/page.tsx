import Link from 'next/link';
import { notFound } from 'next/navigation';
import { therapists } from '../../../lib/mock-data';

export default function BookingPage({ params }: { params: { therapistId: string } }) {
  const therapist = therapists.find((item) => item.id === params.therapistId);
  if (!therapist) notFound();
  return <main className="page-shell booking-page"><Link className="back-link" href={`/therapists/${therapist.id}`}>← Back to profile</Link><section className="booking-card"><p className="eyebrow">Reserve a first session</p><h1>Choose a time with {therapist.name.split(' ')[0]}.</h1><p className="muted">This demo does not charge or create a real appointment. Production booking must require authenticated users, server-side availability checks, consent confirmation, and a compliant payment boundary.</p><div className="slot-list"><button className="slot-button"><span>Tomorrow · 18:00</span><span>Video</span></button><button className="slot-button"><span>Thursday · 10:30</span><span>Voice</span></button><button className="slot-button"><span>Friday · 16:00</span><span>Video</span></button></div><button className="button button-primary" disabled>Confirm after sign-in <span aria-hidden="true">↗</span></button><p className="microcopy">You will review cancellation terms and telehealth consent before confirming.</p></section></main>;
}
