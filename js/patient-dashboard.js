// patient-dashboard.js
// Fills patient-dashboard.html from the arrays (Read only, no forms on this page).
// Needs (loaded before this file):
//   patient-account-data.js   -> patient
//   patient-dashboard-data.js -> appointments, healthEntries,
//                                measurementTypes, records, invoices
//   patient-common.js         -> formatMoney, pad2, formatDate, formatDayMonth,
//                                formatLongDate, formatTime, initialsOf, shortMonths

// Class that gives each status badge its colour (switch)
function badgeClass(status) {
  switch (status) {
    case "Confirmed":
      return "status-badge--confirmed";
    case "Pending":
      return "status-badge--pending";
    case "Unpaid":
      return "status-badge--unpaid";
    case "Paid":
      return "status-badge--paid";
    default:
      return "";
  }
}

// An appointment is "upcoming" while it is Pending or Confirmed
function isUpcoming(appointment) {
  return appointment.status === "Pending" || appointment.status === "Confirmed";
}

// 1. Greeting (if / else if / else) + the sidebar / top bar header
function showGreeting() {
  let hour = new Date().getHours();
  let greeting = "";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  // first name = the text before the first space
  let space = patient.fullName.indexOf(" ");
  let firstName = space === -1 ? patient.fullName : patient.fullName.slice(0, space);

  document.getElementById("greeting").innerHTML =
    greeting + ", " + firstName + '! <span aria-hidden="true">👋</span>';

  showPatientHeader(); // name and initials in the sidebar and top bar
}

// 2. The four summary cards (loops over the arrays)
function renderSummary() {
  // upcoming appointments
  let upcoming = 0;
  for (let i = 0; i < appointments.length; i++) {
    if (isUpcoming(appointments[i])) {
      upcoming++;
    }
  }

  // outstanding balance = sum of all Unpaid invoices
  let balance = 0;
  for (let i = 0; i < invoices.length; i++) {
    if (invoices[i].status === "Unpaid") {
      balance = balance + invoices[i].amount;
    }
  }

  // last consultation = the newest Completed appointment ("" if none)
  let lastDate = "";
  for (let i = 0; i < appointments.length; i++) {
    if (appointments[i].status === "Completed" && appointments[i].date > lastDate) {
      lastDate = appointments[i].date;
    }
  }

  document.getElementById("sum-upcoming").innerHTML = pad2(upcoming);
  document.getElementById("sum-health").innerHTML = pad2(healthEntries.length);
  document.getElementById("sum-balance").innerHTML = formatMoney(balance);
  document.getElementById("sum-last").innerHTML = lastDate === "" ? "None" : formatDayMonth(lastDate);
}

// 3. Upcoming appointments list
function renderAppointments() {
  let html = "";

  for (let i = 0; i < appointments.length; i++) {
    let a = appointments[i];

    if (isUpcoming(a)) {
      html +=
        '<article class="appointment-item">' +
        '<div class="appointment-date">' +
        "<span> " + shortMonths[Number(a.date.slice(5, 7)) - 1].toUpperCase() + " </span>" +
        "<strong>" + a.date.slice(8, 10) + "</strong>" +
        "</div>" +
        '<div class="appointment-details">' +
        "<h3>" + a.doctor + "</h3>" +
        "<p>" + a.department + "</p>" +
        '<span class="appointment-time">◷ ' + formatTime(a.start) + " – " + formatTime(a.end) + "</span>" +
        "</div>" +
        '<span class="status-badge ' + badgeClass(a.status) + '">' + a.status + "</span>" +
        "</article>";
    }
  }

  if (html === "") {
    html = "<p>You have no upcoming appointments.</p>";
  }

  document.getElementById("appointment-list").innerHTML = html;
}

// 4. Patient profile panel
function renderProfile() {
  document.getElementById("profile-initials").innerHTML = initialsOf(patient.fullName);
  document.getElementById("profile-name").innerHTML = patient.fullName;
  document.getElementById("profile-id").innerHTML = "Patient ID: " + patient.id;
  document.getElementById("profile-email").innerHTML = patient.email;
  document.getElementById("profile-phone").innerHTML = patient.phone;
  document.getElementById("profile-dob").innerHTML = formatLongDate(patient.dob);
  document.getElementById("profile-status").innerHTML = '<span class="status-dot"></span> ' + patient.status;
}

// 5. Latest value of each measurement type.
// healthEntries is not sorted, so keep the entry with the biggest date.
function latestOf(typeName) {
  let latest = null;

  for (let i = 0; i < healthEntries.length; i++) {
    let e = healthEntries[i];
    if (e.type === typeName && (latest === null || e.date > latest.date)) {
      latest = e;
    }
  }

  return latest; // null if the patient has no entry of this type
}

function renderMeasurements() {
  let html = "";

  for (let i = 0; i < measurementTypes.length; i++) {
    let t = measurementTypes[i];
    let entry = latestOf(t.name);

    let valueText = "No entry yet";
    let dateText = "";
    if (entry !== null) {
      valueText = entry.value + " <small>" + entry.unit + "</small>";
      dateText = "Recorded " + formatDate(entry.date);
    }

    html +=
      '<article class="measurement-card">' +
      '<div class="measurement-heading">' +
      '<span class="measurement-icon measurement-icon--' + t.colour + '">' + t.icon + "</span>" +
      "<span>" + t.name + "</span>" +
      "</div>" +
      '<p class="measurement-value">' + valueText + "</p>" +
      '<p class="measurement-date">' + dateText + "</p>" +
      "</article>";
  }

  document.getElementById("measurement-grid").innerHTML = html;
}

// 6. Medical record shortcuts
function renderRecords() {
  let html = "";

  for (let i = 0; i < records.length; i++) {
    let r = records[i];
    html +=
      '<a href="' + r.link + '" class="record-item">' +
      '<span class="record-icon record-icon--' + r.colour + '" aria-hidden="true">' + r.icon + "</span>" +
      '<span class="record-details">' +
      "<strong>" + r.title + "</strong>" +
      "<small>" + r.detail + " · " + formatDate(r.date) + "</small>" +
      "</span>" +
      '<span class="record-arrow" aria-hidden="true">→</span>' +
      "</a>";
  }

  document.getElementById("record-list").innerHTML = html;
}

// 7. Invoice table
function renderInvoices() {
  let rows = "";

  for (let i = 0; i < invoices.length; i++) {
    let inv = invoices[i];
    // Unpaid invoices can be paid, Paid invoices have a receipt (ternary)
    let linkText = inv.status === "Unpaid" ? "View / Pay" : "Receipt";

    rows +=
      "<tr>" +
      "<td>" + inv.id + "</td>" +
      "<td>" + inv.description + "</td>" +
      "<td>" + formatDate(inv.date) + "</td>" +
      '<td class="invoice-amount">' + formatMoney(inv.amount) + "</td>" +
      '<td><span class="status-badge ' + badgeClass(inv.status) + '">' + inv.status + "</span></td>" +
      '<td><a href="invoices.html" class="table-link">' + linkText + "</a></td>" +
      "</tr>";
  }

  document.getElementById("invoice-rows").innerHTML = rows;
}

// Run when the page loads
showGreeting();
renderSummary();
renderAppointments();
renderProfile();
renderMeasurements();
renderRecords();
renderInvoices();
console.log(appointments, healthEntries, invoices); // for checking the arrays while testing
