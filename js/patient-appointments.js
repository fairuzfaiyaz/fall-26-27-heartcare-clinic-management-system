// patient-appointments.js
// My Appointments: Read (tabs), Update (reschedule), Delete (cancel).
// Needs (loaded before this file):
//   patient-account-data.js      -> patient
//   patient-appointments-data.js -> myAppointments, appointmentTabs
//   patient-common.js            -> pad2, formatDate, formatTime, shortMonths,
//                                   todayString, showError, clearErrors,
//                                   showPatientHeader

const rescheduleFields = ["rs_date", "rs_time"];

// The tab that is open now, and the appointment being rescheduled (-1 = none)
let currentTab = "upcoming";
let editIndex = -1;

// Which tab an appointment belongs to (switch)
function groupOf(status) {
  switch (status) {
    case "Confirmed":
    case "Pending":
      return "upcoming";
    case "Completed":
      return "past";
    case "Cancelled":
      return "cancelled";
    default:
      return "";
  }
}

// Badge colour class for a status (switch)
function badgeClass(status) {
  switch (status) {
    case "Confirmed":
      return "status-badge--confirmed";
    case "Pending":
      return "status-badge--pending";
    case "Completed":
      return "status-badge--done";
    case "Cancelled":
      return "status-badge--unpaid";
    default:
      return "";
  }
}

// How many appointments are in one tab
function countGroup(group) {
  let count = 0;
  for (let i = 0; i < myAppointments.length; i++) {
    if (groupOf(myAppointments[i].status) === group) {
      count++;
    }
  }
  return count;
}

// "10:30" -> "11:00" (every appointment lasts 30 minutes)
function endTime(start) {
  let total = Number(start.slice(0, 2)) * 60 + Number(start.slice(3, 5)) + 30;
  return pad2(Math.floor(total / 60)) + ":" + pad2(total % 60);
}

// 1. The tab buttons with their counts, e.g. "Upcoming (2)"
function renderTabs() {
  let html = "";

  for (let i = 0; i < appointmentTabs.length; i++) {
    let t = appointmentTabs[i];
    let extra = t.key === currentTab ? " is-active" : "";
    html +=
      '<button type="button" class="pp-tab' +
      extra +
      '" onclick="showTab(\'' +
      t.key +
      "')\">" +
      t.label +
      " (" +
      countGroup(t.key) +
      ")</button>";
  }

  document.getElementById("tab-bar").innerHTML = html;
}

// 2. READ: draw the appointments of the open tab
function renderAppointments() {
  let html = "";
  let count = 0;

  for (let i = 0; i < myAppointments.length; i++) {
    let a = myAppointments[i];

    if (groupOf(a.status) === currentTab) {
      // the buttons depend on the tab (switch)
      let buttons = "";
      switch (currentTab) {
        case "upcoming":
          buttons =
            '<button type="button" class="pp-act" onclick="editAppointment(' +
            i +
            ')">Reschedule</button>' +
            '<button type="button" class="pp-act pp-act--danger" onclick="cancelAppointment(' +
            i +
            ')">Cancel</button>';
          break;
        case "past":
          buttons =
            '<a href="medical-records.html" class="pp-act">View record</a>';
          break;
        default:
          buttons = "";
      }

      html +=
        '<article class="appointment-item">' +
        '<div class="appointment-date">' +
        "<span> " +
        shortMonths[Number(a.date.slice(5, 7)) - 1].toUpperCase() +
        " </span>" +
        "<strong>" +
        a.date.slice(8, 10) +
        "</strong>" +
        "</div>" +
        '<div class="appointment-details">' +
        "<h3>" +
        a.doctor +
        "</h3>" +
        "<p>" +
        a.department +
        "</p>" +
        '<span class="appointment-time">◷ ' +
        formatTime(a.start) +
        " – " +
        formatTime(a.end) +
        "</span>" +
        "</div>" +
        '<span class="status-badge ' +
        badgeClass(a.status) +
        '">' +
        a.status +
        "</span>" +
        '<div class="pp-actions">' +
        buttons +
        "</div>" +
        "</article>";
      count++;
    }
  }

  document.getElementById("appt-list").innerHTML = html;
  // show the "empty" message only when the tab has no appointments
  document.getElementById("appt-empty").style.display =
    count === 0 ? "block" : "none";
  renderTabs();
  console.log(myAppointments); // for checking the array while testing
}

