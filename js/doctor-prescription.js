/*
    File: doctor-prescription.js
    Purpose: Manage doctor prescriptions,
    form validation, CRUD, search and printing.
*/

// Function to generate a new prescription ID
function generatePrescriptionId() {
  let id = "RX-2026-";

  if (prescriptionCounter < 10) {
    id = id + "0000" + prescriptionCounter;
  } else if (prescriptionCounter < 100) {
    id = id + "000" + prescriptionCounter;
  } else if (prescriptionCounter < 1000) {
    id = id + "00" + prescriptionCounter;
  } else {
    id = id + prescriptionCounter;
  }

  return id;
}

// Function to load today's date into the prescription date field
function loadPrescriptionDate() {
  const today = new Date();

  let month = today.getMonth() + 1;

  let day = today.getDate();

  let year = today.getFullYear();

  let monthText = month;

  let dayText = day;

  if (month < 10) {
    monthText = "0" + month;
  }

  if (day < 10) {
    dayText = "0" + day;
  }

  document.getElementById("prescriptionDate").value =
    year + "-" + monthText + "-" + dayText;
}

// Function to clear all prescription errors
function clearPrescriptionErrors() {
  const errorIds = [
    "prescriptionDate",
    "patientName",
    "patientId",
    "age",
    "gender",
    "bloodGroup",
    "phone",
    "diagnosis",
    "medicine1",
    "dosage1",
    "frequency1",
    "duration1",
    "instruction1",
    "medicine2",
    "dosage2",
    "frequency2",
    "duration2",
    "instruction2",
    "medicine3",
    "dosage3",
    "frequency3",
    "duration3",
    "instruction3",
  ];

  for (let i = 0; i < errorIds.length; i++) {
    document.getElementById(errorIds[i] + "-error").innerHTML = "";
  }

  document.getElementById("prescriptionMessage").innerHTML = "";
}

// Function to display prescription validation errors
function showPrescriptionError(fieldId, message) {
  document.getElementById(fieldId + "-error").innerHTML = message;
}

// Function to check whether a medicine row has any information
function isMedicineRowStarted(index) {
  const name = document.getElementById("medicine" + index).value;

  const dosage = document.getElementById("dosage" + index).value;

  const frequency = document.getElementById("frequency" + index).value;

  const duration = document.getElementById("duration" + index).value;

  const instruction = document.getElementById("instruction" + index).value;

  if (
    name !== "" ||
    dosage !== "" ||
    frequency !== "" ||
    duration !== "" ||
    instruction !== ""
  ) {
    return true;
  }

  return false;
}

