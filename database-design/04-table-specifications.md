# Proposed Table Specifications

All tables use InnoDB and `utf8mb4`. Primary keys are unsigned auto-increment integers unless noted. Timestamps default to `CURRENT_TIMESTAMP`; mutable records use `updated_at ... ON UPDATE CURRENT_TIMESTAMP`. The executable draft is `heartcare_db.sql`.

## `users`

| Column | Type | Constraints | Description |
|---|---|---|---|
| user_id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Internal account identifier |
| full_name | VARCHAR(120) | NOT NULL | Shared display name |
| email | VARCHAR(190) | NOT NULL, UNIQUE | Login identifier |
| phone | VARCHAR(30) | NULL | Contact phone |
| password_hash | VARCHAR(255) | NOT NULL | Password hash only |
| role | ENUM('admin','doctor','patient','labtech') | NOT NULL | One role per account |
| account_status | ENUM('Active','Inactive') | NOT NULL DEFAULT 'Active' | Login/CRUD account state |
| created_at, updated_at, last_login_at | TIMESTAMP | created/updated default; last login nullable | Account lifecycle |

Relationships: one-to-zero/one patient, doctor, or lab technician profile. Pages: login, registration, admin staff management, all role pages. Writes require server-side authorization and password hashing.

## `patient_profiles`

| Column | Type | Constraints | Description |
|---|---|---|---|
| user_id | BIGINT UNSIGNED | PK, FK → users | One-to-one patient account |
| patient_number | VARCHAR(24) | NOT NULL, UNIQUE | Public patient ID such as `HC-P-00125` |
| date_of_birth | DATE | NULL | Registration/profile DOB |
| gender | ENUM('male','female','other','prefer_not_to_say') | NULL | Patient profile gender |
| blood_group | VARCHAR(3) | NULL | ABO/Rh group |
| address | VARCHAR(500) | NULL | Profile address |
| emergency_contact_name | VARCHAR(120) | NULL | Emergency contact |
| emergency_contact_phone | VARCHAR(30) | NULL | Emergency phone |

Pages: register, patient profile/dashboard, patient appointments, records, billing, lab reports. Patient-owned pages select by session user ID.

## `departments`

`department_id INT UNSIGNED PK AUTO_INCREMENT`; `department_name VARCHAR(100) NOT NULL UNIQUE`; `description VARCHAR(500) NULL`; `status ENUM('Active','Inactive') NOT NULL DEFAULT 'Active'`; created/updated timestamps. Admin CRUD; doctor profiles reference this table. Doctor counts are derived, not stored.

## `doctor_profiles`

| Column | Type | Constraints | Description |
|---|---|---|---|
| user_id | BIGINT UNSIGNED | PK, FK → users | Doctor account |
| doctor_number | VARCHAR(24) | NOT NULL, UNIQUE | Public doctor ID |
| department_id | INT UNSIGNED | NOT NULL, FK → departments | Department |
| license_number | VARCHAR(60) | NOT NULL, UNIQUE | Professional license |
| specialization | VARCHAR(120) | NULL | Profile specialization |
| qualification | VARCHAR(255) | NULL | Qualifications |
| experience_years | SMALLINT UNSIGNED | NULL | Display as years |
| consultation_fee | DECIMAL(10,2) | NOT NULL DEFAULT 0 | Admin fee/profile data |
| gender, date_of_birth, blood_group, address | matching profile types | NULL | Fields shown on doctor profile |
| hospital_name | VARCHAR(150) | NULL | Profile hospital/clinic |
| biography | TEXT | NULL | Doctor profile biography |

Pages: admin doctor CRUD, doctor profile/dashboard/schedule/appointments, patient booking. Profile values must be reconciled before seed data.

## `lab_technician_profiles`

`user_id BIGINT UNSIGNED PK/FK → users`; `employee_number VARCHAR(24) NOT NULL UNIQUE`; nullable `gender`, `date_of_birth`, `address`, `designation`, `department_name`; timestamps. Admin technician CRUD and lab profile. `department_name` remains text because the existing profile is not selected from the clinic department catalogue.

## `doctor_schedules`

`schedule_id BIGINT UNSIGNED PK`; `doctor_user_id BIGINT UNSIGNED NOT NULL FK → doctor_profiles.user_id`; `weekday TINYINT UNSIGNED NOT NULL`; nullable `start_time`, `end_time`, `break_start`, `break_end`; `is_available BOOLEAN NOT NULL DEFAULT TRUE`; timestamps; UNIQUE `(doctor_user_id, weekday)`; indexes by weekday/availability. A day off is a row with availability false and null times. Validate time order and breaks in PHP.

