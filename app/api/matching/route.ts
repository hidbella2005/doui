import { NextResponse } from 'next/server';
import { matchTherapists, matchingAnswersSchema } from '../../../lib/matching';
import { therapists } from '../../../lib/mock-data';

export async function POST(request: Request) {
  const parsed = matchingAnswersSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid questionnaire payload' }, { status: 400 });
  const results = matchTherapists(parsed.data, therapists).map(({ therapist, score, reasons }) => ({ therapist, score, reasons }));
  return NextResponse.json({ results, disclaimer: 'Suggestions are preference-based and are not a diagnosis or clinical recommendation.' });
}