// Function to validate prescription form
function validatePrescription() {
  clearPrescriptionErrors();

  let isValid = true;

  let medicineCount = 0;

  // Get patient information
  const patientName = document.getElementById("patientName").value.trim();

  const patientId = document.getElementById("patientId").value.trim();

  const age = document.getElementById("age").value;

  const gender = document.getElementById("gender").value;

  const bloodGroup = document.getElementById("bloodGroup").value;

  const phone = document.getElementById("phone").value.trim();

  const diagnosis = document.getElementById("diagnosis").value.trim();

  // Validate prescription date
  if (document.getElementById("prescriptionDate").value === "") {
    showPrescriptionError("prescriptionDate", "Prescription date is required.");

    isValid = false;
  }

  // Validate patient name
  if (patientName === "") {
    showPrescriptionError("patientName", "Patient name is required.");

    isValid = false;
  }

  // Validate patient ID
  if (patientId === "") {
    showPrescriptionError("patientId", "Patient ID is required.");

    isValid = false;
  }

  // Validate age
  if (age === "" || Number(age) < 1 || Number(age) > 120) {
    showPrescriptionError("age", "Enter a valid age between 1 and 120.");

    isValid = false;
  }

  // Validate gender
  if (gender === "") {
    showPrescriptionError("gender", "Please select gender.");

    isValid = false;
  }

  // Validate blood group
  if (bloodGroup === "") {
    showPrescriptionError("bloodGroup", "Please select blood group.");

    isValid = false;
  }

  // Validate phone
  if (phone === "") {
    showPrescriptionError("phone", "Phone number is required.");

    isValid = false;
  } else {
    let digitCount = 0;

    for (let i = 0; i < phone.length; i++) {
      if (phone[i] >= "0" && phone[i] <= "9") {
        digitCount++;
      }
    }

    if (digitCount < 10 || digitCount > 15) {
      showPrescriptionError(
        "phone",
        "Phone number must contain 10 to 15 digits.",
      );

      isValid = false;
    }
  }

  // Validate diagnosis
  if (diagnosis === "") {
    showPrescriptionError("diagnosis", "Diagnosis is required.");

    isValid = false;
  }

  // Validate medicine rows
  for (let i = 1; i <= 3; i++) {
    if (isMedicineRowStarted(i)) {
      medicineCount++;

      const name = document.getElementById("medicine" + i).value.trim();

      const dosage = document.getElementById("dosage" + i).value.trim();

      const frequency = document.getElementById("frequency" + i).value.trim();

      const duration = document.getElementById("duration" + i).value.trim();

      const instruction = document
        .getElementById("instruction" + i)
        .value.trim();

      if (name === "") {
        showPrescriptionError("medicine" + i, "Medicine name is required.");

        isValid = false;
      }

      if (dosage === "") {
        showPrescriptionError("dosage" + i, "Dosage is required.");

        isValid = false;
      }

      if (frequency === "") {
        showPrescriptionError("frequency" + i, "Frequency is required.");

        isValid = false;
      }

      if (duration === "") {
        showPrescriptionError("duration" + i, "Duration is required.");

        isValid = false;
      }

      if (instruction === "") {
        showPrescriptionError("instruction" + i, "Instruction is required.");

        isValid = false;
      }
    }
  }

  // At least one medicine is required
  if (medicineCount === 0) {
    showPrescriptionError("medicine1", "Enter at least one medicine.");

    isValid = false;
  }

  // Validate follow-up date
  const prescriptionDate = document.getElementById("prescriptionDate").value;

  const followupDate = document.getElementById("followupDate").value;

  if (followupDate !== "" && prescriptionDate !== "") {
    if (followupDate <= prescriptionDate) {
      showPrescriptionError(
        "followupDate",
        "Follow-up date must be after prescription date.",
      );

      isValid = false;
    }
  }

  return isValid;
}

// Function to collect medicine information
function collectMedicines() {
  let medicines = [];

  for (let i = 1; i <= 3; i++) {
    const name = document.getElementById("medicine" + i).value.trim();

    if (name !== "") {
      const medicine = {
        name: name,

        dosage: document.getElementById("dosage" + i).value.trim(),

        frequency: document.getElementById("frequency" + i).value.trim(),

        duration: document.getElementById("duration" + i).value.trim(),

        instruction: document.getElementById("instruction" + i).value.trim(),
      };

      medicines.push(medicine);
    }
  }

  return medicines;
}

// Function to create a prescription object
function createPrescriptionObject() {
  const prescription = {
    prescriptionId: document.getElementById("prescriptionId").value,

    prescriptionDate: document.getElementById("prescriptionDate").value,

    followupDate: document.getElementById("followupDate").value,

    patientName: document.getElementById("patientName").value.trim(),

    patientId: document.getElementById("patientId").value.trim(),

    age: document.getElementById("age").value,

    gender: document.getElementById("gender").value,

    bloodGroup: document.getElementById("bloodGroup").value,

    phone: document.getElementById("phone").value.trim(),

    diagnosis: document.getElementById("diagnosis").value.trim(),

    medicines: collectMedicines(),

    advice: document.getElementById("advice").value.trim(),

    followupInstructions: document
      .getElementById("followupInstructions")
      .value.trim(),
  };

  return prescription;
}

// Function to save a new or updated prescription
function savePrescription() {
  if (validatePrescription() === false) {
    document.getElementById("prescriptionMessage").innerHTML =
      "Please correct the errors before saving.";

    document.getElementById("prescriptionMessage").style.color = "red";

    return false;
  }

  const prescription = createPrescriptionObject();

  // Update existing prescription
  if (prescriptionEditIndex !== -1) {
    doctorPrescriptions[prescriptionEditIndex] = prescription;

    alert("Prescription updated successfully!");

    prescriptionEditIndex = -1;
  }

  // Create new prescription
  else {
    doctorPrescriptions.push(prescription);

    prescriptionCounter++;

    alert("Prescription saved successfully!");
  }

  console.log("Prescription Records:", doctorPrescriptions);

  renderPrescriptionList();

  resetPrescriptionForm();

  return false;
}

