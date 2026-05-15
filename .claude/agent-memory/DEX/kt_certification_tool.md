---
name: Certification Tool — Full Walkthrough
description: How the NCPDP Certification Testing Tool works — user types, hierarchy, test step fields, assertions, execution — from Abhijit Joshi KT session
type: project
---

## Why Certification Exists

In healthcare, standards are mandated by CMS, ONC, payers, and PBMs. Before a system can:
- Send e-prescriptions
- Submit pharmacy claims
- Exchange prior authorization messages

…it must prove it sends messages in the correct format, handles error cases correctly, and follows NCPDP rules exactly. That's what the Certification Tester is for.

Certification is **machine-to-machine testing**, not human training.

## Platform: Workbench

All certification work lives on a platform called **Workbench**. Two user types access it:

| User Type | Who | What They Can Do |
|---|---|---|
| Admin / Internal | Surescripts employees | Create test steps, cases, projects; assign to accounts; full access |
| External / Customer | Engineers at EHRs/pharmacies | Execute assigned projects; see own progress dashboard only |

External users have read + execute only — cannot create or edit test structure.

## The Hierarchy

```
Test Step → Test Case → Test Project → Account (Customer)
```

- **Test Step** — atomic unit. One message exchange (e.g. send a New RX, receive response)
- **Test Case** — logical group of test steps testing one scenario
- **Test Project** — full collection of test cases for one customer's certification run
- **Account** — the customer entity. A test project is assigned to a specific account

## Creating a Test Step — All Fields

| Field | What It Is |
|---|---|
| Product | Which Surescripts product (e.g. NCPDP SCRIPT, RTPB) |
| Message Version | Version of NCPDP standard (e.g. 10.6, 2017071) |
| Message Type | Transaction type (New RX, Renewal Request, Cancellation, etc.) |
| Direction | Who sends — Customer Sends or Customer Receives |
| SPI | Surescripts Prescriber ID — used when customer is prescriber/EHR |
| NCPDP ID | Unique pharmacy identifier — used when customer is pharmacy |
| Assertions | Rules to validate the message |
| Attachments | Sample files or reference materials |
| Instructions | Human-readable guidance for external user |

**Direction field:**
- **Customer Sends** → customer's system sends the message; tool receives and validates → uses SPI
- **Customer Receives** → Surescripts sends to customer; customer must respond → uses NCPDP ID

## Assertions — How Validation Works

An assertion is a specific yes/no rule that verifies one expected condition during a test. If it fails, the test fails. Assertions are the smallest unit of validation — granular by design so failures are pinpointed, not vague.

**By source:**
- System assertions — built in by Surescripts, always present, cannot be removed
- User-defined assertions — added manually by admin for specific requirements

**By severity:**
- **Error** — message fails, blocks progress, customer must fix and resend
- **Warning** — message continues, warning flagged, customer informed but not blocked

**Mandatory vs Optional:** Some always checked, some can be toggled by admin.

**What assertions validate:**
- Required fields are present
- Field values match expected values
- Message structure is correct
- Error handling behaves as expected
- Correct response type was returned
- Business rules were followed for that scenario

**How assertions roll up to certification:**
```
Assertion fails → Test Step fails
Test Step fails → Test Case fails
Any required Test Case fails → Certification is not complete
All required assertions pass → Certification can proceed
```

A system can be "mostly working" — message sent, workflow complete — and still fail certification because one required field was missing or one value was formatted incorrectly. There is no partial credit at the certification level.

**Passport analogy:** Passport valid ✅ / Ticket valid ✅ / Name matches ❌ → you don't board the flight.

## Message ID and Relate To

Links request and response messages together:
- **Message ID** — unique identifier on every outbound message
- **Relate To** — on a response step, references the Message ID of the original request

Example:
```
Step 1: Customer sends New RX → Message ID = "MSG-001"
Step 2: Customer receives Response → Relate To = "MSG-001"
```

## Test Execution — What External User Sees

1. Sees progress dashboard — steps complete, pending, failed
2. Clicks a test step → sees instructions + expected message structure
3. Triggers message from their system
4. Tool receives it, runs all assertions
5. Result: Pass (green) or Fail (red) with which assertion failed and why
6. On fail → customer fixes code, resends
7. On pass → step complete, move to next

Real-time feedback — no waiting for Surescripts person to review.

## RTPB Autoresponder (Team 32)

RTPB = Real-Time Pharmacy Benefit. Different product from NCPDP certification.

Auto-generates responses to RTPB queries based on:
- **PBM Member ID** — if incoming query has specific Member ID, auto-respond with preset response
- **Last name + ZIP code** — if last name and ZIP match, auto-respond

Used to simulate PBM responses without a real PBM system being live.

## Who Gets Certified

Certification is granted to the **customer's application/system**, not to a person or user.

It is associated with:
- Customer Account
- Application Name + Version
- Certified Product(s) (e.g. ePrescribing, Eligibility)
- Message Types
- Date of certification

Changing the application version may require re-certification. Adding new products or message types requires additional certification.

