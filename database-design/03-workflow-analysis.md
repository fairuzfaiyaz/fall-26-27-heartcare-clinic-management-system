# Cross-Module Workflow Analysis

The following distinguishes visible frontend behavior from the proposed integrated database workflow.

| Step | Role/page | Actual frontend representation | Proposed storage and relationships | Gap |
|---|---|---|---|---|
| 1. Register | Patient — `register.html` | Validates name/email/phone/DOB/gender/password/confirmation/terms; posts to static page. | `users` + `patient_profiles` in one transaction. | No account creation, hashing, uniqueness enforcement, or session. |
| 2. Book | Patient — `book-appointment.html` | Select department, doctor, date and available 30-minute start slot; availability from local `booked` list. | `appointments(patient_user_id, doctor_user_id, appointment_date, start_time, end_time, status)`. | No patient ID or appointment ID stored; no shared source; no concurrent protection. |
| 3. Manage | Admin — `manage-appointments.html` | Search/filter by patient/date/doctor/department/status; correct, cancel, view. | SELECT/UPDATE `appointments`; derive department via doctor profile. | Different hard-coded records; date/status inconsistencies. |
| 4. Review/confirm | Doctor — `my_appointments.html` | Search/filter; Pending→Confirmed→Completed in a separate array. | UPDATE shared appointment status, scoped to logged-in doctor. | No shared appointment identifiers or authorization. |
| 5. Consultation | Doctor — `consultation.html` | Edit symptoms, diagnosis, treatment and notes; selected patient status becomes Completed. | `consultations` unique per appointment; optional one-to-many `consultation_vitals`. | No appointment FK; vitals are seeded display values, not captured by form. |
| 6. Screening | Doctor dashboard calculator link | Route is missing; no calculator code/fields/results found. | No table in the current proposal. Add only after approved screening specification. | Not implemented; do not infer a risk model. |
| 7. Order tests | Doctor — `order_tests.html` | Multi-select tests, priority Normal/Urgent/Emergency, appointment ID, collection date, instructions. | `lab_orders` + `lab_order_items` with doctor/patient/appointment/test FKs and price snapshot. | Local-only order; catalogue differs from admin catalogue. |
| 8. Receive order | Lab — `lab-queue.html`, `lab-dashboard.html` | Displays separate demo queues and counts. | SELECT lab orders and items; join patient, doctor, status. | Doctor-created orders never appear in lab queue. |
| 9. Process order | Lab pages | Queue supports search/status/priority display; technician screens do not consistently own status changes. Doctor order page can update order status. | Lab technician updates `lab_orders.status` under role authorization. | Responsibility/status transitions are not consistently assigned. |
| 10. Enter result | Lab — `add-labresult.html` | Manual patient/order/test fields; one numeric result per form; status options conflate result flag and verification. | `lab_results` linked to an order item plus `lab_result_values`; technician FK. | Typed names/IDs are not validated against the order; result is not shared. |
| 11. Review result | Doctor/patient — timeline, medical records, lab report pages | Seeded reports and static patient pages; no live doctor review workflow. | SELECT authorized results by patient/appointment; record verifier/authorization on `lab_results`. | No route from new lab result to doctor or patient record. |
| 12. Prescribe | Doctor — `prescription.html` | Create/edit/delete/print; up to three medicine rows; diagnosis/advice/follow-up. | `prescriptions` + `prescription_items`, patient/doctor and optional consultation FKs. | No consultation association; patient prescription page is static. |
| 13. Invoice | Patient — `invoices.html`; Admin reports | Invoices and line items are separate demo records; no creation from consultation/order. | `invoices` + `invoice_items`; link patient and optionally appointment. | Amounts/statuses conflict with dashboard; no source billing event. |
| 14. View invoice | Patient — dashboard/invoices | Displays balance, list, items, paid method/reference. | Patient-scoped invoice/item query; calculate line totals and payment balance. | Dashboard and invoice data differ. |
| 15. Simulated payment | Patient — `invoices.html` | Delayed JS update sets paid status/date/reference/method. | `payments` attempt row plus transactionally updated invoice state; no card data. | No persistent payment attempt/history; no idempotency. |
| 16. Dashboard/report | All roles | Role-specific arrays, cards, charts, static summaries. | Query aggregate counts/totals from shared tables and role scope. | Metrics are not reconciled to source records. |

## Status vocabulary proposal

- Account status: `Active`, `Inactive`.
- Appointment: `Pending`, `Confirmed`, `Completed`, `Cancelled`. “Waiting” in doctor dashboard should map to `Pending`; do not store a fifth status without a requirement.
- Lab order: `Pending`, `Processing`, `Completed`, optionally `Cancelled` if order cancellation is approved.
- Lab result processing: `Pending`, `Under Review`, `Completed`.
- Result authorization: separate `Pending`, `Authorized` (and optionally `Rejected`, if required).
- Result classification: separate `LOW`, `NORMAL`, `HIGH`, `CRITICAL`, `ABNORMAL`, or `UNCLASSIFIED`. Only calculated when numeric values and applicable reference limits exist.
- Invoice state: `Issued`, `Paid`, `Cancelled`; overdue is derived from due date and outstanding balance.
- Payment attempt: `Pending`, `Succeeded`, `Failed`, `Refunded`.

## Transactions and access boundaries

Use database transactions for user/profile creation, appointment creation/rescheduling/cancellation, consultation/vitals, prescription/items, lab order/items, result/value entry, invoice/items, payment attempts, and changing a primary payment method. Appointments require an overlap query under a doctor-row lock (or a compatible active-slot uniqueness design). A completed/cancelled appointment must retain history but no longer reserve a future slot.

Every page action must re-check the session role on the server. Patient reads/writes must constrain by the session patient ID; doctors must be scoped to their own appointments/consultations; lab technicians must be scoped to lab duties; admin actions must require admin role. Never trust a submitted patient/doctor/order ID merely because it appears in the frontend.
