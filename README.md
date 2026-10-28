# Doui

Doui is an original mental-wellbeing platform concept for Morocco, focused on helping people discover qualified therapists, book sessions, and communicate safely.



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

## Scaling beyond the MVP

The application is designed to run as multiple stateless Next.js instances, but production scaling requires shared infrastructure:

- Use a managed PostgreSQL service with connection pooling (for example, PgBouncer or the provider's pooled connection URL). Keep direct and pooled database URLs separate for migrations.
- Keep `NEXTAUTH_SECRET` identical across all instances. JWT sessions avoid per-instance session storage, but key rotation must be planned.
- Put rate limiting and short-lived caching in a shared store such as Redis; an in-memory limiter is not safe when traffic is distributed across instances.
- Send logs, request latency, database timings, and health failures to a central observability service.
- Configure the load balancer to use `GET /api/health` as the readiness check. It returns `503` when the database is unavailable.
- Build with `npm run build` and deploy `.next/standalone`, `.next/static`, and `public`. The standalone output keeps the runtime image small and lets multiple instances start with the same artifact.
- Serve `/_next/static/*` through a CDN or edge cache. These files are content-hashed and receive a one-year immutable cache policy.
- Keep booking and messaging behind server-side authorization, transactions, audit logging, and reviewed external providers before enabling them at scale.

## Current status

The repository includes the PostgreSQL/Prisma data model, registration endpoint, credentials sign-in boundary, role-aware middleware, protected client/therapist dashboards, and the original demo UI. Booking requests now require an authenticated client, active consent, a verified therapist, and an available future slot; payment confirmation and messaging remain disabled until their security and compliance integrations are implemented.
