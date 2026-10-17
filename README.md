# Doui

Doui is an original mental-wellbeing platform concept for Morocco, focused on helping people discover qualified therapists, book sessions, and communicate safely.

> Doui is an independent product. It does not copy BetterHelp's code, content, branding, imagery, or exact interface.

## MVP goals

- Clear, calm landing experience
- Consent-first onboarding questionnaire
- Explainable therapist matching
- Therapist profiles and booking flow
- Secure messaging foundation
- Role-aware admin workflows
- Morocco-first compliance documentation

## Stack

- Next.js 14 + TypeScript
- PostgreSQL + Prisma
- Auth.js-compatible credentials authentication
- bcrypt password hashing
- Zod request validation
- Rule-based explainable matching

## Database and authentication setup

```bash
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate -- --name init
npm run dev
```

See [docs/authentication.md](docs/authentication.md) for auth setup and production hardening requirements. See [docs/compliance-morocco.md](docs/compliance-morocco.md) before handling real health data.

## Current status

The repository includes the PostgreSQL/Prisma data model, registration endpoint, credentials sign-in boundary, role-aware middleware, protected dashboard/admin routes, and the original demo UI. Booking and messaging remain disabled until their security and compliance integrations are implemented.
