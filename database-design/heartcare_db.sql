-- HeartCare Clinic Management System
-- Draft schema for review; not executed.
-- Target: MySQL 8.0+ or a compatible XAMPP MariaDB release.
-- Generated active-slot column prevents duplicate same-start active appointments.
-- Overlapping intervals still require a transaction and server-side conflict check.

CREATE DATABASE IF NOT EXISTS heartcare_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE heartcare_db;

CREATE TABLE departments (
  department_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  description VARCHAR(500) NULL,
  status ENUM('Active','Inactive') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (department_id),
  UNIQUE KEY uq_departments_name (department_name),
  KEY idx_departments_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
  user_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(30) NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','doctor','patient','labtech') NOT NULL,
  account_status ENUM('Active','Inactive') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at DATETIME NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_role_status (role, account_status),
  KEY idx_users_name (full_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE patient_profiles (
  user_id BIGINT UNSIGNED NOT NULL,
  patient_number VARCHAR(24) NOT NULL,
  date_of_birth DATE NULL,
  gender ENUM('male','female','other','prefer_not_to_say') NULL,
  blood_group VARCHAR(3) NULL,
  address VARCHAR(500) NULL,
  emergency_contact_name VARCHAR(120) NULL,
  emergency_contact_phone VARCHAR(30) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  UNIQUE KEY uq_patient_number (patient_number),
  CONSTRAINT fk_patient_profile_user FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE doctor_profiles (
  user_id BIGINT UNSIGNED NOT NULL,
  doctor_number VARCHAR(24) NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  license_number VARCHAR(60) NOT NULL,
  specialization VARCHAR(120) NULL,
  qualification VARCHAR(255) NULL,
  experience_years SMALLINT UNSIGNED NULL,
  consultation_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  gender ENUM('male','female','other') NULL,
  date_of_birth DATE NULL,
  blood_group VARCHAR(3) NULL,
  address VARCHAR(500) NULL,
  hospital_name VARCHAR(150) NULL,
  biography TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  UNIQUE KEY uq_doctor_number (doctor_number),
  UNIQUE KEY uq_doctor_license (license_number),
  KEY idx_doctors_department (department_id),
  CONSTRAINT fk_doctor_profile_user FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_doctor_department FOREIGN KEY (department_id)
    REFERENCES departments (department_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_doctor_fee CHECK (consultation_fee >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lab_technician_profiles (
  user_id BIGINT UNSIGNED NOT NULL,
  employee_number VARCHAR(24) NOT NULL,
  gender ENUM('male','female','other') NULL,
  date_of_birth DATE NULL,
  address VARCHAR(500) NULL,
  designation VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  UNIQUE KEY uq_lab_employee_number (employee_number),
  CONSTRAINT fk_lab_tech_user FOREIGN KEY (user_id)
    REFERENCES users (user_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE doctor_schedules (
  schedule_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  doctor_user_id BIGINT UNSIGNED NOT NULL,
  weekday TINYINT UNSIGNED NOT NULL COMMENT '1=Monday through 7=Sunday',
  start_time TIME NULL,
  end_time TIME NULL,
  break_start TIME NULL,
  break_end TIME NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (schedule_id),
  UNIQUE KEY uq_doctor_weekday (doctor_user_id, weekday),
  CONSTRAINT fk_schedule_doctor FOREIGN KEY (doctor_user_id)
    REFERENCES doctor_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_schedule_weekday CHECK (weekday BETWEEN 1 AND 7),
  CONSTRAINT chk_schedule_time CHECK (
    (is_available = FALSE AND start_time IS NULL AND end_time IS NULL)
    OR (is_available = TRUE AND start_time IS NOT NULL AND end_time > start_time)
  ),
  CONSTRAINT chk_schedule_break CHECK (
    (break_start IS NULL AND break_end IS NULL)
    OR (break_start IS NOT NULL AND break_end > break_start)
  )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE appointments (
  appointment_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  appointment_number VARCHAR(24) NOT NULL,
  patient_user_id BIGINT UNSIGNED NOT NULL,
  doctor_user_id BIGINT UNSIGNED NOT NULL,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  reason VARCHAR(255) NULL,
  status ENUM('Pending','Confirmed','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  cancelled_at DATETIME NULL,
  cancelled_by_user_id BIGINT UNSIGNED NULL,
  active_slot_key VARCHAR(32)
    GENERATED ALWAYS AS (
      CASE
        WHEN status IN ('Pending','Confirmed')
        THEN CONCAT(appointment_date, ' ', start_time)
        ELSE NULL
      END
    ) STORED,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (appointment_id),
  UNIQUE KEY uq_appointment_number (appointment_number),
  UNIQUE KEY uq_doctor_active_slot (doctor_user_id, active_slot_key),
  KEY idx_appointments_patient_date (patient_user_id, appointment_date),
  KEY idx_appointments_doctor_date_status (doctor_user_id, appointment_date, status),
  KEY idx_appointments_date_status (appointment_date, status),
  CONSTRAINT fk_appointment_patient FOREIGN KEY (patient_user_id)
    REFERENCES patient_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_appointment_doctor FOREIGN KEY (doctor_user_id)
    REFERENCES doctor_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_appointment_cancel_actor FOREIGN KEY (cancelled_by_user_id)
    REFERENCES users (user_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT chk_appointment_interval CHECK (end_time > start_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE consultations (
  consultation_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  appointment_id BIGINT UNSIGNED NOT NULL,
  symptoms TEXT NULL,
  diagnosis TEXT NULL,
  treatment_plan TEXT NULL,
  notes TEXT NULL,
  follow_up_date DATE NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (consultation_id),
  UNIQUE KEY uq_consultation_appointment (appointment_id),
  CONSTRAINT fk_consultation_appointment FOREIGN KEY (appointment_id)
    REFERENCES appointments (appointment_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE consultation_vitals (
  vital_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  consultation_id BIGINT UNSIGNED NOT NULL,
  measured_at DATETIME NOT NULL,
  heart_rate_bpm SMALLINT UNSIGNED NULL,
  systolic_mmhg SMALLINT UNSIGNED NULL,
  diastolic_mmhg SMALLINT UNSIGNED NULL,
  temperature DECIMAL(5,2) NULL,
  temperature_unit ENUM('C','F') NULL,
  oxygen_saturation_pct DECIMAL(5,2) NULL,
  weight_kg DECIMAL(6,2) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (vital_id),
  KEY idx_vitals_consultation_time (consultation_id, measured_at),
  CONSTRAINT fk_vitals_consultation FOREIGN KEY (consultation_id)
    REFERENCES consultations (consultation_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_vitals_oxygen CHECK (
    oxygen_saturation_pct IS NULL OR oxygen_saturation_pct BETWEEN 0 AND 100
  ),
  CONSTRAINT chk_vitals_temperature_unit CHECK (
    (temperature IS NULL AND temperature_unit IS NULL)
    OR (temperature IS NOT NULL AND temperature_unit IS NOT NULL)
  )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE prescriptions (
  prescription_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  prescription_number VARCHAR(30) NOT NULL,
  patient_user_id BIGINT UNSIGNED NOT NULL,
  doctor_user_id BIGINT UNSIGNED NOT NULL,
  consultation_id BIGINT UNSIGNED NULL,
  prescription_date DATE NOT NULL,
  follow_up_date DATE NULL,
  diagnosis TEXT NOT NULL,
  advice TEXT NULL,
  follow_up_instructions TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (prescription_id),
  UNIQUE KEY uq_prescription_number (prescription_number),
  KEY idx_prescriptions_patient_date (patient_user_id, prescription_date),
  KEY idx_prescriptions_doctor_date (doctor_user_id, prescription_date),
  CONSTRAINT fk_prescription_patient FOREIGN KEY (patient_user_id)
    REFERENCES patient_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_prescription_doctor FOREIGN KEY (doctor_user_id)
    REFERENCES doctor_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_prescription_consultation FOREIGN KEY (consultation_id)
    REFERENCES consultations (consultation_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT chk_prescription_followup CHECK (
    follow_up_date IS NULL OR follow_up_date > prescription_date
  )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE prescription_items (
  prescription_item_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  prescription_id BIGINT UNSIGNED NOT NULL,
  sort_order TINYINT UNSIGNED NOT NULL,
  medicine_name VARCHAR(150) NOT NULL,
  dosage VARCHAR(100) NOT NULL,
  frequency VARCHAR(120) NOT NULL,
  duration VARCHAR(80) NOT NULL,
  instructions VARCHAR(255) NOT NULL,
  PRIMARY KEY (prescription_item_id),
  UNIQUE KEY uq_prescription_item_order (prescription_id, sort_order),
  CONSTRAINT fk_prescription_item_header FOREIGN KEY (prescription_id)
    REFERENCES prescriptions (prescription_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lab_test_types (
  test_type_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  test_code VARCHAR(20) NOT NULL,
  test_name VARCHAR(150) NOT NULL,
  category VARCHAR(100) NULL,
  specimen VARCHAR(80) NULL,
  price DECIMAL(10,2) NOT NULL,
  status ENUM('Active','Inactive') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (test_type_id),
  UNIQUE KEY uq_lab_test_code (test_code),
  UNIQUE KEY uq_lab_test_name (test_name),
  KEY idx_lab_test_status_category (status, category),
  CONSTRAINT chk_lab_test_price CHECK (price >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lab_test_parameters (
  parameter_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  test_type_id INT UNSIGNED NOT NULL,
  parameter_name VARCHAR(120) NOT NULL,
  unit VARCHAR(40) NULL,
  reference_low DECIMAL(12,4) NULL,
  reference_high DECIMAL(12,4) NULL,
  reference_text VARCHAR(255) NULL,
  PRIMARY KEY (parameter_id),
  UNIQUE KEY uq_test_parameter_name (test_type_id, parameter_name),
  CONSTRAINT fk_test_parameter_type FOREIGN KEY (test_type_id)
    REFERENCES lab_test_types (test_type_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_test_reference_range CHECK (
    reference_low IS NULL OR reference_high IS NULL OR reference_high >= reference_low
  )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lab_orders (
  lab_order_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_number VARCHAR(30) NOT NULL,
  patient_user_id BIGINT UNSIGNED NOT NULL,
  ordering_doctor_user_id BIGINT UNSIGNED NOT NULL,
  appointment_id BIGINT UNSIGNED NOT NULL,
  order_date DATE NOT NULL,
  priority ENUM('Normal','Urgent','Emergency') NOT NULL DEFAULT 'Normal',
  status ENUM('Pending','Processing','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  collection_date DATE NULL,
  instructions TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (lab_order_id),
  UNIQUE KEY uq_lab_order_number (order_number),
  KEY idx_lab_orders_patient_date (patient_user_id, order_date),
  KEY idx_lab_orders_status_priority_date (status, priority, order_date),
  KEY idx_lab_orders_appointment (appointment_id),
  CONSTRAINT fk_lab_order_patient FOREIGN KEY (patient_user_id)
    REFERENCES patient_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_lab_order_doctor FOREIGN KEY (ordering_doctor_user_id)
    REFERENCES doctor_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_lab_order_appointment FOREIGN KEY (appointment_id)
    REFERENCES appointments (appointment_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_lab_collection_date CHECK (
    collection_date IS NULL OR collection_date >= order_date
  )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lab_order_items (
  lab_order_item_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lab_order_id BIGINT UNSIGNED NOT NULL,
  test_type_id INT UNSIGNED NOT NULL,
  price_at_order DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (lab_order_item_id),
  UNIQUE KEY uq_lab_order_test (lab_order_id, test_type_id),
  CONSTRAINT fk_lab_item_order FOREIGN KEY (lab_order_id)
    REFERENCES lab_orders (lab_order_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_lab_item_test FOREIGN KEY (test_type_id)
    REFERENCES lab_test_types (test_type_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_lab_item_price CHECK (price_at_order >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lab_results (
  lab_result_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lab_order_item_id BIGINT UNSIGNED NOT NULL,
  sample_date DATE NOT NULL,
  sample_type ENUM('Blood','Urine','Serum','Plasma','Other') NOT NULL,
  processing_status ENUM('Pending','Under Review','Completed') NOT NULL DEFAULT 'Pending',
  authorization_status ENUM('Pending','Authorized') NOT NULL DEFAULT 'Pending',
  technician_user_id BIGINT UNSIGNED NOT NULL,
  verified_by_user_id BIGINT UNSIGNED NULL,
  technician_remarks TEXT NULL,
  reported_at DATETIME NULL,
  authorized_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (lab_result_id),
  UNIQUE KEY uq_result_order_item (lab_order_item_id),
  KEY idx_lab_results_processing (processing_status, created_at),
  KEY idx_lab_results_authorization (authorization_status, created_at),
  CONSTRAINT fk_result_order_item FOREIGN KEY (lab_order_item_id)
    REFERENCES lab_order_items (lab_order_item_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_result_technician FOREIGN KEY (technician_user_id)
    REFERENCES lab_technician_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_result_verifier FOREIGN KEY (verified_by_user_id)
    REFERENCES doctor_profiles (user_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lab_result_values (
  result_value_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lab_result_id BIGINT UNSIGNED NOT NULL,
  parameter_id INT UNSIGNED NULL,
  parameter_name_snapshot VARCHAR(120) NOT NULL,
  numeric_value DECIMAL(14,4) NULL,
  text_value VARCHAR(255) NULL,
  unit_snapshot VARCHAR(40) NULL,
  reference_low_snapshot DECIMAL(12,4) NULL,
  reference_high_snapshot DECIMAL(12,4) NULL,
  reference_text_snapshot VARCHAR(255) NULL,
  classification ENUM('LOW','NORMAL','HIGH','ABNORMAL','CRITICAL','UNCLASSIFIED')
    NOT NULL DEFAULT 'UNCLASSIFIED',
  PRIMARY KEY (result_value_id),
  KEY idx_result_values_result (lab_result_id),
  CONSTRAINT fk_result_value_result FOREIGN KEY (lab_result_id)
    REFERENCES lab_results (lab_result_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_result_value_parameter FOREIGN KEY (parameter_id)
    REFERENCES lab_test_parameters (parameter_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT chk_result_has_value CHECK (
    numeric_value IS NOT NULL OR text_value IS NOT NULL
  )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE health_logs (
  health_log_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  patient_user_id BIGINT UNSIGNED NOT NULL,
  measurement_type ENUM('Blood pressure','Blood glucose','Weight') NOT NULL,
  measured_at DATETIME NOT NULL,
  systolic_mmhg SMALLINT UNSIGNED NULL,
  diastolic_mmhg SMALLINT UNSIGNED NULL,
  numeric_value DECIMAL(8,2) NULL,
  unit VARCHAR(30) NULL,
  context VARCHAR(60) NULL,
  note VARCHAR(1000) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (health_log_id),
  KEY idx_health_patient_measured (patient_user_id, measured_at),
  KEY idx_health_type_measured (measurement_type, measured_at),
  CONSTRAINT fk_health_patient FOREIGN KEY (patient_user_id)
    REFERENCES patient_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE patient_timeline_entries (
  timeline_entry_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  patient_user_id BIGINT UNSIGNED NOT NULL,
  doctor_user_id BIGINT UNSIGNED NOT NULL,
  record_type ENUM('Consultation','Prescription','Laboratory') NOT NULL,
  title VARCHAR(180) NOT NULL,
  record_date DATE NOT NULL,
  status VARCHAR(40) NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (timeline_entry_id),
  KEY idx_timeline_patient_date (patient_user_id, record_date),
  CONSTRAINT fk_timeline_patient FOREIGN KEY (patient_user_id)
    REFERENCES patient_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_timeline_doctor FOREIGN KEY (doctor_user_id)
    REFERENCES doctor_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE invoices (
  invoice_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  invoice_number VARCHAR(30) NOT NULL,
  patient_user_id BIGINT UNSIGNED NOT NULL,
  appointment_id BIGINT UNSIGNED NULL,
  issue_date DATE NOT NULL,
  due_date DATE NULL,
  status ENUM('Issued','Paid','Cancelled') NOT NULL DEFAULT 'Issued',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (invoice_id),
  UNIQUE KEY uq_invoice_number (invoice_number),
  KEY idx_invoices_patient_status_due (patient_user_id, status, due_date),
  CONSTRAINT fk_invoice_patient FOREIGN KEY (patient_user_id)
    REFERENCES patient_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_invoice_appointment FOREIGN KEY (appointment_id)
    REFERENCES appointments (appointment_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT chk_invoice_due_date CHECK (due_date IS NULL OR due_date >= issue_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE invoice_items (
  invoice_item_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  invoice_id BIGINT UNSIGNED NOT NULL,
  description VARCHAR(255) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  unit_price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (invoice_item_id),
  KEY idx_invoice_items_invoice (invoice_id),
  CONSTRAINT fk_invoice_item_header FOREIGN KEY (invoice_id)
    REFERENCES invoices (invoice_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_invoice_item_quantity CHECK (quantity > 0),
  CONSTRAINT chk_invoice_item_price CHECK (unit_price >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE payment_methods (
  payment_method_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  patient_user_id BIGINT UNSIGNED NOT NULL,
  nickname VARCHAR(80) NOT NULL,
  brand ENUM('Visa','Mastercard','Other') NOT NULL,
  last4 CHAR(4) NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (payment_method_id),
  KEY idx_payment_methods_patient (patient_user_id),
  CONSTRAINT fk_payment_method_patient FOREIGN KEY (patient_user_id)
    REFERENCES patient_profiles (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT chk_payment_last4 CHECK (last4 REGEXP '^[0-9]{4}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE payments (
  payment_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  invoice_id BIGINT UNSIGNED NOT NULL,
  payment_method_id BIGINT UNSIGNED NULL,
  transaction_reference VARCHAR(60) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  attempt_status ENUM('Pending','Succeeded','Failed','Refunded') NOT NULL DEFAULT 'Pending',
  method_label_snapshot VARCHAR(120) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paid_at DATETIME NULL,
  PRIMARY KEY (payment_id),
  UNIQUE KEY uq_payment_reference (transaction_reference),
  KEY idx_payments_invoice_status (invoice_id, attempt_status),
  CONSTRAINT fk_payment_invoice FOREIGN KEY (invoice_id)
    REFERENCES invoices (invoice_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_payment_method FOREIGN KEY (payment_method_id)
    REFERENCES payment_methods (payment_method_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT chk_payment_amount CHECK (amount > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE audit_logs (
  audit_log_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  actor_user_id BIGINT UNSIGNED NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(60) NOT NULL,
  entity_identifier VARCHAR(60) NULL COMMENT 'Public ID; polymorphic target, not an FK',
  details TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (audit_log_id),
  KEY idx_audit_created (created_at),
  KEY idx_audit_actor_created (actor_user_id, created_at),
  KEY idx_audit_action_created (action, created_at),
  CONSTRAINT fk_audit_actor FOREIGN KEY (actor_user_id)
    REFERENCES users (user_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
