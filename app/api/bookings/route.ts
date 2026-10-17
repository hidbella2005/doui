import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Booking is not enabled in the demo. Add authentication, server-side availability checks, consent, payment, and audit logging before enabling it.' }, { status: 501 });
}
