import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Messaging is not enabled in the demo. Add authenticated authorization, encryption, retention controls, abuse reporting, and an approved messaging provider before enabling it.' }, { status: 501 });
}
