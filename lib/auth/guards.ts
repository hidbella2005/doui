import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './config';
import type { UserRole } from '@prisma/client';

export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/sign-in');
  return session.user;
}

export async function requireRole(roles: UserRole[]) {
  const user = await requireUser();
  if (!user.role || !roles.includes(user.role)) redirect('/dashboard');
  return user;
}
