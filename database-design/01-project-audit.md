# HeartCare Clinic Management System — Repository Audit

## Scope and method

This audit covers the repository's 40 HTML pages, 69 JavaScript files, 21 CSS files, README, local file references, forms, tables, dropdowns, page scripts, static sample records, CRUD-style handlers, filters, dashboards, and role navigation. The repository also contains 20 image assets and seven files under `doc/`; these are project/documentation assets rather than application data sources.

The project is a frontend-only prototype. Changes made to JavaScript arrays are generally page-local and are lost on navigation or reload. The README describes intended workflow; it does not mean that the pages currently share live records.

## Page and module inventory

| Module | HTML pages | Behavior/data source |
|---|---|---|
| Public and authentication | `index.html`, `404.html`, `login.html`, `register.html`, `choose-dash.html` | Public landing content; login uses `js/login-data.js` and `js/login.js`; registration uses `js/register.js`; dashboard choice is static. |
| Admin | `dashboard.html`, `manage-departments.html`, `manage-doctors.html`, `manage-labtechs.html`, `manage-tests.html`, `manage-appointments.html`, `reports.html`, `audit-log.html` | Each management/report page has its own JavaScript data and behavior. Dashboard charts are custom HTML/CSS bars, not Chart.js. |
| Doctor | `doctor-dashboard.html`, `myProfile.html`, `my_schedule.html`, `my_appointments.html`, `consultation.html`, `prescription.html`, `order_tests.html`, `patient_timeline.html` | Separate dashboard, profile, schedule, appointment, consultation, prescription, order, and timeline arrays/scripts. |
| Patient | `patient-dashboard.html`, `appointments.html`, `book-appointment.html`, `health-tracker.html`, `medical-records.html`, `prescriptions.html`, `lab-results.html`, `invoices.html`, `payment-methods.html`, `patient-profile.html`, `my-appointments.html` | Dashboard, booking, appointment, health, records, invoice/payment, and profile pages. `prescriptions.html`, `lab-results.html`, and `my-appointments.html` are static HTML examples without page scripts. |
| Lab technician | `lab-dashboard.html`, `lab-queue.html`, `add-labresult.html`, `manage-labresult.html`, `test-catalogue.html`, `lab-reports.html`, `profile.html` | Queue, dashboard, result entry/management, catalogue, reports, and profile; they load separate sample arrays. |
| Unused/empty | `includes-dashboard.html`, `js/script.js` | Both are empty. |

### JavaScript file-to-page map

The following lists the application scripts loaded by each interactive page. The corresponding data scripts are loaded before page logic where applicable.

| Page | Loaded JavaScript |
|---|---|
| `login.html` | `login-data.js`, `login.js` |
| `register.html` | `register.js` |
| `dashboard.html` | `data.js`, `admin-dashboard.js` |
| `manage-departments.html` | `admin-manage-dept-data.js`, `common.js`, `departments.js` |
| `manage-doctors.html` | `admin-manage-doctors-data.js`, `common.js`, `admin-validators.js`, `admin-manage-doctors.js` |
| `manage-labtechs.html` | `admin-manage-labtechs-data.js`, `common.js`, `admin-validators.js`, `admin-manage-labtechs.js` |
| `manage-tests.html` | `admin-manage-tests-data.js`, `common.js`, `admin-manage-tests.js` |
| `manage-appointments.html` | `admin-manage-appointments-data.js`, `common.js`, `admin-manage-appointments.js` |
| `reports.html` | `admin-reports-data.js`, `common.js`, `admin-reports.js` |
| `audit-log.html` | `admin-audit-log-data.js`, `common.js`, `admin-audit-log.js` |
| `doctor-dashboard.html` | `doctor-dashboard-data.js`, `common.js`, `doctor-dashboard.js` |
| `myProfile.html` | `doctor-profile-data.js`, `common.js`, `doctor-profile.js` |
| `my_schedule.html` | `doctor-schedule-data.js`, `common.js`, `doctor-schedule.js` |
| `my_appointments.html` | `doctor-appointments-data.js`, `common.js`, `doctor-appointments.js` |
| `consultation.html` | `doctor-consultation-data.js`, `common.js`, `doctor-consultation.js` |
| `prescription.html` | `doctor-prescription-data.js`, `common.js`, `doctor-prescription.js` |
| `order_tests.html` | `doctor-laboratory-tests-data.js`, `common.js`, `doctor-laboratory-tests.js` |
| `patient_timeline.html` | `doctor-patient-timeline-data.js`, `common.js`, `doctor-patient-timeline.js` |
| `patient-dashboard.html` | `patient-account-data.js`, `patient-dashboard-data.js`, `patient-common.js`, `patient-dashboard.js` |
| `appointments.html` | `patient-account-data.js`, `patient-appointments-data.js`, `patient-common.js`, `patient-appointments.js` |
| `book-appointment.html` | `patient-account-data.js`, `patient-book-appointment-data.js`, `patient-common.js`, `patient-book-appointment.js` |
| `health-tracker.html` | `patient-health-tracker.js` (measurement data is embedded in the behavior script) |
| `medical-records.html` | `patient-account-data.js`, `patient-health-tracker-data.js`, `patient-medical-records-data.js`, `patient-common.js`, `patient-medical-records.js` |
| `patient-profile.html` | `patient-account-data.js`, `common.js`, `patient-profile.js` |
| `invoices.html` | `patient-invoice-data.js`, `patient-invoice.js` |
| `payment-methods.html` | `patient-account-data.js`, `payment-methods-data.js`, `common.js`, `payment-methods.js` |
| `lab-dashboard.html` | `lab-dashboard-data.js`, `common.js`, `lab-dashboard-func.js` |
| `lab-queue.html` | `lab-queue-data.js`, `common.js`, `lab-queue-func.js` |
| `add-labresult.html` | `add-labresult-data.js`, `common.js`, `add-labresult.js` |
| `manage-labresult.html` | `manage-labresults-data.js`, `common.js`, `manage-labresults.js` |
| `test-catalogue.html` | `labtest-catalogue-data.js`, `common.js`, `labtest-catalogue.js` |
| `lab-reports.html` | `lab-labreports-data.js`, `common.js`, `lab-labreports.js` |
| `profile.html` | `lab-profile-data.js`, `common.js`, `lab-profile.js` |

