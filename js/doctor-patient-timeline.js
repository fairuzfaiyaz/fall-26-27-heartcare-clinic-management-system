/* =====================================
   PATIENT TIMELINE JAVASCRIPT
===================================== */

/* =====================================
   FIND PATIENT
===================================== */

/* Find a patient using patient ID */

function findPatient(patientId) {
  for (let i = 0; i < patients.length; i++) {
    if (patients[i].id === patientId) {
      return patients[i];
    }
  }

  return null;
}

/* =====================================
   RENDER PATIENT PROFILE
===================================== */

/* Display selected patient information */

function renderPatient(patient) {
  if (patient === null) {
    return;
  }

  document.getElementById("patient-name").innerHTML = patient.name;

  document.getElementById("patient-id").innerHTML = "Patient ID: " + patient.id;

  document.getElementById("patient-avatar").innerHTML = patient.name.substring(
    0,
    1,
  );

  document.getElementById("patient-age").innerHTML = patient.age + " Years";

  document.getElementById("patient-gender").innerHTML = patient.gender;

  document.getElementById("patient-blood").innerHTML = patient.bloodGroup;

  document.getElementById("patient-phone").innerHTML = patient.phone;

  document.getElementById("patient-department").innerHTML = patient.department;

  document.getElementById("patient-first-visit").innerHTML = patient.firstVisit;

  document.getElementById("patient-bp").innerHTML = patient.bloodPressure;

  document.getElementById("patient-heart-rate").innerHTML = patient.heartRate;

  document.getElementById("patient-temperature").innerHTML =
    patient.temperature;

  document.getElementById("patient-weight").innerHTML = patient.weight;
}

/* =====================================
   SEARCH PATIENT
===================================== */

/* Search patient by ID or name */

function searchPatient() {
  let searchValue = document
    .getElementById("patient_search")
    .value.trim()
    .toLowerCase();

  let error = document.getElementById("patient_search-error");

  error.innerHTML = "";

  if (searchValue === "") {
    error.innerHTML = "Patient ID or Name is required.";

    return false;
  }

  let foundPatient = null;

  for (let i = 0; i < patients.length; i++) {
    let patientName = patients[i].name.toLowerCase();

    let patientId = patients[i].id.toLowerCase();

    if (
      patientName.indexOf(searchValue) !== -1 ||
      patientId.indexOf(searchValue) !== -1
    ) {
      foundPatient = patients[i];

      break;
    }
  }

  if (foundPatient === null) {
    error.innerHTML = "Patient not found.";

    return false;
  }

  selectedPatientId = foundPatient.id;

  renderPatient(foundPatient);

  currentFilter = "All";

  document.getElementById("record-search").value = "";

  resetFilterButtons();

  renderTimeline();

  return false;
}

/* =====================================
   RENDER TIMELINE
===================================== */

/* Display medical history of selected patient */

