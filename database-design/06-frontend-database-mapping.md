# Frontend-to-Database Mapping

Frontend names below are taken from the existing forms/data. They are not recommendations to rename HTML inputs. Internal FK IDs are resolved server-side from the authenticated session and selected records.

| Module/page | Actual frontend field/data | Table.column | Operation |
|---|---|---|---|
| Register | `full_name` | `users.full_name` | INSERT |
| Register | `email` | `users.email` | INSERT/UNIQUE check |
| Register | `phone` | `users.phone` | INSERT |
| Register | `password` | `users.password_hash` | Hash then INSERT |
| Register | `confirm_password`, `terms` | No persistent column | Validate only |
| Register | `date_of_birth`, `gender` | `patient_profiles.date_of_birth`, `gender` | INSERT |
| Login | `email`, `password` | `users.email`, `password_hash` | SELECT/verify |
| Login | demo `role`, `status` | `users.role`, `account_status` | SELECT/auth decision |
| Admin departments | `dept_name`, `dept_desc`, `dept_status` | `departments.department_name`, `description`, `status` | SELECT/INSERT/UPDATE/deactivate |
| Admin doctors | `doc_name`, `doc_email`, `doc_phone`, `doc_pass`, `doc_status` | `users.full_name`, `email`, `phone`, `password_hash`, `account_status` | INSERT/UPDATE |
| Admin doctors | `doc_dept`, `doc_license`, `doc_fee` | `doctor_profiles.department_id`, `license_number`, `consultation_fee` | INSERT/UPDATE |
| Admin technicians | `lt_name`, `lt_email`, `lt_phone`, `lt_pass`, `lt_status` | `users.full_name`, `email`, `phone`, `password_hash`, `account_status` | INSERT/UPDATE |
| Admin technicians | profile `employeeid`, `designation`, `department` | `lab_technician_profiles.employee_number`, `designation`, `department_name` | SELECT/UPDATE |
| Admin tests | `test_name`, `test_unit`, `test_min`, `test_max`, `test_price`, `test_status` | `lab_test_types.test_name/price/status`; `lab_test_parameters.unit/reference_low/reference_high` | SELECT/INSERT/UPDATE/deactivate |
| Test catalogue | `code`, `name`, `category`, `specimen`, `referenceRange`, `unit`, `cost`, `status` | `lab_test_types.test_code/test_name/category/specimen/price/status`; parameter range/unit columns | SELECT |
| Admin appointments | `ap_id`, `ap_patient`, `ap_doctor`, `ap_date`, `ap_time`, `ap_status` | `appointments.appointment_number`, patient/doctor FKs, date/start, status | SELECT/UPDATE/cancel |
| Admin appointment derived | `ap_dept` | `doctor_profiles.department_id` → `departments.department_name` | SELECT; do not duplicate |
| Admin audit | `log_user`, `log_action`, `log_from`, `log_to`; row `record` | `audit_logs.actor_user_id`, `action`, `created_at`, `entity_type`, `entity_identifier` | Filter SELECT |
| Admin dashboard/reports | `stats`, chart arrays, `monthlyReports` | Aggregates from users, appointments, invoices, lab orders/results | SELECT only; do not seed as tables |
| Doctor profile | `fullName`, `email`, `phone` | `users.full_name/email/phone` | SELECT/UPDATE |
| Doctor profile | `doctorId`, `specialization`, `qualification`, `experience`, `department`, `hospital`, `biography`, `gender`, `dateOfBirth`, `bloodGroup`, `address` | `doctor_profiles` and `departments` | SELECT/UPDATE |
| Doctor schedule | `day`, `startTime`, `endTime`, `breakTime`, `status` | `doctor_schedules.weekday/start_time/end_time/break_start/break_end/is_available` | SELECT |
| Doctor appointments | `patientName`, `patientId`, `date`, `time`, `reason`, `status` | appointment joins; `appointment_date`, `start_time`, status | SELECT/UPDATE |
| Consultation | `patientId`, `patientName`, `appointmentDate` | Appointment/patient joins | SELECT |
| Consultation | `symptoms`, `diagnosis`, `treatment`, `notes` | `consultations.symptoms/diagnosis/treatment_plan/notes` | INSERT/UPDATE |
| Consultation/timeline vitals | `heartRate`, `bloodPressure`, `temperature`, `oxygenLevel`, `weight` | `consultation_vitals` columns | SELECT; form currently does not capture them |
| Prescription | `prescriptionId`, `prescriptionDate`, `followupDate`, `diagnosis`, `advice`, `followupInstructions` | `prescriptions.prescription_number`, dates, text columns | SELECT/INSERT/UPDATE |
| Prescription medicine rows | `medicineN`, `dosageN`, `frequencyN`, `durationN`, `instructionN` | `prescription_items.medicine_name/dosage/frequency/duration/instructions` | INSERT/UPDATE/DELETE as transaction |
| Doctor lab order | `order_id`, `patient_id`, `patient_name`, `appointment_id`, `order_date`, `priority`, `collection_date`, `instructions`, `tests[]` | `lab_orders` and `lab_order_items` | SELECT/INSERT/UPDATE; derive name |
| Lab result | `patient-id`, `patient-name`, `order-id`, `doctor-name` | Resolve to patient/order/doctor FKs; do not insert display strings as references | SELECT/validate |
| Lab result | `sample-date`, `sample-type`, `result-value`, `unit`, `reference-range`, `result-status`, `technician-remarks` | `lab_results` and `lab_result_values` snapshots | INSERT/UPDATE |
| Lab results/report | `resultId`, `reportId`, `submittedDate`, `reportDate`, `authorization`, `parameters[]` | `lab_results`/`lab_result_values` and timestamps | SELECT; verification UPDATE |
| Patient account/profile | `patient.id`, `fullName`, `email`, `phone`, `dob`, `gender`, `address`, `emergencyName`, `emergencyPhone` | `patient_profiles.patient_number`, common `users`, profile columns | SELECT/UPDATE |
| Patient booking | `dept`, `doctor`, `date`, `start_time` | department/doctor/schedule SELECT; `appointments` INSERT | SELECT/INSERT |
| Patient appointment | `myAppointments.id`, `date`, `start`, `end`, `doctor`, `department`, `status` | `appointments` and doctor/department joins | SELECT/UPDATE/cancel |
| Health tracker | `m_date`, `m_sys`, `m_dia`, `m_glu`, `m_ctx`, `m_wt`, `m_note` | `health_logs.measured_at`, BP/value/context/note | SELECT/INSERT/UPDATE/DELETE |
| Patient medical records | `medicalRecords` consultation/prescription/lab shapes | Joins over consultations, prescriptions, lab results; health trends from `health_logs` | SELECT |
| Patient invoices | `id`, `issued`, `due`, `status`, `items[].name`, `items[].amount` | `invoices` and `invoice_items` | SELECT |
| Patient payment | `paidOn`, `ref`, `method`, selected payment method | `payments.paid_at/transaction_reference/payment_method_id/method_label_snapshot` | INSERT attempt/UPDATE invoice in transaction |
| Payment methods | `id`, `nickname`, `brand`, `last4`, `isPrimary` | `payment_methods.payment_method_id/nickname/brand/last4/is_primary` | SELECT/INSERT/UPDATE/remove |
| Timeline CRUD | `id`, `patientId`, `type`, `title`, `date`, `doctor`, `status`, `details` | `patient_timeline_entries` | SELECT/INSERT/UPDATE/DELETE |
| Patient static prescription/report pages | Hard-coded HTML table/record content | `prescriptions`, `prescription_items`, `lab_results`, `lab_result_values` | Replace static markup with SELECT |

## Dropdown/filter vocabularies to reconcile

Existing options include appointment states Pending/Confirmed/Completed/Cancelled; lab queue states Pending/Processing/Completed; priorities Normal/Urgent/Emergency in doctor orders but High/Normal in technician queue; result statuses Normal/Abnormal/Critical/Pending Verification; report authorization Authorized/Pending; account/catalogue Active/Inactive; user genders with values of different casing and `prefer_not_to_say`; payment brands Visa/Mastercard/Other; timeline types Consultation/Prescription/Laboratory. The database design separates workflow state from result classification and authorization.
