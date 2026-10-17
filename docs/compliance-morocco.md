# Morocco-first compliance checklist

This is an engineering checklist, not legal advice. Obtain review from Moroccan privacy, healthcare, and telehealth counsel before handling real patient data or launching paid clinical services.

## Privacy and data governance

- Confirm obligations under Morocco's Law 09-08 on personal data protection and CNDP procedures.
- Define Doui as a controller/processor by processing purpose and document each purpose.
- Prepare a privacy notice covering categories, purposes, retention, recipients, international transfers, rights, and contact details.
- Establish data minimization, retention schedules, deletion/export workflows, and breach response.
- Determine whether CNDP notification, authorization, or consultation is required for health data and profiling.
- Review hosting location and cross-border transfer requirements before selecting cloud services.

## Clinical and professional safeguards

- Verify therapist identity, professional qualification, license/registration, scope of practice, and expiry dates.
- Require therapist acceptance of professional conduct, safeguarding, emergency escalation, and documentation policies.
- Clearly state that Doui is not an emergency service and provide local emergency/crisis pathways.
- Obtain explicit consent for telehealth, messaging, recording (if ever enabled), and data processing separately.
- Document age/guardian flows and prohibit unsuitable use cases for minors until legally reviewed.

## Technical controls

- Encrypt data in transit and at rest; use managed keys and documented rotation.
- Use least-privilege access, MFA for staff, secure sessions, audit logs, rate limiting, backups, and restore tests.
- Separate production data from analytics and development fixtures.
- Do not log message bodies, questionnaire answers, access tokens, or payment details.
- Conduct threat modeling, dependency scanning, penetration testing, and an incident-response exercise.

## Product documents to add before launch

- Privacy policy
- Terms of service
- Informed consent and telehealth consent
- Therapist agreement and verification policy
- Cancellation/refund policy
- Cookie/analytics notice
- Data-subject request procedure
- Security incident and safeguarding procedures
