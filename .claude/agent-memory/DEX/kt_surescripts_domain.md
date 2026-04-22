---
name: Surescripts Domain Knowledge
description: What Surescripts is, the US healthcare ecosystem, prescription flow, NCPDP standard — from Deepa Patel KT session
type: project
---

## What Surescripts Is

Surescripts is a **Health Information Network (HIN)** — middleware that sits between prescribers (doctors/EHRs), pharmacies, and payers (insurance companies). It validates and routes electronic prescriptions across the entire US healthcare ecosystem.

- Hired by major EHRs: Epic, Cerner, Greenway; payers like Aetna
- Validates e-prescription messages (age-appropriateness, drug safety, formulary checks) before forwarding
- Only **6 outstanding production defects** in ~20 years — extremely high quality bar
- EMETS team is the **first external vendor** Surescripts has ever engaged for development

## The US Healthcare Ecosystem

| Player | Role |
|---|---|
| Prescribers | Doctors/clinicians who write prescriptions |
| EHR / EMR | Software that manages patient records and sends prescriptions |
| Surescripts | The network hub — validates and routes all prescription messages |
| Pharmacies | Receive, fill, and process prescriptions |
| Payers / PBMs | Insurance companies and Pharmacy Benefit Managers — handle coverage and formulary |

**EHR vs EMR:**
- EMR = single organisation only (one hospital, one practice)
- EHR = cross-organisation, supports hospitalisation records across providers
- Also called HTV (Health Tech Vendor)

## How a Prescription Flows

1. Doctor diagnoses patient → decides to prescribe
2. EHR creates a **New RX** message
3. New RX hits Surescripts first — validation layer
4. Surescripts checks: age-appropriateness, drug safety, formulary status, prescriber credentials
5. If VALID → forwards to pharmacy; if INVALID → rejects back to prescriber
6. Pharmacy dispenses to patient

**Refill/Renewal flow:**
Patient needs refill → Pharmacy sends Renewal Request → Surescripts routes to prescriber → Prescriber approves/modifies/denies → Response flows back → Pharmacy fills

## Key Transaction Types
- **New RX** — New prescription from doctor to pharmacy
- **Renewal Request** — Refill request from pharmacy on patient's behalf
- **ERX** — General term for electronic prescription
- **Cancellation** — Cancelling an active prescription
- **Transfer** — Moving a prescription between pharmacies or doctors

## What is NCPDP?

NCPDP = National Council for Prescription Drug Programs — an independent non-profit that maintains the standard for electronic prescription data exchange. Any EHR, pharmacy, or system connecting to Surescripts must comply with and certify against this standard.

## PPT — Patient Price Transparency (Team 36)

Separate initiative. Patients currently can't compare drug prices across pharmacies. Building an opt-in app via SMS link — shows medication prices + pharmacy distance. Owned by Team 36, separate from certification tool.
