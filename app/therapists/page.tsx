import { therapists } from '../../lib/mock-data';
import { TherapistDirectory } from './TherapistDirectory';

export default function TherapistsPage() {
  return <main className="page-shell listing-page"><div className="listing-heading"><div><p className="eyebrow">Your care shortlist</p><h1>People who could be a good place to begin.</h1></div><p>These suggestions are based on preferences, not a diagnosis. Take your time and choose the person who feels right.</p></div><TherapistDirectory therapists={therapists} /></main>;
}