Simple rule: *"We don't certify people. We certify customer systems for specific products and message types."*

## What "Messages" Mean in Certification Tester

Messages are the actual healthcare transactions that a customer system sends or receives and that the tool validates during certification. They are the core thing being tested.

Types: NewRx, CancelRx, Renewal Request, Eligibility query, RTPB query, EPA request — etc.

## End-to-End: One Message Through a Test Step

Using NewRx as the example (same pattern applies to all message types):

1. **Test step is activated** — external user opens step in Certification Tester, reads instructions, sees what message to send
2. **Customer system sends the message** — real outbound XML from the customer system into the Surescripts test environment; NOT typed into the UI
3. **Message is captured** — tool detects the message, displays it; user confirms it to associate with the step
4. **Assertions execute** — each assertion runs independently against the message:
   - Was message type correct?
   - Were required fields present?
   - Were content/values valid?
   - Were message IDs and references correct?
5. **Step result calculated** — ALL required assertions must pass; one failure = step fails, even if everything else passed
6. **Results roll up** — step → test case → project → certification status
7. **Fix and re-execute** — customer fixes their system, sends corrected message, assertions run again

Real-time feedback — no waiting for a Surescripts person to review manually.

## Two Main UI Areas (Navigation Model)

| UI Area | Who Uses It | Purpose |
|---|---|---|
| **Certification Tester** | External (customer) users | Execute certification tests |
| **Test Manager** | Internal (Surescripts) users | Build, manage, and approve certification content |

## Copy Feature

Admins can copy an existing test step and modify it — useful for creating many similar steps differing only in one or two fields.

---

## End-to-End Certification Journey (Customer Tester POV)

The customer tester **never creates tests**. Their job is to: execute, attest, submit, and respond to review feedback.

### Visual Reference
Full end-user flow diagram (28 steps, 4 phases) is saved at:
`Designer-Assistant/swimlane.png`
It is embedded in `ct-basics.html` Section 11 with a show/hide toggle.

### Grounding Example
- **Role:** External customer tester (EHR / Prescriber system)
- **Goal:** Run all assigned test cases, submit for review, get approved
- **Example:** QA eRX / Prescriber / Fernandez / Amoxicillin (NewRx, Change, Refill, Cancel)

---

### Phase 1 — Access & Readiness (Steps 1–6)

| Step | Action |
|---|---|
| 1 | Customer logs in to Certification Tool |
| 2 | Certification Dashboard loads — assigned projects visible |
| 3 | Decision: Is Test Data Setup required? |
| 4 | If yes → fill and submit Test Data Setup forms |
| 5 | Decision: Data approved? If no → revise and resubmit |
| 6 | If approved (or no setup needed) → return to Dashboard |

---

### Phase 2 — Test Execution (Steps 7–21) — Core Work

| Step | Action |
|---|---|
| 7 | Open Certification Project |
| 8 | Select a Test Case |
| 9 | Decision: Is test case status = "Update Requires Restart"? |
| 10 | If yes → Restart Test Case, then return to step 8 |
| 11 | Start Test Execution |
| 12 | Read Test Step Instructions |
| 13 | Perform action in own system (send NewRx, Change, Refill, Cancel, etc.) |
| 14 | Decision: Does system assertion auto-pass? |
| 15 | If no → Review validation errors |
| 16 | **User Attestation** — checkbox / manual confirmation (see note below) |
| 17 | Decision: Did the step pass? |
| 18 | If no → Add failure comments and evidence |
| 19 | If yes → Mark Step Passed |
| 20 | Move to Next Test Step |
| 21 | Decision: More steps? If yes → return to step 12 |

**User Attestation (Step 16):**
Even when the system auto-passes a test (all automated validations satisfied), the tool may still require the user to manually confirm they have:
- Reviewed the auto-pass result
- Confirmed the result is accurate and acceptable
- Accepted responsibility for the outcome

> System auto-pass = technical checks passed automatically
> User Attestation = human acknowledgment and sign-off (compliance + audit requirement)

This is distinct from assertions: assertions are system-level validation rules; attestation is a human compliance checkpoint.

---

### Phase 3 — Submission & Review (Steps 22–26)

| Step | Action |
|---|---|
| 22 | Complete Test Case Execution |
| 23 | Download Execution Report (optional) |
| 24 | Decision: More test cases in project? If yes → return to step 8 |
| 25 | Submit Project for Review (project is now locked) |
| 26 | Reviewer Decision |

---

### Phase 4 — Outcome (Steps 27–28)

| Step | Outcome |
|---|---|
| 27 | Approved → Certification Complete |
| 28 | Changes Required → Project unlocked → user re-executes failed tests → resubmits from step 8 |

---

### Legend (from flow diagram)
- **Blue boxes** — System actions (performed by the Certification Tool: validations, status updates, locking projects)
- **Green boxes** — User actions (performed by the customer tester: execute steps, attest, submit)
- **Orange/yellow diamonds** — Decision points (Yes/No conditions)
- **Purple** — Key outcomes (Certification Complete or Changes Required)