function renderTimeline() {
  let container = document.getElementById("timeline-container");

  container.innerHTML = "";

  let count = 0;

  let searchText = document.getElementById("record-search").value.toLowerCase();

  console.log(timelineRecords);

  for (let i = 0; i < timelineRecords.length; i++) {
    let record = timelineRecords[i];

    if (record.patientId === selectedPatientId) {
      let typeMatch = false;

      if (currentFilter === "All" || record.type === currentFilter) {
        typeMatch = true;
      }

      let textMatch = false;

      if (
        record.title.toLowerCase().indexOf(searchText) !== -1 ||
        record.details.toLowerCase().indexOf(searchText) !== -1 ||
        record.type.toLowerCase().indexOf(searchText) !== -1
      ) {
        textMatch = true;
      }

      if (typeMatch && textMatch) {
        count++;

        let marker = "+";

        let markerClass = "consultation-marker";

        let typeClass = "consultation-type";

        if (record.type === "Prescription") {
          marker = "Rx";

          markerClass = "prescription-marker";

          typeClass = "prescription-type";
        } else if (record.type === "Laboratory") {
          marker = "L";

          markerClass = "lab-marker";

          typeClass = "laboratory-type";
        }

        let statusClass = "completed-status";

        if (record.status === "Pending") {
          statusClass = "pending-status";
        } else if (record.status === "Processing") {
          statusClass = "processing-status";
        } else if (record.status === "Issued") {
          statusClass = "active-status";
        }

        let html = "";

        html += '<article class="timeline-item">';

        html += '<div class="timeline-marker ' + markerClass + '">';

        html += marker;

        html += "</div>";

        html += '<div class="timeline-content">';

        html += '<div class="timeline-date">';

        html += record.date;

        html += "</div>";

        html += '<div class="timeline-card">';

        html += '<div class="record-heading">';

        html += "<div>";

        html += '<span class="record-type ' + typeClass + '">';

        html += record.type.toUpperCase();

        html += "</span>";

        html += "<h3>" + record.title + "</h3>";

        html += "</div>";

        html += '<span class="record-status ' + statusClass + '">';

        html += record.status;

        html += "</span>";

        html += "</div>";

        html += '<div class="record-information">';

        html += "<p><strong>Doctor:</strong> ";

        html += record.doctor;

        html += "</p>";

        html += "<p><strong>Details:</strong> ";

        html += record.details;

        html += "</p>";

        html += "</div>";

        html += '<div class="timeline-record-actions">';

        html +=
          '<button type="button" onclick="editRecord(' + i + ')">Edit</button>';

        html +=
          '<button type="button" onclick="deleteRecord(' +
          i +
          ')">Delete</button>';

        html += "</div>";

        html += "</div>";

        html += "</div>";

        html += "</article>";

        container.innerHTML += html;
      }
    }
  }

  document.getElementById("timeline-count").innerHTML = count + " Records";

  if (count === 0) {
    container.innerHTML =
      "<p class='empty-record'>No medical records found.</p>";
  }
}

/* =====================================
   FILTER RECORDS
===================================== */

/* Filter timeline by record category */

function filterRecords(type, clickedButton) {
  currentFilter = type;

  let buttons = document
    .getElementsByClassName("timeline-filter")[0]
    .getElementsByTagName("button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("filter-active");
  }

  clickedButton.classList.add("filter-active");

  renderTimeline();
}

/* Reset active filter button */

function resetFilterButtons() {
  let buttons = document
    .getElementsByClassName("timeline-filter")[0]
    .getElementsByTagName("button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("filter-active");

    if (i === 0) {
      buttons[i].classList.add("filter-active");
    }
  }
}

/* =====================================
   FORM VALIDATION
===================================== */

/* Validate medical record form */

function validateRecordForm() {
  let type = document.getElementById("record_type").value;

  let title = document.getElementById("record_title").value.trim();

  let date = document.getElementById("record_date").value;

  let status = document.getElementById("record_status").value;

  let details = document.getElementById("record_details").value.trim();

  let valid = true;

  document.getElementById("record_type-error").innerHTML = "";

  document.getElementById("record_title-error").innerHTML = "";

  document.getElementById("record_date-error").innerHTML = "";

  document.getElementById("record_status-error").innerHTML = "";

  document.getElementById("record_details-error").innerHTML = "";

  if (type === "") {
    document.getElementById("record_type-error").innerHTML =
      "Record type is required.";

    valid = false;
  }

  if (title === "") {
    document.getElementById("record_title-error").innerHTML =
      "Record title is required.";

    valid = false;
  }

  if (date === "") {
    document.getElementById("record_date-error").innerHTML =
      "Record date is required.";

    valid = false;
  }

  if (status === "") {
    document.getElementById("record_status-error").innerHTML =
      "Record status is required.";

    valid = false;
  }

  if (details === "") {
    document.getElementById("record_details-error").innerHTML =
      "Record details are required.";

    valid = false;
  }

  return valid;
}

/* =====================================
   CREATE / UPDATE RECORD
===================================== */

/* Save new record or update existing record */

