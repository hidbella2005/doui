import { NextResponse } from 'next/server';
import { SessionFormat, UserRole } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../../../lib/db/prisma';
import { requireUser } from '../../../lib/auth/guards';

const bookingSchema = z.object({
  slotId: z.string().cuid(),
  format: z.nativeEnum(SessionFormat),
  consentAccepted: z.literal(true),
});

const availabilityQuerySchema = z.object({
  therapistId: z.string().min(1),
});

export async function GET(request: Request) {
  const query = availabilityQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!query.success) return NextResponse.json({ error: 'A therapist is required.' }, { status: 400 });

  const therapist = await prisma.therapistProfile.findFirst({
    where: {
      OR: [{ id: query.data.therapistId }, { userId: query.data.therapistId }],
      verificationStatus: 'VERIFIED',
    },
    select: { id: true, feeMad: true, formats: true },
  });
  if (!therapist) return NextResponse.json({ slots: [] });

  const slots = await prisma.availabilitySlot.findMany({
    where: { therapistId: therapist.id, status: 'AVAILABLE', startsAt: { gt: new Date() } },
    orderBy: { startsAt: 'asc' },
    take: 20,
    select: { id: true, startsAt: true, endsAt: true, timezone: true },
  });
  return NextResponse.json({ slots, formats: therapist.formats, feeMad: therapist.feeMad }, { headers: { 'Cache-Control': 'private, max-age=30' } });
}

export async function POST(request: Request) {
  const user = await requireUser();
  if (user.role !== UserRole.CLIENT) return NextResponse.json({ error: 'Only client accounts can book a session.' }, { status: 403 });

  const parsed = bookingSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Choose a valid slot, format, and consent record.' }, { status: 400 });

  const { slotId, format } = parsed.data;
  const now = new Date();
  try {
    const booking = await prisma.$transaction(async (transaction) => {
      const consent = await transaction.consentRecord.create({
        data: { userId: user.id, version: 'telehealth-v1', purpose: 'telehealth_booking', granted: true },
        select: { id: true },
      });

      const slot = await transaction.availabilitySlot.findFirst({
        where: {
          id: slotId,
          status: 'AVAILABLE',
          startsAt: { gt: now },
          therapist: { verificationStatus: 'VERIFIED' },
        },
        select: { id: true, therapist: { select: { userId: true, feeMad: true, formats: true } }, startsAt: true, endsAt: true },
      });
      if (!slot || !slot.therapist.formats.includes(format)) throw new BookingError('SLOT_UNAVAILABLE');

      const claimed = await transaction.availabilitySlot.updateMany({
        where: { id: slot.id, status: 'AVAILABLE' },
        data: { status: 'BOOKED' },
      });
      if (claimed.count !== 1) throw new BookingError('SLOT_UNAVAILABLE');

      const session = await transaction.session.create({
        data: {
          clientId: user.id,
          therapistId: slot.therapist.userId,
          slotId: slot.id,
          format,
          feeMad: slot.therapist.feeMad,
          consentId: consent.id,
          startsAt: slot.startsAt,
          endsAt: slot.endsAt,
          status: 'PENDING',
        },
        select: { id: true, startsAt: true, endsAt: true, status: true, feeMad: true, format: true },
      });
      await transaction.auditEvent.create({
        data: { actorId: user.id, action: 'BOOKING_REQUESTED', targetType: 'Session', targetId: session.id },
      });
      return session;
    });
    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    if (error instanceof BookingError) {
      const message = error.code === 'CONSENT_REQUIRED' ? 'Active consent is required before booking.' : 'That time is no longer available or does not support this format.';
      return NextResponse.json({ error: message }, { status: error.code === 'CONSENT_REQUIRED' ? 400 : 409 });
    }
    throw error;
  }
}

class BookingError extends Error {
  constructor(public readonly code: 'CONSENT_REQUIRED' | 'SLOT_UNAVAILABLE') {
    super(code);
  }
}