// Function to render saved prescription records
function renderPrescriptionList() {
  console.log("All Prescriptions:", doctorPrescriptions);

  const tableBody = document.getElementById("prescriptionList");

  let output = "";

  for (let i = 0; i < doctorPrescriptions.length; i++) {
    const prescription = doctorPrescriptions[i];

    output +=
      "<tr>" +
      "<td>" +
      prescription.prescriptionId +
      "</td>" +
      "<td>" +
      prescription.patientName +
      "</td>" +
      "<td>" +
      prescription.patientId +
      "</td>" +
      "<td>" +
      prescription.prescriptionDate +
      "</td>" +
      "<td>" +
      prescription.medicines.length +
      "</td>" +
      "<td>" +
      '<button type="button" onclick="editPrescription(' +
      i +
      ')">Edit</button>' +
      '<button type="button" onclick="deletePrescription(' +
      i +
      ')">Delete</button>' +
      '<button type="button" onclick="printPrescription(' +
      i +
      ')">Print</button>' +
      "</td>" +
      "</tr>";
  }

  if (doctorPrescriptions.length === 0) {
    output = '<tr><td colspan="6">No prescriptions found.</td></tr>';
  }

  tableBody.innerHTML = output;
}

// Function to search prescriptions
function searchPrescriptions() {
  const searchText = document
    .getElementById("prescriptionSearch")
    .value.toLowerCase();

  const tableBody = document.getElementById("prescriptionList");

  let output = "";

  let count = 0;

  for (let i = 0; i < doctorPrescriptions.length; i++) {
    const prescription = doctorPrescriptions[i];

    const nameMatch =
      prescription.patientName.toLowerCase().indexOf(searchText) !== -1;

    const idMatch =
      prescription.patientId.toLowerCase().indexOf(searchText) !== -1;

    if (nameMatch || idMatch) {
      output +=
        "<tr>" +
        "<td>" +
        prescription.prescriptionId +
        "</td>" +
        "<td>" +
        prescription.patientName +
        "</td>" +
        "<td>" +
        prescription.patientId +
        "</td>" +
        "<td>" +
        prescription.prescriptionDate +
        "</td>" +
        "<td>" +
        prescription.medicines.length +
        "</td>" +
        "<td>" +
        '<button type="button" onclick="editPrescription(' +
        i +
        ')">Edit</button>' +
        '<button type="button" onclick="deletePrescription(' +
        i +
        ')">Delete</button>' +
        '<button type="button" onclick="printPrescription(' +
        i +
        ')">Print</button>' +
        "</td>" +
        "</tr>";

      count++;
    }
  }

  if (count === 0) {
    output = '<tr><td colspan="6">No prescriptions found.</td></tr>';
  }

  tableBody.innerHTML = output;
}

// Function to edit an existing prescription
function editPrescription(index) {
  const prescription = doctorPrescriptions[index];

  prescriptionEditIndex = index;

  document.getElementById("prescriptionId").value = prescription.prescriptionId;

  document.getElementById("prescriptionDate").value =
    prescription.prescriptionDate;

  document.getElementById("followupDate").value = prescription.followupDate;

  document.getElementById("patientName").value = prescription.patientName;

  document.getElementById("patientId").value = prescription.patientId;

  document.getElementById("age").value = prescription.age;

  document.getElementById("gender").value = prescription.gender;

  document.getElementById("bloodGroup").value = prescription.bloodGroup;

  document.getElementById("phone").value = prescription.phone;

  document.getElementById("diagnosis").value = prescription.diagnosis;

  document.getElementById("advice").value = prescription.advice;

  document.getElementById("followupInstructions").value =
    prescription.followupInstructions;

  // Clear all medicine rows
  for (let i = 1; i <= 3; i++) {
    document.getElementById("medicine" + i).value = "";

    document.getElementById("dosage" + i).value = "";

    document.getElementById("frequency" + i).value = "";

    document.getElementById("duration" + i).value = "";

    document.getElementById("instruction" + i).value = "";
  }

  // Load saved medicines
  for (let i = 0; i < prescription.medicines.length; i++) {
    const number = i + 1;

    document.getElementById("medicine" + number).value =
      prescription.medicines[i].name;

    document.getElementById("dosage" + number).value =
      prescription.medicines[i].dosage;

    document.getElementById("frequency" + number).value =
      prescription.medicines[i].frequency;

    document.getElementById("duration" + number).value =
      prescription.medicines[i].duration;

    document.getElementById("instruction" + number).value =
      prescription.medicines[i].instruction;
  }

  clearPrescriptionErrors();

  document.getElementById("prescriptionForm").scrollIntoView();

  console.log("Editing Prescription:", prescription);
}