Other JavaScript data files are loaded by those pages, not shared through a database. There is no Chart.js use in the repository; the admin dashboard draws bar-like elements from hard-coded arrays.

## Forms, tables, filters, and actions

- **Authentication:** registration fields `full_name`, `email`, `phone`, `date_of_birth`, `gender`, `password`, `confirm_password`, `terms`; login `email`, `password`, `remember_me`; reset `reset_email`.
- **Admin forms:** department `dept_name`, `dept_desc`, `dept_status`; doctor `doc_name`, `doc_email`, `doc_phone`, `doc_dept`, `doc_fee`, `doc_license`, `doc_pass`, `doc_status`; technician `lt_name`, `lt_email`, `lt_phone`, `lt_pass`, `lt_status`; tests `test_name`, `test_unit`, `test_min`, `test_max`, `test_price`, `test_status`; appointment `ap_id`, `ap_patient`, `ap_doctor`, `ap_dept`, `ap_date`, `ap_time`, `ap_status`; audit date/user/action filters; monthly report month/year filters.
- **Doctor forms/actions:** profile fields include `fullName`, `gender`, `dateOfBirth`, `bloodGroup`, `email`, `phone`, `address`, `doctorId`, `specialization`, `qualification`, `experience`, `department`, `hospital`, `biography`. Appointment queue filters/search and Pending→Confirmed→Completed actions. Consultation dynamically creates `symptoms`, `diagnosis`, `treatment`, `notes`; sample vitals are displayed but not entered by this form. Prescription fields include date/follow-up, patient data, diagnosis, three sets of medicine/dosage/frequency/duration/instruction, advice and follow-up instructions. Lab order fields include `patient_id`, `patient_name`, `appointment_id`, `order_date`, `tests[]`, `priority`, `collection_date`, `instructions`. Timeline CRUD fields are `record_type`, `record_title`, `record_date`, `record_status`, `record_details`.
- **Patient forms/actions:** booking uses `dept`, `doctor`, `date`, hidden `start_time`; reschedule uses `rs_date`, `rs_time`; health tracker uses `m_date`, `m_sys`, `m_dia`, `m_glu`, `m_ctx`, `m_wt`, `m_note`; profile uses `p_name`, `p_dob`, `p_email`, `p_phone`, `p_gender`, `p_addr`, `p_ec`, `p_ecp`; payment reference uses `c_nick`, `c_brand`, `c_last4`. Invoice payment controls are generated dynamically.
- **Lab forms/actions:** result entry uses `patient-id`, `patient-name`, `patient-age`, `patient-gender`, `order-id`, `doctor-name`, `sample-date`, `sample-type`, `test-name`, `result-value`, `unit`, `reference-range`, `result-status`, `technician-remarks`. Search/status/priority filters exist on queue and result pages; report search takes patient ID/name.

Read-only tables show appointment, prescription, result/report, invoice/payment-history, dashboard, and audit columns. CRUD-like actions include admin department/doctor/technician/test management; admin appointment correction/cancellation; doctor appointment status transitions, consultation save, prescription CRUD, lab-order CRUD/status changes, timeline CRUD; patient appointment reschedule/cancel, health-log CRUD, profile update/deactivation, payment-method add/remove/primary, simulated invoice payment; lab result creation and result deletion/download.

## Broken and stale local references

The audit found missing references to `assets/css/patient-pages.css`, `assets/css/appointments.css`, `css/auth-additions.css`, `css/patient-additions.css`, `/assets/images/heartcare-logo.png`, `doctor/heart_rate_calculator.html`, `doctor/print_prescription.php`, and `doctor/doctor-dashboard.html`. `invoices.html` also links to nonexistent `patient-invoice.html`. These are frontend issues, not reasons to add database entities.
