# PHP/MySQL Migration Readiness and Roadmap

## Readiness assessment

**Frontend prototype: feature-rich; backend integration readiness: low to moderate.** The pages expose many useful field names, filters, validation rules, and intended workflows, but data is duplicated across page-local arrays and static HTML. No authentication/session, database persistence, server-side authorization, or cross-role data flow exists.

### Work required before or during migration

1. Reconcile the identity and sample-data decisions recorded in `02-data-inconsistencies.md`.
2. Freeze canonical vocabulary for roles, account status, appointment states, lab order states, result processing/authorization/classification, invoice state, and priorities.
3. Implement a common `users` account with hashed passwords and one role profile; registration is patient-only.
4. Replace display-name FKs (`patient`, `doctor`, `department`, `order ID`) with submitted public identifiers resolved to numeric FKs server-side.
5. Connect currently disconnected booking/admin/doctor queues, lab order/queue/results/reports, prescription views, and invoice/payment pages.
6. Backend validation must repeat all browser validation and enforce unique email/license/test identifiers, date/time rules, valid references, allowed status transitions, and result ranges.
7. Use `mysqli` prepared statements for every query; use PHP procedural code only, as specified for the future phase.
8. Enforce session role and record ownership on every request. Patient IDs and doctor IDs must come from session/authorized relationships, not trusted form fields.
9. Escape database output in HTML; avoid generating markup from untrusted content.
10. Use transactions for multi-row business operations and audit important state changes.

### Frontend fields that need mapping (not necessarily HTML renaming)

- Patient `id` and patient ID values become `patient_profiles.patient_number`, resolved to `user_id`.
- Appointment `id`/`appointment_id`/`appointmentId` and lab `orderId`/`order_id` values use stable public-number columns; database FKs remain numeric.
- `doctor`, `doctorName`, `doctor_id`, and `doctorId` must resolve to one doctor profile. Department is derived from doctor FK.
- Result fields `status`, `result-status`, report `authorization`, and LOW/NORMAL/HIGH flags are separate concepts and must not map to one column.
- `experience: "10 Years"` should be stored as a number of years and formatted for display.
- `start`, `startTime`, `time`, `appointment_date`/`date` should be mapped to DATE/TIME fields consistently.
- `invoice.amount` summary data should be replaced by `invoice_items` and payment-derived totals.

### Transaction boundaries

- Create user + role profile.
- Create/reschedule/cancel appointment and maintain slot claim/availability atomically.
- Save consultation and vitals together when provided.
- Save prescription header and all medicine rows.
- Save lab order and all selected test rows.
- Save result report and all component values.
- Generate invoice and its line items.
- Record payment attempt and update paid state.
- Set a patient’s primary payment method, clearing the previous primary in the same transaction.

### Recommended implementation order

1. Review and approve schema and sample-data decisions; select XAMPP/MySQL/MariaDB version.
2. Create and test schema, then load canonical departments, tests, demo accounts/profiles.
3. Build procedural PHP configuration, database connection, login/logout, session and role guards.
4. Implement patient profile and registration.
5. Implement doctor/staff/departments administration.
6. Implement schedules and integrated appointments with concurrency/conflict validation.
7. Implement consultations/vitals and health logs.
8. Implement prescriptions/items and patient read-only view.
9. Implement lab catalogue, orders/items, queue transitions, result values, authorization, and patient/doctor report access.
10. Implement invoices/items and simulated payment attempts.
11. Replace dashboard/report arrays with SQL aggregates; add audit writes and filters.
12. Run role/ownership, invalid-reference, state-transition, date/overlap, transaction rollback, and multi-attempt payment tests.

No PHP conversion or frontend edits are part of this proposal.