// Function to remove an item from an array
function removeAt(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}

// Function to delete a prescription
function deletePrescription(index) {
  if (confirm("Are you sure you want to delete this prescription?")) {
    doctorPrescriptions = removeAt(doctorPrescriptions, index);

    if (prescriptionEditIndex === index) {
      prescriptionEditIndex = -1;

      resetPrescriptionForm();
    } else if (prescriptionEditIndex > index) {
      prescriptionEditIndex--;
    }

    renderPrescriptionList();

    console.log("Updated Prescription Records:", doctorPrescriptions);

    alert("Prescription deleted successfully!");
  }
}

// Function to print a saved prescription
function printPrescription(index) {
  const prescription = doctorPrescriptions[index];

  let medicineText = "";

  for (let i = 0; i < prescription.medicines.length; i++) {
    medicineText +=
      "<tr>" +
      "<td>" +
      (i + 1) +
      "</td>" +
      "<td>" +
      prescription.medicines[i].name +
      "</td>" +
      "<td>" +
      prescription.medicines[i].dosage +
      "</td>" +
      "<td>" +
      prescription.medicines[i].frequency +
      "</td>" +
      "<td>" +
      prescription.medicines[i].duration +
      "</td>" +
      "<td>" +
      prescription.medicines[i].instruction +
      "</td>" +
      "</tr>";
  }

  const printWindow = window.open("", "_blank");

  if (printWindow === null) {
    alert("Please allow pop-ups to print prescriptions.");

    return;
  }

  printWindow.document.write(
    "<html><head><title>Prescription</title>" +
      "<style>" +
      "body{font-family:Arial;padding:30px;color:#263957;}" +
      "h1{text-align:center;color:#176b87;}" +
      "table{width:100%;border-collapse:collapse;margin-top:20px;}" +
      "th,td{border:1px solid #ddd;padding:10px;text-align:left;}" +
      ".section{margin-top:25px;}" +
      "</style></head><body>" +
      "<h1>HEARTCARE CLINIC</h1>" +
      "<p>123 Medical Road, Dhaka, Bangladesh</p>" +
      "<hr>" +
      "<h2>Prescription</h2>" +
      "<p>Prescription ID: " +
      prescription.prescriptionId +
      "</p>" +
      "<p>Date: " +
      prescription.prescriptionDate +
      "</p>" +
      "<p>Patient Name: " +
      prescription.patientName +
      "</p>" +
      "<p>Patient ID: " +
      prescription.patientId +
      "</p>" +
      "<p>Age: " +
      prescription.age +
      "</p>" +
      "<p>Gender: " +
      prescription.gender +
      "</p>" +
      "<p>Blood Group: " +
      prescription.bloodGroup +
      "</p>" +
      "<p>Phone: " +
      prescription.phone +
      "</p>" +
      "<div class='section'><h3>Diagnosis</h3>" +
      "<p>" +
      prescription.diagnosis +
      "</p></div>" +
      "<div class='section'><h3>Medicine Details</h3>" +
      "<table><tr><th>#</th><th>Medicine</th><th>Dosage</th>" +
      "<th>Frequency</th><th>Duration</th><th>Instructions</th></tr>" +
      medicineText +
      "</table></div>" +
      "<div class='section'><h3>Doctor's Advice</h3>" +
      "<p>" +
      prescription.advice +
      "</p></div>" +
      "<div class='section'><h3>Follow-up Instructions</h3>" +
      "<p>" +
      prescription.followupInstructions +
      "</p></div>" +
      "<br><br><p>Doctor's Signature: Dr. Badhon Pal</p>" +
      "</body></html>",
  );

  printWindow.document.close();

  printWindow.print();
}

// Function to reset prescription form
function resetPrescriptionForm() {
  document.getElementById("prescriptionForm").reset();

  clearPrescriptionErrors();

  prescriptionEditIndex = -1;

  document.getElementById("prescriptionId").value = generatePrescriptionId();

  loadPrescriptionDate();
}

// Function to initialize prescription page events
function initializePrescriptionPage() {
  document.getElementById("prescriptionForm").onsubmit = savePrescription;

  document.getElementById("prescriptionSearch").onkeyup = searchPrescriptions;

  document.getElementById("prescriptionClear").onclick = resetPrescriptionForm;

  loadPrescriptionDate();

  document.getElementById("prescriptionId").value = generatePrescriptionId();

  renderPrescriptionList();
}

// Initialize page
initializePrescriptionPage();
