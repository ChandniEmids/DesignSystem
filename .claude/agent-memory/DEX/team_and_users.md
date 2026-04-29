---
name: Team Structure & User Personas
description: Who's who — team structure, user types, and key contacts for the Surescripts engagement
type: project
---

## Team Structure

| Team / Person | Role |
|---|---|
| Team 28 | Built original execution screen — moved on |
| Team 30 | Certification tool / test execution (current team) |
| Team 32 | RTPB autoresponder |
| Team 36 | PPT (Patient Price Transparency) app |
| EMETS | Vendor organisation the design team belongs to |
| Samantha Bailey Fast | Surescripts Product Leader — primary client contact, owns cert tool roadmap |
| Deepa Patel | Surescripts — provided domain/ecosystem overview |
| Abhijit Joshi | Surescripts — provided certification tool walkthrough |
| Mohd Asif | UX team member on the engagement |
| Chandni | UX designer on the engagement (the user) |

## Two Core User Personas

### Engineering Customers
- Developers at EHR companies and pharmacies
- Updating XML integration code every NCPDP upgrade cycle
- Need: fast, clear feedback on what failed and exactly why
- Pain: must rewrite integration code; error messages may be too technical to diagnose quickly
- Technical literacy: high

### Non-Engineering Customers
- Business/ops side of customer organisations
- Managing certification progress without deep XML/NCPDP knowledge
- Need: clear progress view, plain-language status, no technical jargon
- Pain: tool may be designed primarily for engineers — creates friction
- Technical literacy: low to medium

## Surescripts Internal Users (Admin)

- Surescripts certification team staff
- Build test steps, test cases, test projects
- Assign projects to customer accounts
- Previously spent 57 hours manually shepherding each customer
- Now use the tool to set up and monitor customer self-service runs

---

## Detailed Role Definitions & Permissions

### External Customer User
Who: Customer teams (EHRs, pharmacies, PBMs, vendors) — developers, testers, analysts

Can do:
- Access Certification Tester area
- Execute test cases in their project
- Submit intake forms and test data
- View execution results and project progress
- Download certification artifacts (when available)

Cannot do: Create/edit test cases, modify assertions, approve certification

UI access: Certification Tester area only

---

### Internal Roles (Surescripts employees)

**Test Manager** — primary builder role
- Create and manage certification projects
- Build and maintain test cases, test steps, assertions
- Manage assertion rules and parameters
- Configure test data
- Review execution results; override execution status when justified
- Typical users: Certification Analysts, Test Designers, QA Engineers
- UI: Full Test Manager area

**Test Reviewer** — approval role
- Review customer test executions
- Add review comments
- Approve or reject submitted projects
- Request re-execution if issues are found
- Cannot create or edit test content
- Typical users: Certification Reviewers, Certification Managers
- UI: Test Manager (reviewer view) — assigned projects only

**QA Test Designer** — template/QA role
- Create QA test templates and reusable assets
- Maintain reusable test cases and assertions
- Prepare tests copied into customer projects later
- Customer projects are read-only; cannot modify live certification projects
- Typical users: QA Analysts, Test Automation Engineers
- UI: Test Manager (QA projects only)

**System Administrator** — full access
- Manage users and roles
- Configure environments and integrations
- View system logs
- Perform data management and maintenance
- Typical users: DevOps, System Administrators
- UI: All screens including admin/config

**Read-Only User (Internal)** — observation/reporting
- View projects, test cases, executions, reports
- Export data for reporting
- Cannot execute tests, edit content, or approve/reject certification
- UI: Test Manager (read-only)

---

## Role → Screen Mapping

**External Customer User → Certification Tester screens:**
- Dashboard (projects + progress)
- Project Detail View (test case list)
- Test Case Execution Screen (run steps, see results)
- Execution Details Screen (assertion pass/fail, logs)
- Forms / Test Data Screens (intake forms)

**Test Manager → Test Manager screens:**
- Dashboard (all projects across customers)
- Project Create / Edit
- Test Case Management (create, edit, copy, lock)
- Test Step Management (create, edit, attach files)
- Assertion Library (create, edit, version, manage rules)
- Execution Review (view results, notes, override status)

**Test Reviewer → Test Manager (restricted):**
- Project Review Screen
- Execution Results Screen
- Approval / Rejection Controls (approve, reject, comment, request re-execution)

**QA Test Designer → Test Manager (QA projects only):**
- QA Project Management, Test Case, Test Step, Assertion screens
- Customer projects: read-only

**System Administrator → All screens +:**
- User & Role Management
- System Configuration
- Environment & Integration Configuration
- System Logs / Maintenance

**Read-Only User → All Test Manager screens (read-only) + Reports/Export**

---

## Mental Model for Explaining Roles

> "Customers execute tests. Surescripts defines, reviews, and approves tests."
> "The application gets certified, not the user."
