/*
    File: doctor-consultation.js
    Purpose: Manage patient consultation information,
    patient details, validation and saving.
*/

// Function to display patient consultation list
function renderPatientList() {
  console.log("Consultation Patients:", consultationPatients);

  const tableBody = document.getElementById("patientListTable");

  let output = "";

  for (let i = 0; i < consultationPatients.length; i++) {
    const patient = consultationPatients[i];

    let statusClass = "";

    if (patient.status === "Completed") {
      statusClass = "completed";
    } else {
      statusClass = "pending";
    }

    output +=
      "<tr>" +
      "<td>" +
      patient.patientId +
      "</td>" +
      "<td>" +
      patient.patientName +
      "</td>" +
      "<td>" +
      patient.age +
      "</td>" +
      "<td>" +
      patient.gender +
      "</td>" +
      "<td>" +
      patient.appointmentDate +
      "</td>" +
      "<td>" +
      '<span class="status ' +
      statusClass +
      '">' +
      patient.status +
      "</span>" +
      "</td>" +
      "<td>" +
      '<a href="#patient-details" class="view-btn" onclick="renderPatientDetails(' +
      i +
      ')">' +
      "View Details" +
      "</a>" +
      "</td>" +
      "</tr>";
  }

  if (consultationPatients.length === 0) {
    output = '<tr><td colspan="7">No patients available.</td></tr>';
  }

  tableBody.innerHTML = output;
}

// Function to display selected patient information
function renderPatientDetails(index) {
  const patient = consultationPatients[index];

  console.log("Selected Patient:", patient);

  const container = document.getElementById("patientDetailsContainer");

  let output = "";

  output +=
    '<section class="patient-details" id="patient-details">' +
    '<a href="#patient-list" class="back-btn">' +
    "← Back to Patient List" +
    "</a>" +
    '<div class="panel">' +
    '<h3 class="sub-heading">Patient Information</h3>' +
    '<div class="patient-info-grid">' +
    "<div>" +
    "<label>Full Name</label>" +
    "<p>" +
    patient.patientName +
    "</p>" +
    "</div>" +
    "<div>" +
    "<label>Patient ID</label>" +
    "<p>" +
    patient.patientId +
    "</p>" +
    "</div>" +
    "<div>" +
    "<label>Age</label>" +
    "<p>" +
    patient.age +
    " Years</p>" +
    "</div>" +
    "<div>" +
    "<label>Gender</label>" +
    "<p>" +
    patient.gender +
    "</p>" +
    "</div>" +
    "<div>" +
    "<label>Phone Number</label>" +
    "<p>" +
    patient.phone +
    "</p>" +
    "</div>" +
    "<div>" +
    "<label>Blood Group</label>" +
    "<p>" +
    patient.bloodGroup +
    "</p>" +
    "</div>" +
    "</div>" +
    '<h3 class="sub-heading">Patient Vital Signs</h3>' +
    '<div class="vitals-grid">' +
    '<div class="vital-card">' +
    "<span>Heart Rate</span>" +
    "<strong>" +
    patient.heartRate +
    "</strong>" +
    "<small>bpm</small>" +
    "</div>" +
    '<div class="vital-card">' +
    "<span>Blood Pressure</span>" +
    "<strong>" +
    patient.bloodPressure +
    "</strong>" +
    "<small>mmHg</small>" +
    "</div>" +
    '<div class="vital-card">' +
    "<span>Temperature</span>" +
    "<strong>" +
    patient.temperature +
    "</strong>" +
    "<small>°F</small>" +
    "</div>" +
    '<div class="vital-card">' +
    "<span>Oxygen Level</span>" +
    "<strong>" +
    patient.oxygenLevel +
    "</strong>" +
    "<small>% SpO2</small>" +
    "</div>" +
    "</div>" +
    '<h3 class="sub-heading">Consultation Details</h3>' +
    '<form class="consultation-form" novalidate ' +
    'onsubmit="return saveConsultation(' +
    index +
    ')">' +
    '<div class="form-group">' +
    "<label>Patient Symptoms</label>" +
    '<textarea id="symptoms' +
    index +
    '" ' +
    'placeholder="Enter patient symptoms...">' +
    patient.symptoms +
    "</textarea>" +
    '<span id="symptoms-error' +
    index +
    '" class="field-error"></span>' +
    "</div>" +
    '<div class="form-group">' +
    "<label>Diagnosis</label>" +
    '<textarea id="diagnosis' +
    index +
    '" ' +
    'placeholder="Enter diagnosis...">' +
    patient.diagnosis +
    "</textarea>" +
    '<span id="diagnosis-error' +
    index +
    '" class="field-error"></span>' +
    "</div>" +
    '<div class="form-group">' +
    "<label>Treatment Plan</label>" +
    '<textarea id="treatment' +
    index +
    '" ' +
    'placeholder="Enter treatment plan...">' +
    patient.treatment +
    "</textarea>" +
    '<span id="treatment-error' +
    index +
    '" class="field-error"></span>' +
    "</div>" +
    '<div class="form-group">' +
    "<label>Doctor's Notes</label>" +
    '<textarea id="notes' +
    index +
    '" ' +
    'placeholder="Enter additional notes...">' +
    patient.notes +
    "</textarea>" +
    '<span id="notes-error' +
    index +
    '" class="field-error"></span>' +
    "</div>" +
    '<p id="consultation-message' +
    index +
    '" class="consultation-message"></p>' +
    '<div class="form-actions">' +
    '<button type="button" class="clear-btn" ' +
    'onclick="clearConsultationForm(' +
    index +
    ')">' +
    "Clear Form" +
    "</button>" +
    '<button type="submit" class="save-btn">' +
    "Save Consultation" +
    "</button>" +
    "</div>" +
    "</form>" +
    "</div>" +
    "</section>";

  container.innerHTML = output;
}

