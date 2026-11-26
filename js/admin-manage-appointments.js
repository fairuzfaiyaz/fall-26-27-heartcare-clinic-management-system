// admin-manage-appointments.js
// Read / search / filter / correct (update) / cancel for manage-appointments.php
// Needs (loaded before this file):
//   admin-manage-appointments-data.js -> appointments, monthNames
//   common.js                         -> showToday, containsText, showError, clearErrors

// -1 = nothing selected, 0,1,2... = the appointment being corrected
let editIndex = -1;

const apFields = ["ap_date", "ap_time"];

// Today as "YYYY-MM-DD"
function todayString() {
  return new Date().toISOString().split("T")[0];
}

// "2026-10-31" -> "31 Oct 2026"
function formatDate(text) {
  let year = text.slice(0, 4);
  let monthIndex = Number(text.slice(5, 7)) - 1;
  let day = text.slice(8, 10);
  return day + " " + monthNames[monthIndex] + " " + year;
}

// "14:00" -> "02:00 PM"
function formatTime(text) {
  let hour = Number(text.slice(0, 2));
  let minutes = text.slice(3, 5);
  let suffix = hour >= 12 ? "PM" : "AM";
  let hour12 = hour % 12;
  if (hour12 === 0) {
    hour12 = 12;
  }
  let hourText = hour12 < 10 ? "0" + hour12 : "" + hour12;
  return hourText + ":" + minutes + " " + suffix;
}

// Badge colour for a status (switch)
function statusClass(status) {
  switch (status) {
    case "Confirmed":
      return "adm-badge--ok";
    case "Pending":
      return "adm-badge--wait";
    case "Completed":
      return "adm-badge--done";
    case "Cancelled":
      return "adm-badge--bad";
    default:
      return "";
  }
}

// Which department a doctor belongs to (switch)
function departmentOf(doctor) {
  switch (doctor) {
    case "Dr. Rahman":
      return "Cardiology";
    case "Dr. Sultana":
      return "Preventive Care";
    case "Dr. Chowdhury":
      return "General Medicine";
    default:
      return "";
  }
}

// READ + SEARCH + 4 FILTERS
function renderAppointments() {
  let search = document.getElementById("search-box").value;
  let dateFilter = document.getElementById("date-filter").value;
  let doctorFilter = document.getElementById("doctor-filter").value;
  let deptFilter = document.getElementById("dept-filter").value;
  let statusFilter = document.getElementById("status-filter").value;
  let rows = "";
  let count = 0;

  for (let i = 0; i < appointments.length; i++) {
    let a = appointments[i];

    let matchesSearch =
      containsText(a.patient, search) || containsText("#" + a.id, search);
    let matchesDate = dateFilter === "" || a.date === dateFilter;
    let matchesDoctor = doctorFilter === "All" || a.doctor === doctorFilter;
    let matchesDept = deptFilter === "All" || a.department === deptFilter;
    let matchesStatus = statusFilter === "All" || a.status === statusFilter;

    if (
      matchesSearch &&
      matchesDate &&
      matchesDoctor &&
      matchesDept &&
      matchesStatus
    ) {
      // Only Pending / Confirmed appointments can be corrected or cancelled
      let buttons = "";
      if (a.status === "Pending" || a.status === "Confirmed") {
        buttons =
          '<button type="button" class="adm-act" onclick="editAppointment(' +
          i +
          ')">Correct</button>' +
          '<button type="button" class="adm-act adm-act--danger" onclick="cancelAppointment(' +
          i +
          ')">Cancel</button>';
      } else {
        buttons =
          '<button type="button" class="adm-act" onclick="viewAppointment(' +
          i +
          ')">View</button>';
      }

      rows +=
        "<tr>" +
        "<td>#" +
        a.id +
        "</td>" +
        "<td>" +
        formatDate(a.date) +
        ", " +
        formatTime(a.time) +
        "</td>" +
        "<td>" +
        a.patient +
        "</td>" +
        "<td>" +
        a.doctor +
        "</td>" +
        "<td>" +
        a.department +
        "</td>" +
        '<td><span class="adm-badge ' +
        statusClass(a.status) +
        '">' +
        a.status +
        "</span></td>" +
        '<td><div class="adm-actions">' +
        buttons +
        "</div></td>" +
        "</tr>";
      count++;
    }
  }

  if (count === 0) {
    rows = '<tr><td colspan="7">No appointments found.</td></tr>';
  }

  document.getElementById("appointment-rows").innerHTML = rows;
  document.getElementById("row-count").innerHTML =
    "Showing " + count + " of " + appointments.length;
  console.log(appointments); // for checking the array while testing
}

