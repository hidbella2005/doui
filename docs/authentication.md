# Authentication and authorization

Doui uses Auth.js-compatible credentials authentication with a PostgreSQL-backed Prisma user model.

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.
3. Install dependencies with `npm install`.
4. Generate the Prisma client: `npm run db:generate`.
5. Create the local migration: `npm run db:migrate -- --name init`.
6. Start the app with `npm run dev`.

## Security behavior

- Passwords are hashed with bcrypt and never stored in plaintext.
- Credentials are validated server-side with Zod.
- Sessions use signed JWT cookies.
- New registrations are always `CLIENT`.
- Therapist and admin roles must be granted through a controlled administrative process, never through public input.
- Middleware protects dashboards, bookings, and admin routes.
- Admin routes require the `ADMIN` role.

Before production, add email verification, password reset, MFA for staff, login throttling, account recovery, session revocation, security event monitoring, and a tested secret-rotation process.
