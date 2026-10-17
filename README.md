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

## Planned stack

- Next.js + TypeScript
- Tailwind CSS
- Node.js route handlers
- PostgreSQL + Prisma
- Auth.js-compatible authentication boundary
- Zod validation
- WebSocket/provider boundary for messaging

## Repository structure

```text
app/
  (marketing)/page.tsx                 # Landing page
  onboarding/page.tsx                  # Consent and questionnaire flow
  therapists/page.tsx                  # Search and matched therapists
  therapists/[id]/page.tsx             # Therapist profile
  booking/[therapistId]/page.tsx       # Session booking
  dashboard/page.tsx                   # Client dashboard
  dashboard/messages/page.tsx          # Secure messaging UI
  dashboard/settings/page.tsx          # Privacy and account settings
  admin/page.tsx                       # Admin overview
  api/matching/route.ts                # Explainable matching endpoint
  api/bookings/route.ts                # Booking endpoint boundary
  api/messages/route.ts                # Messaging endpoint boundary
components/
  brand/                               # Doui logo and identity components
  onboarding/                          # Questionnaire components
  therapists/                          # Cards, filters, profile blocks
  booking/                             # Availability and booking components
  messaging/                           # Conversation UI components
  ui/                                  # Accessible primitives
lib/
  matching/                            # Matching rules and explanations
  validation/                          # Zod schemas
  security/                            # Consent, authorization, redaction boundaries
  db/                                  # Prisma client boundary
  mock-data.ts                         # Safe demo data only
prisma/
  schema.prisma                        # Users, therapists, sessions, messages, subscriptions
public/
  doui-mark.svg                        # Original Doui mark
  doui-wordmark.svg                    # Original wordmark
  manifest.webmanifest
 docs/
  architecture.md                      # Product and data model decisions
  compliance-morocco.md                # Morocco-first compliance checklist
  betterhelp-inspiration-notes.md      # High-level public-flow observations only

## Status

Initial architecture and file structure are defined. The UI and API layers will be added incrementally with demo-safe data before production integrations.
