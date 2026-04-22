---
name: Certification Tool — Full Walkthrough
description: How the NCPDP Certification Testing Tool works — user types, hierarchy, test step fields, assertions, execution — from Abhijit Joshi KT session
type: project
---

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

Rules that define what a valid XML message looks like.

**By source:**
- System assertions — built in by Surescripts, always present, cannot be removed
- User-defined assertions — added manually by admin for specific requirements

**By severity:**
- **Error** — message fails, blocks progress, customer must fix and resend
- **Warning** — message continues, warning flagged, customer informed but not blocked

**Mandatory vs Optional:** Some always checked, some can be toggled by admin.

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

## Copy Feature

Admins can copy an existing test step and modify it — useful for creating many similar steps differing only in one or two fields.