// Function to display consultation validation errors
function showConsultationError(fieldId, message, index) {
  document.getElementById(fieldId + "-error" + index).innerHTML = message;
}

// Function to validate consultation form
function validateConsultation(index) {
  let isValid = true;

  const symptoms = document.getElementById("symptoms" + index).value.trim();

  const diagnosis = document.getElementById("diagnosis" + index).value.trim();

  const treatment = document.getElementById("treatment" + index).value.trim();

  const notes = document.getElementById("notes" + index).value.trim();

  // Clear previous errors
  document.getElementById("symptoms-error" + index).innerHTML = "";

  document.getElementById("diagnosis-error" + index).innerHTML = "";

  document.getElementById("treatment-error" + index).innerHTML = "";

  document.getElementById("notes-error" + index).innerHTML = "";

  // Validate symptoms
  if (symptoms === "") {
    showConsultationError("symptoms", "Patient symptoms are required.", index);

    isValid = false;
  }

  // Validate diagnosis
  if (diagnosis === "") {
    showConsultationError("diagnosis", "Diagnosis is required.", index);

    isValid = false;
  }

  // Validate treatment
  if (treatment === "") {
    showConsultationError("treatment", "Treatment plan is required.", index);

    isValid = false;
  }

  // Validate doctor's notes
  if (notes === "") {
    showConsultationError("notes", "Doctor's notes are required.", index);

    isValid = false;
  }

  return isValid;
}

// Function to save consultation information
function saveConsultation(index) {
  if (validateConsultation(index) === false) {
    document.getElementById("consultation-message" + index).innerHTML =
      "Please complete all consultation fields.";

    document.getElementById("consultation-message" + index).style.color = "red";

    return false;
  }

  const patient = consultationPatients[index];

  // Update patient consultation information
  patient.symptoms = document.getElementById("symptoms" + index).value.trim();

  patient.diagnosis = document.getElementById("diagnosis" + index).value.trim();

  patient.treatment = document.getElementById("treatment" + index).value.trim();

  patient.notes = document.getElementById("notes" + index).value.trim();

  // Update patient status
  patient.status = "Completed";

  // Check whether consultation record already exists
  let recordFound = false;

  for (let i = 0; i < consultationRecords.length; i++) {
    if (consultationRecords[i].patientId === patient.patientId) {
      consultationRecords[i].symptoms = patient.symptoms;

      consultationRecords[i].diagnosis = patient.diagnosis;

      consultationRecords[i].treatment = patient.treatment;

      consultationRecords[i].notes = patient.notes;

      recordFound = true;

      break;
    }
  }

  // Add new consultation record
  if (recordFound === false) {
    const newRecord = {
      patientId: patient.patientId,

      symptoms: patient.symptoms,

      diagnosis: patient.diagnosis,

      treatment: patient.treatment,

      notes: patient.notes,
    };

    consultationRecords.push(newRecord);
  }

  console.log("Updated Patient:", patient);

  console.log("Consultation Records:", consultationRecords);

  // Display success message
  document.getElementById("consultation-message" + index).innerHTML =
    "Consultation saved successfully!";

  document.getElementById("consultation-message" + index).style.color = "green";

  // Update patient list
  renderPatientList();

  alert("Consultation saved successfully!");

  return false;
}

// Function to clear consultation form
function clearConsultationForm(index) {
  document.getElementById("symptoms" + index).value = "";

  document.getElementById("diagnosis" + index).value = "";

  document.getElementById("treatment" + index).value = "";

  document.getElementById("notes" + index).value = "";

  // Clear error messages
  document.getElementById("symptoms-error" + index).innerHTML = "";

  document.getElementById("diagnosis-error" + index).innerHTML = "";

  document.getElementById("treatment-error" + index).innerHTML = "";

  document.getElementById("notes-error" + index).innerHTML = "";

  document.getElementById("consultation-message" + index).innerHTML = "";
}

// Function to initialize consultation page
function initializeConsultationPage() {
  renderPatientList();
}

// Load consultation page
initializeConsultationPage();