## `appointments`

| Column | Type | Constraints | Description |
|---|---|---|---|
| appointment_id | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Internal appointment key |
| appointment_number | VARCHAR(24) | NOT NULL, UNIQUE | Public appointment ID |
| patient_user_id | BIGINT UNSIGNED | NOT NULL, FK → patient_profiles | Booked patient |
| doctor_user_id | BIGINT UNSIGNED | NOT NULL, FK → doctor_profiles | Assigned doctor |
| appointment_date | DATE | NOT NULL | Visit date |
| start_time, end_time | TIME | NOT NULL | Appointment interval |
| reason | VARCHAR(255) | NULL | Doctor-side reason; booking form has none |
| status | ENUM('Pending','Confirmed','Completed','Cancelled') | NOT NULL DEFAULT 'Pending' | Workflow state |
| cancelled_at | DATETIME | NULL | Cancellation time |
| cancelled_by_user_id | BIGINT UNSIGNED | NULL, FK → users | Cancelling actor |
| created_at, updated_at | TIMESTAMP | defaults/on update | Audit timestamps |

Indexes: patient/date, doctor/date/status, date/status. A stored generated active-slot key plus UNIQUE `(doctor_user_id, active_slot_key)` blocks duplicate active same-start bookings; overlap checks and locking are also required. Admin and patient pages update/cancel; doctor confirms/completes.

## `consultations`

`consultation_id BIGINT UNSIGNED PK`; `appointment_id BIGINT UNSIGNED NOT NULL UNIQUE FK → appointments`; `symptoms TEXT NULL`; `diagnosis TEXT NULL`; `treatment_plan TEXT NULL`; `notes TEXT NULL`; `follow_up_date DATE NULL`; created/updated timestamps. One consultation per appointment. Doctor inserts/updates; patient medical records read via appointment→patient.

## `consultation_vitals`

`vital_id BIGINT UNSIGNED PK`; `consultation_id BIGINT UNSIGNED NOT NULL FK → consultations`; `measured_at DATETIME NOT NULL`; nullable `heart_rate_bpm SMALLINT UNSIGNED`, `systolic_mmhg SMALLINT UNSIGNED`, `diastolic_mmhg SMALLINT UNSIGNED`, `temperature DECIMAL(5,2)`, `temperature_unit ENUM('C','F')`, `oxygen_saturation_pct DECIMAL(5,2)`, `weight_kg DECIMAL(6,2)`; index `(consultation_id, measured_at)`. Supports values shown by consultation/timeline.

## `prescriptions` and `prescription_items`

`prescriptions`: `prescription_id BIGINT UNSIGNED PK`; `prescription_number VARCHAR(30) UNIQUE NOT NULL`; patient and doctor user FKs; nullable `consultation_id` FK; `prescription_date DATE NOT NULL`; nullable follow-up date; diagnosis/advice/follow-up instructions TEXT; timestamps. Index patient/date and doctor/date.

`prescription_items`: `prescription_item_id BIGINT UNSIGNED PK`; `prescription_id` FK; `sort_order TINYINT UNSIGNED`; `medicine_name VARCHAR(150) NOT NULL`; `dosage VARCHAR(100) NOT NULL`; `frequency VARCHAR(120) NOT NULL`; `duration VARCHAR(80) NOT NULL`; `instructions VARCHAR(255) NOT NULL`; UNIQUE `(prescription_id, sort_order)`. One prescription has one or more items. Doctor creates/edits; patient reads/prints.

## `lab_test_types` and `lab_test_parameters`

`lab_test_types`: `test_type_id INT UNSIGNED PK`; `test_code VARCHAR(20) UNIQUE NOT NULL`; `test_name VARCHAR(150) UNIQUE NOT NULL`; nullable category/specimen; `price DECIMAL(10,2) NOT NULL`; status Active/Inactive; timestamps.

`lab_test_parameters`: `parameter_id INT UNSIGNED PK`; `test_type_id` FK; `parameter_name VARCHAR(120) NOT NULL`; nullable unit, reference_low/reference_high DECIMAL(12,4), and `reference_text VARCHAR(255)`; UNIQUE `(test_type_id, parameter_name)`. Supports single-value tests and multi-parameter panels. Admin manages catalogue; doctors select active tests; lab/report pages read catalogue.

## `lab_orders` and `lab_order_items`

