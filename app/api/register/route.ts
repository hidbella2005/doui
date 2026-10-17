import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../../../lib/db/prisma';

const registrationSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: z.string().min(12).max(128),
  name: z.string().trim().min(2).max(100),
});

export async function POST(request: Request) {
  const parsed = registrationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Use a valid name, email, and password of at least 12 characters.' }, { status: 400 });
  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email }, select: { id: true } });
  if (existing) return NextResponse.json({ error: 'Unable to create account with these details.' }, { status: 409 });
  const user = await prisma.user.create({ data: { email: parsed.data.email, name: parsed.data.name, passwordHash: await hash(parsed.data.password, 12) }, select: { id: true, email: true, name: true, role: true } });
  return NextResponse.json({ user }, { status: 201 });
}
