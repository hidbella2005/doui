import { NextResponse } from 'next/server';
import { matchTherapists } from '../../../lib/matching';
import { therapists } from '../../../lib/mock-data';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid questionnaire payload' }, { status: 400 });
  const results = matchTherapists(body, therapists).map(({ therapist, score, reasons }) => ({ therapist, score, reasons }));
  return NextResponse.json({ results, disclaimer: 'Suggestions are preference-based and are not a diagnosis or clinical recommendation.' });
}