`lab_orders`: `lab_order_id BIGINT UNSIGNED PK`; unique `order_number VARCHAR(30)`; patient, ordering doctor, appointment FKs; `order_date DATE NOT NULL`; priority ENUM Normal/Urgent/Emergency; status ENUM Pending/Processing/Completed/Cancelled; nullable collection date and instructions; timestamps. Index patient/date and status/priority/date.

`lab_order_items`: `lab_order_item_id BIGINT UNSIGNED PK`; order FK; test type FK; `price_at_order DECIMAL(10,2) NOT NULL`; UNIQUE `(lab_order_id, test_type_id)`. One order supports multiple tests. Doctor creates header/items in a transaction; lab queue reads and updates state.

## `lab_results` and `lab_result_values`

`lab_results`: `lab_result_id BIGINT UNSIGNED PK`; `lab_order_item_id` FK UNIQUE; sample date/type; processing status ENUM Pending/Under Review/Completed; authorization status ENUM Pending/Authorized; technician user FK; nullable verifying doctor user FK, `authorized_at`, remarks, `reported_at`, timestamps. Each ordered test has at most one result report.

`lab_result_values`: `result_value_id BIGINT UNSIGNED PK`; result FK; nullable parameter FK; `parameter_name_snapshot VARCHAR(120) NOT NULL`; nullable `numeric_value DECIMAL(14,4)` and `text_value VARCHAR(255)`; unit/reference snapshots; classification ENUM LOW/NORMAL/HIGH/ABNORMAL/CRITICAL/UNCLASSIFIED; index by result. Multiple values support CBC-style panels and preserve the historical range. Lab technician writes; authorized doctor/patient reads through ownership joins.

## `health_logs`

`health_log_id BIGINT UNSIGNED PK`; patient user FK; `measurement_type ENUM('Blood pressure','Blood glucose','Weight')`; `measured_at DATETIME NOT NULL`; nullable systolic/diastolic and numeric value; nullable unit/context/note; timestamps; index `(patient_user_id, measured_at)`. PHP validates that the correct values exist for each type. Patient CRUD; dashboard/records read.

## `patient_timeline_entries`

`timeline_entry_id BIGINT UNSIGNED PK`; patient user FK; doctor user FK; `record_type ENUM('Consultation','Prescription','Laboratory')`; title/date/status/details; timestamps; index `(patient_user_id, record_date)`. Retains the current manually editable timeline feature. Actual consultation/prescription/lab events should be derived from their source tables, not copied here.

## `invoices`, `invoice_items`, `payment_methods`, `payments`

`invoices`: `invoice_id BIGINT UNSIGNED PK`; unique invoice number; patient user FK; nullable appointment FK; issue/due dates; status ENUM Issued/Paid/Cancelled; timestamps; index patient/status/due date. Overdue and totals are derived.

`invoice_items`: `invoice_item_id BIGINT UNSIGNED PK`; invoice FK; description; `quantity DECIMAL(10,2) NOT NULL DEFAULT 1`; `unit_price DECIMAL(10,2) NOT NULL`; index invoice. Invoice total is `SUM(quantity * unit_price)`.

`payment_methods`: `payment_method_id BIGINT UNSIGNED PK`; patient user FK; nickname; brand ENUM Visa/Mastercard/Other; `last4 CHAR(4)`; `is_primary BOOLEAN`; timestamps; index patient. Store no PAN, CVV, expiry, or sensitive real card information.

`payments`: `payment_id BIGINT UNSIGNED PK`; invoice FK; nullable payment-method FK; unique transaction reference; amount; attempt status ENUM Pending/Succeeded/Failed/Refunded; method label snapshot; created/paid timestamps; index invoice/status. Multiple attempts are allowed; successful payment and invoice state update in a transaction.

## `audit_logs`

`audit_log_id BIGINT UNSIGNED PK`; nullable `actor_user_id` FK → users; `action VARCHAR(100) NOT NULL`; `entity_type VARCHAR(60) NOT NULL`; nullable `entity_identifier VARCHAR(60)` (polymorphic target, intentionally not an FK); nullable details TEXT; `created_at TIMESTAMP`; indexes `(created_at)`, `(actor_user_id, created_at)`, `(action, created_at)`. Admin reads/filter only; application writes audit events.

## Referential actions

Use `ON UPDATE CASCADE` for surrogate references only where needed; public identifiers should be stable. Prefer `ON DELETE RESTRICT` for clinical, appointment, invoice, and audit history. Use `SET NULL` for optional audit actor, verifier, or payment-method reference so retained history survives account/reference removal. Deactivate historical master records rather than deleting them.
