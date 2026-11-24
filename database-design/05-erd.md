# HeartCare Proposed ERD

```mermaid
erDiagram
  USERS {
    bigint user_id PK
    varchar full_name
    varchar email UK
    varchar phone
    varchar password_hash
    enum role
    enum account_status
  }
  PATIENT_PROFILES {
    bigint user_id PK,FK
    varchar patient_number UK
    date date_of_birth
    varchar gender
    varchar blood_group
  }
  DOCTOR_PROFILES {
    bigint user_id PK,FK
    varchar doctor_number UK
    int department_id FK
    varchar license_number UK
    decimal consultation_fee
  }
  LAB_TECHNICIAN_PROFILES {
    bigint user_id PK,FK
    varchar employee_number UK
  }
  DEPARTMENTS {
    int department_id PK
    varchar department_name UK
    enum status
  }
  DOCTOR_SCHEDULES {
    bigint schedule_id PK
    bigint doctor_user_id FK
    tinyint weekday
    time start_time
    time end_time
  }
  APPOINTMENTS {
    bigint appointment_id PK
    varchar appointment_number UK
    bigint patient_user_id FK
    bigint doctor_user_id FK
    date appointment_date
    time start_time
    time end_time
    enum status
  }
  CONSULTATIONS {
    bigint consultation_id PK
    bigint appointment_id FK,UK
    text symptoms
    text diagnosis
    text treatment_plan
  }
  CONSULTATION_VITALS {
    bigint vital_id PK
    bigint consultation_id FK
    datetime measured_at
  }
  PRESCRIPTIONS {
    bigint prescription_id PK
    varchar prescription_number UK
    bigint patient_user_id FK
    bigint doctor_user_id FK
    bigint consultation_id FK
  }
  PRESCRIPTION_ITEMS {
    bigint prescription_item_id PK
    bigint prescription_id FK
    varchar medicine_name
    varchar dosage
    varchar frequency
    varchar duration
  }
  LAB_TEST_TYPES {
    int test_type_id PK
    varchar test_code UK
    varchar test_name UK
    decimal price
  }
  LAB_TEST_PARAMETERS {
    int parameter_id PK
    int test_type_id FK
    varchar parameter_name
    decimal reference_low
    decimal reference_high
  }
  LAB_ORDERS {
    bigint lab_order_id PK
    varchar order_number UK
    bigint patient_user_id FK
    bigint doctor_user_id FK
    bigint appointment_id FK
    enum priority
    enum status
  }
  LAB_ORDER_ITEMS {
    bigint lab_order_item_id PK
    bigint lab_order_id FK
    int test_type_id FK
    decimal price_at_order
  }
  LAB_RESULTS {
    bigint lab_result_id PK
    bigint lab_order_item_id FK,UK
    bigint technician_user_id FK
    bigint verified_by_user_id FK
    enum processing_status
    enum authorization_status
  }
  LAB_RESULT_VALUES {
    bigint result_value_id PK
    bigint lab_result_id FK
    int parameter_id FK
    decimal numeric_value
    enum classification
  }
  HEALTH_LOGS {
    bigint health_log_id PK
    bigint patient_user_id FK
    enum measurement_type
    datetime measured_at
  }
  PATIENT_TIMELINE_ENTRIES {
    bigint timeline_entry_id PK
    bigint patient_user_id FK
    bigint doctor_user_id FK
    enum record_type
    date record_date
  }
  INVOICES {
    bigint invoice_id PK
    varchar invoice_number UK
    bigint patient_user_id FK
    bigint appointment_id FK
    enum status
  }
  INVOICE_ITEMS {
    bigint invoice_item_id PK
    bigint invoice_id FK
    decimal quantity
    decimal unit_price
  }
  PAYMENT_METHODS {
    bigint payment_method_id PK
    bigint patient_user_id FK
    char last4
    boolean is_primary
  }
  PAYMENTS {
    bigint payment_id PK
    bigint invoice_id FK
    bigint payment_method_id FK
    varchar transaction_reference UK
    decimal amount
    enum attempt_status
  }
  AUDIT_LOGS {
    bigint audit_log_id PK
    bigint actor_user_id FK
    varchar action
    varchar entity_type
    varchar entity_identifier
  }

  USERS ||--o| PATIENT_PROFILES : patient_role
  USERS ||--o| DOCTOR_PROFILES : doctor_role
  USERS ||--o| LAB_TECHNICIAN_PROFILES : lab_role
  DEPARTMENTS ||--o{ DOCTOR_PROFILES : includes
  DOCTOR_PROFILES ||--o{ DOCTOR_SCHEDULES : has
  PATIENT_PROFILES ||--o{ APPOINTMENTS : books
  DOCTOR_PROFILES ||--o{ APPOINTMENTS : attends
  APPOINTMENTS ||--o| CONSULTATIONS : results_in
  CONSULTATIONS ||--o{ CONSULTATION_VITALS : records
  PATIENT_PROFILES ||--o{ PRESCRIPTIONS : receives
  DOCTOR_PROFILES ||--o{ PRESCRIPTIONS : issues
  CONSULTATIONS o|--o{ PRESCRIPTIONS : supports
  PRESCRIPTIONS ||--|{ PRESCRIPTION_ITEMS : contains
  PATIENT_PROFILES ||--o{ LAB_ORDERS : has
  DOCTOR_PROFILES ||--o{ LAB_ORDERS : orders
  APPOINTMENTS ||--o{ LAB_ORDERS : associated_with
  LAB_ORDERS ||--|{ LAB_ORDER_ITEMS : contains
  LAB_TEST_TYPES ||--o{ LAB_ORDER_ITEMS : selected
  LAB_TEST_TYPES ||--o{ LAB_TEST_PARAMETERS : defines
  LAB_ORDER_ITEMS ||--o| LAB_RESULTS : produces
  LAB_TECHNICIAN_PROFILES ||--o{ LAB_RESULTS : processes
  USERS o|--o{ LAB_RESULTS : verifies
  LAB_RESULTS ||--|{ LAB_RESULT_VALUES : reports
  LAB_TEST_PARAMETERS o|--o{ LAB_RESULT_VALUES : classifies
  PATIENT_PROFILES ||--o{ HEALTH_LOGS : records
  PATIENT_PROFILES ||--o{ PATIENT_TIMELINE_ENTRIES : has
  USERS ||--o{ PATIENT_TIMELINE_ENTRIES : authors
  PATIENT_PROFILES ||--o{ INVOICES : billed
  APPOINTMENTS o|--o{ INVOICES : may_generate
  INVOICES ||--|{ INVOICE_ITEMS : contains
  INVOICES ||--o{ PAYMENTS : receives
  PATIENT_PROFILES ||--o{ PAYMENT_METHODS : saves
  PAYMENT_METHODS o|--o{ PAYMENTS : used_for
  USERS o|--o{ AUDIT_LOGS : performs
```

## Relationship notes

- Each patient, doctor, or lab technician is an account in `users` plus a one-to-one profile. The admin role needs no extra profile table.
- Appointments are shared records. Patient and doctor pages scope the same row; department is derived from the doctor’s department.
- A consultation is uniquely associated with an appointment. Vitals are separate readings because they can be repeated and have different units.
- Prescriptions contain multiple medicine rows. Their demographic display fields come from the patient profile, not copied into every prescription.
- Lab orders contain one or more order items. Results and measured values are separate so a panel can return multiple parameters and preserve the exact reference range used at reporting.
- Invoice items and payment attempts remain separate. Invoice totals and balances are calculated from item and successful-payment rows.
- Audit target references are polymorphic; `entity_type` and `entity_identifier` identify targets without pretending a single FK can point to multiple tables.
- There is no screening relationship in this ERD because the referenced frontend route and calculator are absent.
