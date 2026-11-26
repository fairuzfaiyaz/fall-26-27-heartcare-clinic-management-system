/*
    File: doctor-appointments.js
    Purpose: Manage doctor appointments,
    search, filter, update status and render summary.
*/

// Function to calculate and display appointment statistics
function renderAppointmentStats() {
  let totalAppointments = doctorAppointments.length;

  let pendingAppointments = 0;

  let completedAppointments = 0;

  for (let i = 0; i < doctorAppointments.length; i++) {
    const appointment = doctorAppointments[i];

    if (
      appointment.status === "Pending" ||
      appointment.status === "Confirmed"
    ) {
      pendingAppointments++;
    }

    if (appointment.status === "Completed") {
      completedAppointments++;
    }
  }

  document.getElementById("totalAppointments").innerHTML =
    totalAppointments < 10 ? "0" + totalAppointments : totalAppointments;

  document.getElementById("pendingAppointments").innerHTML =
    pendingAppointments < 10 ? "0" + pendingAppointments : pendingAppointments;

  document.getElementById("completedAppointments").innerHTML =
    completedAppointments < 10
      ? "0" + completedAppointments
      : completedAppointments;

  console.log("Total Appointments:", totalAppointments);
  console.log("Pending Appointments:", pendingAppointments);
  console.log("Completed Appointments:", completedAppointments);
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

// Function to get appointment status CSS class
function getAppointmentStatusClass(status) {
  switch (status) {
    case "Confirmed":
      return "confirmed";

    case "Pending":
      return "pending";

    case "Completed":
      return "completed";

    default:
      return "pending";
  }
}

// Function to display appointment action buttons
function getAppointmentAction(index) {
  const status = doctorAppointments[index].status;

  if (status === "Pending") {
    return (
      '<button type="button" class="appointment-action confirm-action" onclick="updateAppointmentStatus(' +
      index +
      ", 'Confirmed')\">Confirm</button>"
    );
  }

  if (status === "Confirmed") {
    return (
      '<button type="button" class="appointment-action complete-action" onclick="updateAppointmentStatus(' +
      index +
      ", 'Completed')\">Complete</button>"
    );
  }

  return '<span class="completed-label">Done</span>';
}

// Function to display and search appointment records
function renderAppointments() {
  console.log("Appointment Records:", doctorAppointments);

  const tableBody = document.getElementById("appointmentTable");

  const searchInput = document.getElementById("appointmentSearch");

  const statusFilter = document.getElementById("statusFilter");

  const searchText = searchInput.value.trim();

  const selectedStatus = statusFilter.value;

  let output = "";

  let count = 0;

  for (let i = 0; i < doctorAppointments.length; i++) {
    const appointment = doctorAppointments[i];

    const nameMatch = containsText(appointment.patientName, searchText);

    const idMatch = containsText(appointment.patientId, searchText);

    let statusMatch = false;

    if (selectedStatus === "All") {
      statusMatch = true;
    } else if (appointment.status === selectedStatus) {
      statusMatch = true;
    }

    if ((nameMatch || idMatch) && statusMatch) {
      const statusClass = getAppointmentStatusClass(appointment.status);

      const actionButton = getAppointmentAction(i);

      output +=
        "<tr>" +
        "<td><strong>" +
        appointment.patientName +
        "</strong></td>" +
        "<td>" +
        appointment.patientId +
        "</td>" +
        "<td>" +
        appointment.date +
        "</td>" +
        "<td>" +
        appointment.time +
        "</td>" +
        "<td>" +
        appointment.reason +
        "</td>" +
        "<td>" +
        '<span class="appointment-status ' +
        statusClass +
        '">' +
        appointment.status +
        "</span>" +
        "</td>" +
        "<td>" +
        '<a href="consultation.php" class="view-link">' +
        "View" +
        "</a>" +
        actionButton +
        "</td>" +
        "</tr>";

      count++;
    }
  }

  if (count === 0) {
    output = "<tr>" + '<td colspan="7">No appointments found.</td>' + "</tr>";
  }

  tableBody.innerHTML = output;
}

// Function to update appointment status
function updateAppointmentStatus(index, newStatus) {
  if (index >= 0 && index < doctorAppointments.length) {
    doctorAppointments[index].status = newStatus;

    console.log("Updated Appointment:", doctorAppointments[index]);

    renderAppointments();

    renderAppointmentStats();

    alert("Appointment status updated to " + newStatus + "!");
  }
}

// Function to initialize appointment events
function initializeAppointmentEvents() {
  const searchInput = document.getElementById("appointmentSearch");

  const statusFilter = document.getElementById("statusFilter");

  searchInput.onkeyup = renderAppointments;

  statusFilter.onchange = renderAppointments;
}

// Function to initialize the appointment page
function initializeAppointments() {
  renderAppointmentStats();

  renderAppointments();

  initializeAppointmentEvents();
}

// Load appointment page
initializeAppointments();