// A tab button was clicked
function showTab(group) {
  currentTab = group;
  renderAppointments();
}

// 3. DELETE (soft): cancel an upcoming appointment, the row stays in the array
function cancelAppointment(index) {
  if (confirm("Cancel this appointment?")) {
    myAppointments[index].status = "Cancelled";
    if (editIndex === index) {
      hideReschedule();
    }
    renderAppointments();
  }
}

// 4. UPDATE: Reschedule button copies the appointment into the form
function editAppointment(index) {
  let a = myAppointments[index];
  editIndex = index;

  clearErrors(rescheduleFields);
  document.getElementById("rs_info").innerHTML =
    a.doctor +
    " · " +
    a.department +
    " · now " +
    formatDate(a.date) +
    ", " +
    formatTime(a.start);
  document.getElementById("rs_date").value = a.date;
  document.getElementById("rs_time").value = a.start;
  document.getElementById("reschedule-panel").style.display = "block";
}

// Hide the reschedule form
function hideReschedule() {
  editIndex = -1;
  clearErrors(rescheduleFields);
  document.getElementById("reschedule-panel").style.display = "none";
}

// true if this doctor has ANOTHER live appointment at that date and time
function hasConflict(doctor, dateValue, time) {
  for (let i = 0; i < myAppointments.length; i++) {
    let a = myAppointments[i];
    if (
      i !== editIndex &&
      a.doctor === doctor &&
      a.date === dateValue &&
      a.start === time &&
      a.status !== "Cancelled"
    ) {
      return true;
    }
  }
  return false;
}

// Save button (onsubmit="return saveReschedule()")
function saveReschedule() {
  clearErrors(rescheduleFields);

  let a = myAppointments[editIndex];
  let dateValue = document.getElementById("rs_date").value;
  let time = document.getElementById("rs_time").value;
  let ok = true;

  if (dateValue === "") {
    showError("rs_date", "Please pick a new date.");
    ok = false;
  } else if (dateValue < todayString()) {
    showError("rs_date", "The date cannot be in the past.");
    ok = false;
  }

  if (time === "") {
    showError("rs_time", "Please select a new time.");
    ok = false;
  }

  if (ok === false) {
    return false; // stop, the red messages are on the screen
  }

  if (dateValue === a.date && time === a.start) {
    showError(
      "rs_time",
      "This is already your appointment time. Choose a different one.",
    );
    return false;
  }

  if (hasConflict(a.doctor, dateValue, time)) {
    showError(
      "rs_time",
      a.doctor + " is not free at this time. Choose another time.",
    );
    return false;
  }

  // change the properties of the existing object
  a.date = dateValue;
  a.start = time;
  a.end = endTime(time);

  alert(
    "Appointment rescheduled to " +
      formatDate(dateValue) +
      ", " +
      formatTime(time) +
      ".",
  );
  hideReschedule();
  renderAppointments();
  return false; // no backend yet, stay on the page
}

// Fill the time drop-down: 09:00, 09:30 ... 16:30 (two loops)
function fillTimes() {
  let select = document.getElementById("rs_time");
  let minutes = ["00", "30"];

  for (let hour = 9; hour <= 16; hour++) {
    for (let j = 0; j < minutes.length; j++) {
      let t = pad2(hour) + ":" + minutes[j];
      let option = document.createElement("option");
      option.value = t;
      option.innerHTML = formatTime(t);
      select.appendChild(option);
    }
  }
}

// Run when the page loads
showPatientHeader();
fillTimes();
document.getElementById("rs_date").min = todayString(); // no past dates in the picker
renderAppointments();
