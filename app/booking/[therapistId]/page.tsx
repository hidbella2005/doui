import Link from 'next/link';
import { notFound } from 'next/navigation';
import { therapists } from '../../../lib/mock-data';
import { BookingScheduler } from './BookingScheduler';

export default function BookingPage({ params }: { params: { therapistId: string } }) {
  const therapist = therapists.find((item) => item.id === params.therapistId);
  if (!therapist) notFound();
  return <main className="page-shell booking-page"><Link className="back-link" href={`/therapists/${therapist.id}`}>← Back to profile</Link><section className="booking-card"><p className="eyebrow">Reserve a first session</p><h1>Choose a time with {therapist.name.split(' ')[0]}.</h1><p className="muted">Select an available time and format. You will need an account and active consent before requesting a session.</p><BookingScheduler therapistId={therapist.id} /></section></main>;
}
