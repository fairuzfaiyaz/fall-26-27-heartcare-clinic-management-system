/*
    File: doctor-dashboard.js
    Purpose: Handle Doctor Dashboard functionality.
*/

// Function to display dashboard statistics
function renderDashboardStats() {
  document.getElementById("totalAppointments").innerHTML =
    doctorDashboardStats.totalAppointments;

  document.getElementById("pendingPatients").innerHTML =
    doctorDashboardStats.pendingPatients;

  document.getElementById("completedConsultations").innerHTML =
    doctorDashboardStats.completedConsultations;

  document.getElementById("prescriptionsIssued").innerHTML =
    doctorDashboardStats.prescriptionsIssued;
}

// Function to get today's month and date
function getTodayDate() {
  const today = new Date();

  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return {
    month: monthNames[today.getMonth()],
    day: today.getDate(),
  };
}

// Function to get appointment status CSS class
function getStatusClass(status) {
  switch (status) {
    case "Confirmed":
      return "status-badge--confirmed";

    case "Waiting":
      return "status-badge--pending";

    case "Completed":
      return "status-badge--completed";

    default:
      return "status-badge--pending";
  }
}

// Function to display today's appointments
function renderTodayAppointments() {
  console.log("Doctor Appointments:", doctorAppointments);

  const container = document.getElementById("todayAppointments");

  const today = getTodayDate();

  let output = "";
  let count = 0;

  for (let i = 0; i < doctorAppointments.length; i++) {
    const appointment = doctorAppointments[i];

    if (appointment.date === "TODAY") {
      const statusClass = getStatusClass(appointment.status);

      output +=
        '<article class="appointment-item">' +
        '<div class="appointment-date">' +
        "<span>" +
        today.month +
        "</span>" +
        "<strong>" +
        today.day +
        "</strong>" +
        "</div>" +
        '<div class="appointment-details">' +
        "<h3>" +
        appointment.patientName +
        "</h3>" +
        "<p>Patient ID: " +
        appointment.patientId +
        " · " +
        appointment.appointmentType +
        "</p>" +
        '<span class="appointment-time">' +
        "◷ " +
        appointment.startTime +
        " – " +
        appointment.endTime +
        "</span>" +
        "</div>" +
        '<span class="status-badge ' +
        statusClass +
        '">' +
        appointment.status +
        "</span>" +
        "</article>";

      count++;
    }
  }

  if (count === 0) {
    output = "<p>No appointments scheduled for today.</p>";
  }

  container.innerHTML = output;
}

// Function to check whether search text exists
function containsText(value, searchText) {
  value = value.toLowerCase();

  searchText = searchText.toLowerCase();

  if (value.indexOf(searchText) !== -1) {
    return true;
  }

  return false;
}

// Function to display and search patient queue
function renderPatientQueue() {
  console.log("Patient Queue:", doctorAppointments);

  const tableBody = document.getElementById("patientQueue");

  const searchInput = document.getElementById("patientSearch");

  const searchText = searchInput.value.trim();

  let output = "";
  let count = 0;

  for (let i = 0; i < doctorAppointments.length; i++) {
    const appointment = doctorAppointments[i];

    const nameMatch = containsText(appointment.patientName, searchText);

    const idMatch = containsText(appointment.patientId, searchText);

    if (nameMatch || idMatch) {
      const statusClass = getStatusClass(appointment.status);

      output +=
        "<tr>" +
        "<td><strong>" +
        appointment.patientName +
        "</strong></td>" +
        "<td>" +
        appointment.patientId +
        "</td>" +
        "<td>" +
        appointment.startTime +
        "</td>" +
        "<td>" +
        '<span class="status-badge ' +
        statusClass +
        '">' +
        appointment.status +
        "</span>" +
        "</td>" +
        "<td>" +
        '<a class="table-link" href="consultation.html">' +
        "Open" +
        "</a>" +
        "</td>" +
        "</tr>";

      count++;
    }
  }

  if (count === 0) {
    output = "<tr>" + '<td colspan="5">No patients found.</td>' + "</tr>";
  }

  tableBody.innerHTML = output;
}

// Function to initialize the dashboard
function renderDoctorDashboard() {
  renderDashboardStats();

  renderTodayAppointments();

  renderPatientQueue();
}

// Function to initialize dashboard search event
function initializeDashboardEvents() {
  const searchInput = document.getElementById("patientSearch");

  searchInput.addEventListener("keyup", renderPatientQueue);
}

// Load dashboard after HTML elements are available
renderDoctorDashboard();

initializeDashboardEvents();
