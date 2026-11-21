# HeartCare Clinic Management System

> A frontend, role-based clinic management prototype built with HTML5, CSS3, and JavaScript for CSC 3215 — Web Technologies.

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Target Users](#target-users)
- [Technology Stack](#technology-stack)
- [How to Run](#how-to-run)
- [Demo Accounts](#demo-accounts)
- [Main Prototype Areas](#main-prototype-areas)
- [Role Features](#role-features)
- [Feature Matrix](#feature-matrix)
- [Main Connected Workflow](#main-connected-workflow)
- [Data Handling](#data-handling)
- [Validation and DOM Manipulation](#validation-and-dom-manipulation)
- [Search, Filter, Sort, and Pagination](#search-filter-sort-and-pagination)
- [Print and Report Features](#print-and-report-features)
- [Project Structure](#project-structure)
- [Key HTML, CSS, and JavaScript Files](#key-html-css-and-javascript-files)
- [Testing Guide](#testing-guide)
- [Prototype Limitations](#prototype-limitations)
- [Planned Backend Integration](#planned-backend-integration)
- [Medical and Privacy Disclaimer](#medical-and-privacy-disclaimer)
- [Course Outcome](#course-outcome)

---

## Project Overview

HeartCare Clinic Management System is a multi-page web application prototype for a heart-care clinic. The system is designed to organize the clinic journey from patient registration and appointment booking to consultation, prescription, laboratory testing, reporting, billing, and administration.

The prototype provides four role-specific areas:

| Role | Main responsibility |
|---|---|
| Administrator | Clinic setup, staff management, appointments, reports, dashboards, and audit history |
| Doctor | Schedules, appointments, consultations, prescriptions, laboratory orders, and patient timelines |
| Patient | Appointment booking, personal health tracking, medical records, prescriptions, invoices, and payment references |
| Laboratory Technician | Laboratory queue, test results, result management, test catalogue, reports, and technician profile |

All roles share a consistent visual structure and a linked demonstration workflow. However, this is a frontend prototype. It does not contain a server, database, PHP session system, or real authentication backend.

The project demonstrates the use of semantic HTML, external CSS, responsive layouts, JavaScript arrays of objects, forms, DOM manipulation, validation, search, filters, dynamic tables, status changes, charts, modal forms, and print layouts.

---

## Problem Statement

A clinic can manage many related activities, including appointments, doctors, laboratory tests, prescriptions, patient records, payments, and staff accounts. Handling these activities on paper or through disconnected tools can cause scheduling mistakes, duplicated information, slow record retrieval, and poor coordination.

This project provides a prototype solution that connects the following operations:

1. A patient registers for an account.
2. The patient selects a department and doctor.
3. The patient chooses an available appointment date and time.
4. The doctor views and manages the appointment.
5. The doctor records the consultation.
6. The doctor creates a prescription and/or orders laboratory tests.
7. The laboratory technician receives the test order and records a result.
8. The patient can view related records and reports.
9. The invoice and payment process is demonstrated.
10. The administrator monitors clinic performance and system activity.

The prototype creates a user-friendly front end for this complete clinic workflow.

---

## Target Users

### Patients

Patients need a simple way to book appointments, reschedule or cancel them, record personal measurements, view their medical history, read prescriptions, review invoices, and manage simulated payment references.

### Doctors

Doctors need to view their schedules and patient queue, manage appointment statuses, record consultations, issue prescriptions, order laboratory tests, and review a patient's medical timeline.

### Laboratory Technicians

Laboratory technicians need an organized test queue, result-entry tools, reference-range checks, result management, report views, and test-catalogue information.

### Clinic Administrators

Administrators need to configure departments and staff, control accounts and test definitions, monitor clinic-wide appointments, generate monthly reports, view audit history, and review dashboard statistics.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure, semantic layout, tables, forms, navigation, and dialog elements |
| CSS3 | Responsive layouts, cards, tables, dashboards, sidebars, status badges, print styles, hover/focus effects, and transitions |
| JavaScript | Validation, DOM updates, arrays, objects, loops, filtering, sorting, search, CRUD-style operations, dynamic forms, charts, and role redirection |
| Browser `Date` object | Current-date display and date calculations |
| Browser `localStorage` | Remembering the login email only |
| Browser print window | Printing or saving prescriptions, invoices, laboratory reports, timelines, and monthly reports |

No package manager, framework, external chart library, database, or build tool is required.

---

## How to Run

1. Download or clone the repository.
2. Keep the complete project folder together.
3. Open `index.html` in Google Chrome or Firefox.

The project can also be opened using the Live Server extension in Visual Studio Code.

```text
index.html
```

Sign-in, registration, and dashboard pages can be opened through the public navigation. The direct route to the demonstration dashboard selector is:

```text
choose-dash.html
```

The login page may also redirect automatically to a role dashboard after a valid demonstration account is selected.

---

## Demo Accounts

The login system uses sample accounts stored in `js/login-data.js`.

| Role | Email | Password |
|---|---|---|
| Administrator | `admin@heartcare.com` | `Admin123!` |
| Doctor | `doctor@heartcare.com` | `Doctor123!` |
| Patient | `patient@heartcare.com` | `Patient123!` |
| Laboratory Technician | `labtech@heartcare.com` | `Labtech123!` |
| Inactive Doctor | `islam@heartcare.com` | `Islam123!` |

The inactive account demonstrates account-status checking. It cannot sign in.

The login page also provides demo-account buttons that fill the email and password fields. The system allows five failed attempts before temporarily locking the form for 30 seconds.

The login page uses a simple JavaScript `switch` on the account role:

- `admin` → Administrator dashboard
- `doctor` → Doctor dashboard
- `patient` → Patient dashboard
- `labtech` → Laboratory technician dashboard

---

## Main Prototype Areas

### Public Website

The public website is implemented in `index.html`.

It includes:

- Clinic logo and navigation
- Hero section
- About clinic section
- Healthcare service cards
- Doctor information
- Four-step care journey
- Login and registration links
- Contact information
- Footer
- Responsive menu behavior

The public home page explains the clinic's purpose and directs patients to registration or login.

### Authentication

The authentication prototype includes:

- Patient registration
- Login
- Role-based redirection
- Password visibility control
- Caps Lock warning
- Failed-login attempts
- Temporary login lock
- Account status checking
- Remember-me email functionality
- Forgot-password demonstration form
- Sign-out links

Passwords are demonstration values embedded in JavaScript data and are not securely stored.

### Patient Registration

`register.html` contains a patient registration form with:

- Full name
- Email
- Phone number
- Date of birth
- Gender
- Password
- Confirm password
- Terms and privacy checkbox

JavaScript validates the fields and prevents submission until all validation rules pass. The registration button remains disabled until the terms checkbox is selected.

---

## Role Features

## Administrator Features

### Administrator Dashboard

The administrator dashboard shows:

- Registered-patient count
- Active-doctor count
- Today's appointments
- Revenue for the current month
- Appointments per month
- Appointments by department
- Monthly revenue
- Today's appointment table
- Recent activity
- Quick-action links

The dashboard uses JavaScript arrays and dynamically generated HTML bar charts rather than an external chart library.

### Department Management

Administrators can:

- View departments
- Search departments
- Filter by active or inactive status
- Create departments
- Edit departments
- Activate or deactivate departments
- Validate names and descriptions
- Preserve historical data instead of permanently removing a department

### Doctor Management

Administrators can:

- View doctor accounts
- Search by name or information
- Filter by department
- Filter by account status
- Create doctor accounts
- Edit profiles
- Change consultation fees
- Activate or deactivate accounts
- Check duplicate email addresses and phone numbers
- Validate email, phone, password, and fee values

### Laboratory Technician Management

Administrators can:

- View laboratory technicians
- Search and filter technician accounts
- Create technician accounts
- Edit technician details
- Activate or deactivate accounts
- Validate names, email addresses, phone numbers, and temporary passwords

### Test Catalogue Management

Administrators can:

- View laboratory tests
- Search tests
- Filter active and inactive tests
- Create tests
- Edit tests
- Set test units
- Set normal minimum and maximum values
- Set test prices
- Activate or deactivate tests
- Prevent duplicate test names
- Validate numeric ranges and prices

### Clinic Appointment Management

Administrators can:

- View clinic-wide appointments
- Search by patient or patient ID
- Filter by date, doctor, department, and status
- Correct an appointment
- Change a doctor
- Change date or time
- Change appointment status
- Cancel appointments
- Check for doctor-date-time conflicts
- View appointment details

Cancelled appointments remain in the data to preserve historical information.

### Monthly Reports

The monthly report module can:

- Select a month and year
- Generate report totals
- Show completed consultations
- Show new patients
- Show appointment counts
- Show collected revenue
- Show revenue by doctor
- Show the five busiest doctors
- Show frequently ordered laboratory tests
- Show abnormal laboratory-result rates
- Display an empty-report message when data is unavailable
- Print or save the report as PDF using the browser

### Audit Log

The audit log supports:

- User search
- Action filtering
- Date-range filtering
- Reset controls
- Time, user, action, and record display
- Filtering with validated date ranges

---

## Doctor Features

### Doctor Dashboard

The doctor dashboard includes:

- Personal welcome area
- Today's appointment count
- Pending-patient count
- Completed-consultation count
- Prescriptions-issued count
- Today's appointments
- Recent patient queue
- Search for a patient
- Links to consultation, schedule, laboratory, and timeline pages

### Doctor Schedule

The doctor schedule module provides:

- Weekly working-day summary
- Working-hour summary
- Total daily appointments
- Available day-off summary
- Weekly schedule table
- Working hours
- Break time
- Working status
- Today's schedule

### Doctor Appointments

Doctors can:

- View all assigned appointments
- Search by patient name or patient ID
- Filter by appointment status
- View pending, confirmed, and completed appointments
- Confirm appointments
- Cancel appointments
- Complete appointments
- Open a consultation

### Patient Consultation

The consultation area allows the doctor to:

- View a patient consultation list
- View patient ID, name, age, gender, and appointment date
- Select a patient
- Review patient details
- Enter clinical information and consultation data
- Manage consultation status

### Prescription Management

The prescription page contains a print-ready format with:

- Clinic information
- Doctor information
- Prescription ID
- Prescription date
- Follow-up date
- Patient information
- Diagnosis
- Medicine name
- Dosage
- Frequency
- Duration
- Special instructions
- Follow-up advice
- Dynamic medicine rows
- Prescription search and management
- Print support

JavaScript validates patient, date, diagnosis, and medicine information.

### Laboratory Test Ordering

Doctors can:

- Enter patient information
- Link the test order to an appointment
- Select priority
- Select laboratory tests
- Calculate the total test price
- Enter suspected diagnosis
- Enter symptoms
- Add collection information
- Add special instructions
- Create, read, update, search, and manage test orders
- Update order status
- Generate laboratory order IDs

### Patient Timeline

The patient timeline provides:

- Patient search by ID or name
- Patient profile details
- Age, gender, blood group, and contact information
- First-visit date
- Latest vital signs
- Blood pressure
- Pulse
- Temperature
- Weight
- Blood glucose
- Consultation, prescription, laboratory, and health history
- Print-history action

---

## Patient Features

### Patient Dashboard

The patient dashboard displays:

- Personalized greeting
- Upcoming appointments
- Number of health entries
- Outstanding invoice balance
- Last consultation date
- Upcoming-appointment list
- Profile summary
- Links to all patient modules

### Smart Appointment Booking

The patient can:

- Select a department
- Select a doctor
- Select an appointment date
- View available time slots
- View the consultation fee
- Review a booking summary
- Confirm a booking
- Receive feedback if a slot is unavailable

JavaScript updates the doctor list and available slots based on selections.

### Appointment Management

The My Appointments page allows a patient to:

- View all appointments
- Filter by status
- View upcoming appointments
- Reschedule an appointment
- Cancel an appointment
- Select a new date and time
- Prevent changes to past or completed appointments
- Check date and time validity

### Health Tracker

The Health Tracker supports CRUD-style operations for measurements.

Measurement types include:

- Blood pressure
- Blood glucose
- Weight

Features include:

- Latest-reading cards
- Add measurement form
- Edit measurement
- Delete measurement
- Search
- Measurement-type filtering
- Measurement date
- Context and notes
- Informational reference checks
- Validation for future dates and realistic measurement ranges

The reference-range checks are informational and are not medical diagnosis.

### Medical Records

The medical records page provides:

- Consultation count
- Prescription count
- Laboratory-report count
- Latest consultation date
- Record search
- Record-type filter
- Newest/oldest sorting
- Consultation, prescription, and laboratory timeline entries

Patients can view records but cannot edit doctor or laboratory records.

### Prescriptions

Patients can:

- View doctor-issued prescriptions
- Review medicine, dosage, frequency, duration, and instructions
- Review follow-up advice
- Print a prescription

### Billing and Invoices

The billing module includes:

- Outstanding balance
- Total paid
- Invoice count
- Saved payment-method count
- Invoice search
- All, unpaid, and paid tabs
- Itemized invoice details
- Consultation and laboratory charges
- Simulated payment
- Payment-history view
- Print receipt

The payment process does not transfer real money.

### Payment Methods

The patient can:

- Add a demo payment reference
- Enter a nickname
- Select Visa, Mastercard, or Other
- Enter exactly four digits
- Set a primary method
- Remove a method
- Store only a masked reference

The prototype intentionally avoids full card numbers and security codes.

### Patient Profile

The patient profile form includes:

- Full name
- Date of birth
- Email
- Phone
- Gender
- Blood group
- Address
- Emergency contact
- Emergency phone

JavaScript validates and updates the profile and profile initials in the interface.

---

## Laboratory Technician Features

### Laboratory Dashboard

The laboratory dashboard shows:

- Total orders
- Pending orders
- Processing orders
- Completed orders
- Recent laboratory orders
- Order status
- Order priority
- Links to all laboratory tools

### Laboratory Queue

The queue supports:

- Search
- Status filtering
- Priority filtering
- Pagination
- Order ID display
- Patient information
- Test name
- Doctor name
- Order date
- Processing status
- View and add-result actions

### Add or Manage Test Results

Laboratory result entry includes:

- Patient information
- Lab order information
- Doctor name
- Sample date
- Sample type
- Test name
- Test unit
- Numeric result
- Normal minimum and maximum
- Low/Normal/High status
- Result status
- Priority
- Notes and technician comments
- Validation
- Automatic patient/test lookup
- Automatic reference-range marking
- Recent-result display
- Result overview counts

The technician can create and amend eligible result records.

### Test Catalogue

The catalogue page shows test names, categories, units, reference ranges, prices, and status.

Search and filtering help the technician find test definitions. The page also shows that test definitions and prices are administrator-managed in the administration module.

### Laboratory Reports

Laboratory reports include:

- Patient search
- Patient information
- Report list
- Report ID
- Test name
- Sample date
- Report date
- Test result
- Authorization status
- Complete report view
- Print or save as PDF

---

## Feature Matrix

| User | Record Management | Important Unique Features |
|---|---|---|
| Administrator | CRUD-style management of departments, doctors, technicians, tests, and appointment updates | Dashboard analytics, bar charts, monthly reports, audit log |
| Doctor | CRUD-style schedules and records; search on patient, appointments, prescriptions, and tests | Consultation workflow, prescription generation, laboratory orders, patient timeline |
| Patient | Search and update appointments, create/read/update/delete health entries, view records and invoices | Smart appointment booking, health tracking, simulated billing and payment methods |
| Laboratory Technician | Create and manage laboratory results and queue records; search/filter reports | Reference-range classification, laboratory queue, printable laboratory reports |
| Everyone / public | Search and view public clinic information | Public catalogue-style information, login, role redirection |

---

## Main Connected Workflow

```text
Patient Registration
        ↓
Patient Login
        ↓
Department and Doctor Selection
        ↓
Available Appointment Slot
        ↓
Appointment Confirmation
        ↓
Doctor Reviews Appointment
        ↓
Consultation Record
        ├── Prescription
        └── Laboratory Test Order
                         ↓
                  Laboratory Queue
                         ↓
                  Laboratory Result
                         ↓
             Patient and Doctor Views
                         ↓
                    Invoice
                         ↓
                  Simulated Payment
                         ↓
               Administrator Reports
```

The prototype demonstrates these connections in the interface by sharing sample IDs, names, records, and status values across pages.

---

## Data Handling

Sample data is stored in JavaScript arrays of objects located in data files under `js/`.

Examples include:

- Users
- Departments
- Doctors
- Laboratory technicians
- Laboratory tests
- Appointments
- Prescriptions
- Laboratory orders
- Laboratory results
- Health measurements
- Invoices
- Payment references
- Audit activities
- Reports

When a create, update, or delete-style function is used, JavaScript modifies the array in memory.

The prototype does not maintain a database, and changes generally reset if the page is refreshed or the project is reopened. The only persistent browser data explicitly used is the remembered login email through `localStorage`.

---

## Validation and DOM Manipulation

JavaScript form validation is used across the project.

Common validation rules include:

- Required fields
- Valid email format
- 11-digit Bangladeshi phone numbers beginning with `01`
- Password length and number requirements
- Confirm-password matching
- Valid age
- Past/future date restrictions
- Date and time conflict checks
- Positive prices
- Minimum values below maximum values
- Numeric test results
- Exactly four digits for demo payment references
- Terms-and-privacy acceptance
- Duplicate names, emails, IDs, and appointments

Error messages are displayed next to invalid fields using red text and highlighted borders.

The project uses DOM features such as:

- `getElementById()`
- `querySelector()` / `querySelectorAll()`
- `textContent`
- `innerHTML`
- `style`
- `createElement()`
- `appendChild()`
- Event handlers
- `onsubmit`
- `onchange`
- `onkeyup`
- `onblur`
- `addEventListener()`
- Modal pop-ups
- Dynamic table rows
- Dynamic cards
- Dynamic options
- Dynamic search results
- Dynamic status badges

The same script and data-loading pattern is used across many pages: a data JavaScript file is loaded first, followed by common JavaScript helpers, and then the page's own JavaScript.

---

## Search, Filter, Sort, and Pagination

The prototype includes search and filtering in multiple modules.

Examples include:

- Department search
- Doctor search
- Laboratory-technician search
- Test catalogue search
- Clinic appointment filtering
- Invoice search
- Invoice status tabs
- Medical-record search and sorting
- Health-entry search and type filtering
- Laboratory queue search
- Laboratory queue status/priority filters
- Laboratory result search
- Patient timeline search
- Doctor patient-queue search
- Audit-log date and action filters

Search functions compare text in JavaScript arrays and redraw the relevant table or card list. Where supported, the interface includes pagination or page-count controls.

---

## Print and Report Features

The browser print function is used for printable pages.

Printable or print-friendly areas include:

- Prescription
- Patient prescription view
- Laboratory result report
- Invoice
- Patient medical history
- Monthly administrative report
- Laboratory test order/report

Print CSS hides controls that should not appear in a document and keeps the main report or record area visible.

The project does not generate PDF files on a server. It uses the browser's **Print / Save as PDF** dialog.

---

## Project Structure

```text
fall-26-27-heartcare-clinic-management-system/
├── index.html
├── login.html
├── register.html
├── choose-dash.html
├── dashboard.html
├── doctor-dashboard.html
├── patient-dashboard.html
├── lab-dashboard.html
├── css/
│   ├── style.css
│   ├── auth.css
│   ├── admin-dashboard.css
│   ├── doctor-dashboard.css
│   ├── doctor-prescription.css
│   ├── doctor-consultation.css
│   ├── doctor-laboratory-tests.css
│   ├── doctorpatient-timeline.css
│   ├── patient-dashboard.css
│   ├── health-tracker.css
│   ├── my-appointments.css
│   ├── lab-dashboard.css
│   └── additional role/page stylesheets
├── js/
│   ├── login-data.js
│   ├── login.js
│   ├── register.js
│   ├── common.js
│   ├── admin-*.js
│   ├── doctor-*.js
│   ├── patient-*.js
│   ├── lab-*.js
│   └── page-specific data and function files
├── images/
└── README.md
```

The project follows HTML, CSS, and JavaScript separation. Page markup is stored in HTML files, presentation is stored in CSS files, and behavior and sample data are stored in JavaScript files.

---

## Key HTML, CSS, and JavaScript Files

| Area | Example HTML files | CSS and JavaScript support |
|---|---|---|
| Public website | `index.html` | `css/style.css`, `js/script.js` |
| Authentication | `login.html`, `register.html`, `choose-dash.html` | `css/auth.css`, `js/login-data.js`, `js/login.js`, `js/register.js` |
| Administrator | `dashboard.html`, `manage-departments.html`, `manage-doctors.html`, `manage-labtechs.html`, `manage-tests.html`, `manage-appointments.html`, `reports.html`, `audit-log.html` | `css/admin-dashboard.css`, `js/admin-*`, `js/departments.js`, `js/common.js` |
| Doctor | `doctor-dashboard.html`, `myProfile.html`, `my_schedule.html`, `my_appointments.html`, `consultation.html`, `prescription.html`, `order_tests.html`, `patient_timeline.html` | `css/doctor-*.css`, `css/doctorpatient-timeline.css`, `js/doctor-*`, `js/common.js` |
| Patient | `patient-dashboard.html`, `appointments.html`, `book-appointment.html`, `health-tracker.html`, `medical-records.html`, `prescriptions.html`, `invoices.html`, `payment-methods.html`, `patient-profile.html` | `css/patient-dashboard.css`, `css/health-tracker.css`, `css/my-appointments.css`, `js/patient-*`, `js/payment-methods*` |
| Laboratory | `lab-dashboard.html`, `lab-queue.html`, `add-labresult.html`, `manage-labresult.html`, `test-catalogue.html`, `lab-reports.html`, `profile.html` | `css/lab-*.css`, `css/manage-labresults.css`, `js/lab-*`, `js/add-labresult*`, `js/manage-labresults*`, `js/common.js` |

The HTML files generally load JavaScript at the end of the `<body>`. Page scripts often need data scripts or shared helpers to load before the page-specific JavaScript.

---

## Testing Guide

### Authentication Testing

- Log in with each demo account.
- Verify that every role opens the correct dashboard.
- Try an inactive account.
- Enter an incorrect email or password.
- Try five unsuccessful attempts and confirm the temporary lock.
- Test the remember-me option.
- Test the password visibility and Caps Lock features.

### Registration Testing

- Submit an empty form.
- Test invalid email formats.
- Test invalid phone numbers.
- Enter a future date of birth.
- Enter mismatched passwords.
- Submit without accepting terms.
- Submit valid data and verify the patient dashboard opens.

### Administrator Testing

- Search and filter departments.
- Create, edit, activate, and deactivate departments.
- Add and edit doctors.
- Test duplicate doctor email and phone values.
- Search technician accounts.
- Add a test with an invalid range.
- Correct an appointment.
- Create a doctor-time conflict.
- Cancel an appointment and confirm that history is preserved.
- Generate reports for a month with and without data.

### Doctor Testing

- Search appointments.
- Confirm, cancel, and complete appointments.
- Test the consultation workflow.
- Submit an incomplete prescription.
- Add and remove medicine rows.
- Submit a laboratory test order.
- Search for a patient timeline.
- Print a prescription or timeline.

### Patient Testing

- Select a department and doctor.
- Select a date and available time slot.
- Test duplicate or unavailable appointments.
- Reschedule and cancel an appointment.
- Add, edit, search, filter, and delete a health measurement.
- Test impossible or future measurement values.
- View medical records and prescriptions.
- Review invoice totals.
- Add and remove a demo payment method.
- Update patient profile information.

### Laboratory Testing

- Search and filter laboratory queue records.
- Change order status.
- Enter incomplete result information.
- Enter a numeric result below, inside, or above the normal range.
- Verify Low, Normal, and High status behavior.
- Search and review a laboratory report.
- Print or save a report.

---

## Prototype Limitations

This project is a frontend academic prototype, not a production clinic system.

It does not currently provide:

- A real database
- PHP or server-side processing
- Secure session management
- Password hashing
- Server-side authorization
- Persistent account and record storage across reloads
- Real payment processing
- Real email or SMS notification
- Secure patient or laboratory privacy controls
- Real clinical decision making
- Live integration between every JavaScript module

Most changes remain in JavaScript memory and reset after a page reload or navigation when the page recreates its data arrays. The login email is the main explicitly persistent browser value.

The prototype should use synthetic sample data only.

---

## Planned Backend Integration

A future multi-tier implementation can replace the JavaScript sample arrays with PHP and MySQL.

Possible tables include:

- `users`
- `patients`
- `doctors`
- `lab_technicians`
- `departments`
- `doctor_schedules`
- `appointments`
- `consultations`
- `prescriptions`
- `prescription_items`
- `lab_orders`
- `lab_results`
- `test_types`
- `health_logs`
- `invoices`
- `invoice_items`
- `payment_methods`
- `payments`
- `audit_logs`

The future backend can provide:

- PHP login and logout
- Session-based role identification
- Password hashing
- Server-side validation
- MySQL prepared statements
- Record ownership checks
- Database foreign keys
- Transaction-based billing
- Duplicate appointment prevention
- Persistent create, read, update, and delete operations
- Role-based page authorization
- Protected report and medical-record access

Frontend validation should remain as a usability feature, but the backend must always validate and authorize requests again.

---

## Medical and Privacy Disclaimer

HeartCare is an academic prototype and is not a certified medical system.

- The project uses demonstration patient and clinic data.
- Laboratory Low/Normal/High labels depend on sample reference ranges.
- Health-tracker reference checks are informational and are not a diagnosis.
- Prescription and report pages contain demonstration information.
- Payment methods are simulated.
- No real money is collected.
- No real clinical decisions should be made from this prototype.
- Real deployment would require medical, security, privacy, access-control, audit, and regulatory requirements.

---

## Course Outcome

This project supports **CO3: Develop a multi-tier web application for a targeted society**.

The system targets a heart-care clinic and provides role-specific interfaces for patients, doctors, laboratory technicians, and administrators. It demonstrates web-application structure, form design, responsive styling, JavaScript validation, DOM manipulation, search, filters, CRUD-style frontend operations, dynamic dashboards, reports, printable documents, and a connected clinic workflow.

The implementation is currently frontend-based. Future backend development can convert the JavaScript data structures into a PHP/MySQL application without changing the purpose or user-facing workflow of the prototype.
