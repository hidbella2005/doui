# Doui architecture

## Public user flow

1. Landing page explains the service, limits, privacy posture, and crisis resources.
2. Onboarding starts with consent and separates optional wellbeing preferences from account identity.
3. A short questionnaire collects goals, preferred language, location/availability, session format, and therapist preferences.
4. Matching returns a small set of explainable recommendations rather than an opaque score.
5. A therapist profile shows qualifications, languages, approach, availability, fees, and verification status.
6. Booking creates a pending appointment and confirms consent, cancellation rules, and session format.
7. Dashboard provides appointments, messages, documents/consents, and settings.
8. Admin tools support therapist verification, availability oversight, reports, and audit review.

## Core entities

- `User`: account identity, role, locale, consent state, and security metadata.
- `TherapistProfile`: professional biography, languages, specialties, session formats, fees, and verification state.
- `AvailabilitySlot`: therapist-owned bookable interval with timezone and status.
- `Session`: client/therapist appointment, lifecycle status, format, and consent snapshot.
- `Conversation`: authorized client/therapist communication channel.
- `Message`: encrypted-at-rest message payload metadata and delivery state.
- `Subscription`: optional plan, billing provider reference, status, and period dates.
- `ConsentRecord`: versioned agreement with purpose, timestamp, locale, and withdrawal state.
- `AuditEvent`: administrative/security event with actor, action, target, timestamp, and request correlation ID.

## Matching approach

The MVP uses transparent rule-based matching. It compares questionnaire preferences against therapist specialties, languages, session formats, availability, and location. It must not diagnose, infer protected health attributes, or claim clinical suitability. Every recommendation includes a short reason and a reminder that the client chooses the therapist.

## Security boundaries

- Validate all inputs at the server boundary.
- Authorize every session, conversation, and admin action server-side.
- Never place private health details in URLs, analytics events, logs, or client-side demo fixtures.
- Keep payment data with a compliant payment processor; store only provider references.
- Use a managed secrets store and rotate credentials.
- Add rate limiting, CSRF protection where applicable, secure cookies, and audit logging before production.