function saveRecord() {
  if (validateRecordForm() === false) {
    return false;
  }

  let type = document.getElementById("record_type").value;

  let title = document.getElementById("record_title").value.trim();

  let date = document.getElementById("record_date").value;

  let status = document.getElementById("record_status").value;

  let details = document.getElementById("record_details").value.trim();

  if (editIndex === -1) {
    let newRecord = {
      id: "REC-" + nextRecordNumber,

      patientId: selectedPatientId,

      type: type,

      title: title,

      date: date,

      doctor: "Dr. Badhon Pal",

      status: status,

      details: details,
    };

    timelineRecords.push(newRecord);

    nextRecordNumber++;

    alert("Medical record added successfully.");
  } else {
    timelineRecords[editIndex].type = type;

    timelineRecords[editIndex].title = title;

    timelineRecords[editIndex].date = date;

    timelineRecords[editIndex].status = status;

    timelineRecords[editIndex].details = details;

    editIndex = -1;

    document.getElementById("form-heading").innerHTML = "Add Medical Record";

    document.getElementById("save-record-btn").innerHTML = "+ Save Record";

    document.getElementById("cancel-edit-btn").style.display = "none";

    alert("Medical record updated successfully.");
  }

  document.getElementById("record-form").reset();

  renderTimeline();

  return false;
}

/* =====================================
   EDIT RECORD
===================================== */

/* Copy existing record into the form */

function editRecord(index) {
  editIndex = index;

  let record = timelineRecords[index];

  document.getElementById("record_type").value = record.type;

  document.getElementById("record_title").value = record.title;

  document.getElementById("record_date").value = record.date;

  document.getElementById("record_status").value = record.status;

  document.getElementById("record_details").value = record.details;

  document.getElementById("form-heading").innerHTML = "Edit Medical Record";

  document.getElementById("save-record-btn").innerHTML = "Update Record";

  document.getElementById("cancel-edit-btn").style.display = "inline-block";

  document.getElementById("record_title").focus();
}

/* =====================================
   CANCEL EDIT
===================================== */

/* Cancel editing and reset the form */

function cancelEdit() {
  editIndex = -1;

  document.getElementById("record-form").reset();

  document.getElementById("form-heading").innerHTML = "Add Medical Record";

  document.getElementById("save-record-btn").innerHTML = "+ Save Record";

  document.getElementById("cancel-edit-btn").style.display = "none";

  clearErrors();
}

/* =====================================
   DELETE RECORD
===================================== */

/* Delete selected medical record */

function deleteRecord(index) {
  let confirmation = confirm(
    "Are you sure you want to delete this medical record?",
  );

  if (confirmation === true) {
    timelineRecords = timelineRecords
      .slice(0, index)
      .concat(timelineRecords.slice(index + 1));

    if (editIndex === index) {
      cancelEdit();
    } else if (editIndex > index) {
      editIndex--;
    }

    renderTimeline();

    alert("Medical record deleted successfully.");
  }
}

/* =====================================
   CLEAR FORM ERRORS
===================================== */

/* Remove all validation error messages */

function clearErrors() {
  document.getElementById("record_type-error").innerHTML = "";

  document.getElementById("record_title-error").innerHTML = "";

  document.getElementById("record_date-error").innerHTML = "";

  document.getElementById("record_status-error").innerHTML = "";

  document.getElementById("record_details-error").innerHTML = "";
}

/* =====================================
   INITIALIZE PAGE
===================================== */

/* Load default patient and medical records */

function initializeTimeline() {
  let patient = findPatient(selectedPatientId);

  renderPatient(patient);

  renderTimeline();
}

/* =====================================
   EVENT LISTENERS
===================================== */

document
  .getElementById("patient-search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    searchPatient();
  });

document
  .getElementById("record-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    saveRecord();
  });

document.getElementById("record-search").addEventListener("keyup", function () {
  renderTimeline();
});

document.getElementById("record-form").addEventListener("reset", function () {
  editIndex = -1;

  document.getElementById("form-heading").innerHTML = "Add Medical Record";

  document.getElementById("save-record-btn").innerHTML = "+ Save Record";

  document.getElementById("cancel-edit-btn").style.display = "none";

  clearErrors();
});

/* Initialize the page */

initializeTimeline();
