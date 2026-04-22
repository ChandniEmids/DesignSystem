---
name: Surescripts Product Context & Problem Framing
description: Strategic product context, the 57→9 hour journey, design scope, research constraints — from Samantha Bailey Fast KT session
type: project
---

## Primary Client Contact

**Samantha Bailey Fast** — Product Leader at Surescripts. Owns the certification tool roadmap. All design decisions go through her. She prioritises, not the UX team.

## The NCPDP Standard Lifecycle — Why This Problem Keeps Recurring

- NCPDP standard updated every **5–7 years**
- Each new version adds richer transaction types (started with just New RX, now includes refills, cancellations, transfers)
- **Every single customer must update their code every time — no exceptions**
- Creates a predictable, massive workload wave every few years
- This is not a one-time problem — the certification tool is a long-term infrastructure investment

## The 57 → 18 → 9 Hour Journey (Onboarding Modernization)

| Phase | Hours per Customer | What Changed |
|---|---|---|
| Before the tool | 57 hours | Fully manual — Surescripts staff guided every customer |
| After Certification Tool v1 | 18 hours | Self-service tool; customers do much of the work |
| Target by end of 2026 | 9 hours | Continued UX improvement + new automation |

> "It used to take us about 57 hours to do a project. Now it takes us about 18 hours. We're working to get to 9 hours by the end of 2026." — Samantha Bailey Fast

Initiative name: **Onboarding Modernization**

v1 is already launched, working well, good customer feedback.

## How Self-Service Certification Works Now

```
OLD: Customer → Surescripts cert team (57 hrs manual) → Production
NEW: Customer → Logs into Workbench → Runs test steps → Real-time pass/fail → Signs off → Production
```

Customers test in **Stage environment** — unusual, most companies don't let customers into staging. Surescripts did this intentionally to enable realistic self-service testing.

**Environment pipeline:**
```
Devint (dev/integration) → Stage (customer testing) → Production
```

## The Usability Testing Constraint — CRITICAL for Design

**Why traditional usability testing is impossible:**
- Network product — both customer's live system AND Surescripts' live system must be active simultaneously
- Cannot create fake or canned scenarios — messages are real XML flowing across two live systems

**Only research method available:**
- Observational research — sit side by side with real users during actual certification sessions
- No lab testing, no recorded prototypes, no A/B testing in traditional sense
- This is a non-negotiable, fundamental constraint of the product architecture

## Design Scope Confirmed by Samantha

1. Improving existing screens — UX friction reduction in current flows
2. New screens and functionality — features not yet built
3. Approach: Designers surface opportunities → product team decides what to prioritise
4. **Glue** — Surescripts' internal design system — design work may need to reference or extend it

## User Research That Exists

- Persona work done for non-engineering users (business/ops side of customer orgs)
- Separate research for engineering users (developers updating XML integration code)
- Not exhaustive but a starting point — Samantha will share
- No usability test recordings (not feasible given network constraint)

## Work Tracking

- **Aha** — current work tracking tool, temporary
- **JIRA** — transitioning to this, timing unknown (maybe June or August 2026)
- **Workbench** — platform where all certification work lives
- **Glue** — Surescripts' internal design system

## Team Capacity

- Galaxy and Hubble (other Surescripts projects) take 25–50% of team's time, never a full day
- Certification Tester work fills remaining bandwidth
- Capacity ebbs and flows

## The Real Problem (Problem Framing)

**Surface:** Customers need to certify their systems to connect to the Surescripts network.

**Real:** Every 5–7 years, a mandated NCPDP standard upgrade creates a massive, predictable workload spike. Previously 57 hours of manual effort per customer. Hundreds of customers upgrading simultaneously = unsustainable. The certification tool absorbs this spike through self-service. Current engagement pushes 18 → 9 hours.

## Hidden Assumptions to Challenge

1. Self-service = always better — non-engineering users may need more guided support
2. Stage = production equivalent — Production can behave differently, parity assumptions may mask issues
3. One tool fits both personas — engineering and non-engineering users have very different mental models
4. Reducing hours = reducing friction — process efficiency ≠ better UX
5. Good customer feedback = good UX — v1 feedback is relative to 57-hour manual baseline, bar may be low

## Design Opportunities

1. Error and warning messages — make XML assertion failures readable for non-engineers
2. Progress visibility — customers need clear view of what's done, what's blocking
3. Instructions clarity — step-level instructions may be inconsistent or too technical
4. Self-service sign-off — currently Surescripts still manually moves customers to Production
5. Non-engineering user experience — tool may be optimised for developers, business/ops needs different view