// true if this doctor already has another live appointment at that date and time
function hasConflict(doctor, date, time) {
  for (let i = 0; i < appointments.length; i++) {
    let a = appointments[i];
    if (
      i !== editIndex &&
      a.doctor === doctor &&
      a.date === date &&
      a.time === time &&
      a.status !== "Cancelled"
    ) {
      return true;
    }
  }
  return false;
}

// UPDATE (onsubmit="return saveAppointment()")
function saveAppointment() {
  if (editIndex === -1) {
    alert("Click Correct on an appointment first.");
    return false;
  }

  clearErrors(apFields);

  let doctor = document.getElementById("ap_doctor").value;
  let date = document.getElementById("ap_date").value;
  let time = document.getElementById("ap_time").value;
  let status = document.getElementById("ap_status").value;
  let ok = true;
  let dateOk = true;
  let timeOk = true;

  // Date: required and not in the past
  if (date === "") {
    showError("ap_date", "Date is required.");
    ok = false;
    dateOk = false;
  } else if (date < todayString()) {
    showError("ap_date", "Date cannot be in the past.");
    ok = false;
    dateOk = false;
  }

  // Time: required and inside clinic hours (09:00 - 17:00)
  if (time === "") {
    showError("ap_time", "Time is required.");
    ok = false;
    timeOk = false;
  } else if (time < "09:00" || time > "17:00") {
    showError("ap_time", "Clinic hours are 09:00 AM to 05:00 PM.");
    ok = false;
    timeOk = false;
  }

  // The doctor must be free at that date and time
  if (dateOk && timeOk && hasConflict(doctor, date, time)) {
    showError("ap_time", doctor + " already has an appointment at this time.");
    ok = false;
  }

  if (ok === false) {
    return false; // stop, the red messages are on the screen
  }

  // change the properties of the existing object
  appointments[editIndex].doctor = doctor;
  appointments[editIndex].department = departmentOf(doctor);
  appointments[editIndex].date = date;
  appointments[editIndex].time = time;
  appointments[editIndex].status = status;

  alert("Appointment #" + appointments[editIndex].id + " was corrected.");
  clearForm();
  renderAppointments();
  return false; // no backend yet, stay on the page
}

// Correct button: copy the object into the form
function editAppointment(index) {
  let a = appointments[index];
  editIndex = index;

  clearErrors(apFields);
  document.getElementById("ap_id").value = "#" + a.id;
  document.getElementById("ap_patient").value = a.patient;
  document.getElementById("ap_doctor").value = a.doctor;
  document.getElementById("ap_dept").value = a.department;
  document.getElementById("ap_date").value = a.date;
  document.getElementById("ap_time").value = a.time;
  document.getElementById("ap_status").value = a.status;
}

// Runs when the doctor dropdown changes: show that doctor's department
function showDepartment() {
  let doctor = document.getElementById("ap_doctor").value;
  document.getElementById("ap_dept").value = departmentOf(doctor);
}

// "Delete" = Cancel (the row stays, so history is kept)
function cancelAppointment(index) {
  let a = appointments[index];
  if (confirm("Cancel appointment #" + a.id + " for " + a.patient + "?")) {
    a.status = "Cancelled";
    if (editIndex === index) {
      clearForm();
    }
    renderAppointments();
  }
}

// View button (Completed / Cancelled): show the details in an alert
function viewAppointment(index) {
  let a = appointments[index];
  alert(
    "Appointment #" +
      a.id +
      "\n" +
      "Patient: " +
      a.patient +
      "\n" +
      "Doctor: " +
      a.doctor +
      " (" +
      a.department +
      ")\n" +
      "When: " +
      formatDate(a.date) +
      ", " +
      formatTime(a.time) +
      "\n" +
      "Status: " +
      a.status,
  );
}

// Clear button / after saving
function clearForm() {
  editIndex = -1;
  clearErrors(apFields);
  document.getElementById("ap_id").value = "";
  document.getElementById("ap_patient").value = "";
  document.getElementById("ap_doctor").value = "Dr. Rahman";
  document.getElementById("ap_dept").value = "";
  document.getElementById("ap_date").value = "";
  document.getElementById("ap_time").value = "";
  document.getElementById("ap_status").value = "Pending";
}

// Run when the page loads
renderAppointments();
showToday();
