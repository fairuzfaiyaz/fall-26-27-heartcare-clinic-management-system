// patient-common.js
// Small helpers shared by all the patient pages.
// Dates are "YYYY-MM-DD" text and times are "HH:MM" text.

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const longMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// 1800 -> "৳1,800"
function formatMoney(amount) {
  return "৳" + amount.toLocaleString("en-US");
}

// 4 -> "04"
function pad2(number) {
  return number < 10 ? "0" + number : "" + number;
}

// "2026-10-31" -> "31 Oct 2026"
function formatDate(text) {
  let monthIndex = Number(text.slice(5, 7)) - 1;
  return text.slice(8, 10) + " " + shortMonths[monthIndex] + " " + text.slice(0, 4);
}

// "2026-10-31" -> "31 Oct"
function formatDayMonth(text) {
  let monthIndex = Number(text.slice(5, 7)) - 1;
  return text.slice(8, 10) + " " + shortMonths[monthIndex];
}

// "2003-03-15" -> "15 March 2003"
function formatLongDate(text) {
  let monthIndex = Number(text.slice(5, 7)) - 1;
  return text.slice(8, 10) + " " + longMonths[monthIndex] + " " + text.slice(0, 4);
}

// "14:00" -> "02:00 PM"
function formatTime(text) {
  let hour = Number(text.slice(0, 2));
  let suffix = hour >= 12 ? "PM" : "AM";
  let hour12 = hour % 12;
  if (hour12 === 0) {
    hour12 = 12;
  }
  return pad2(hour12) + ":" + text.slice(3, 5) + " " + suffix;
}

// "Fairuz Ahmed" -> "FA" (first letter + first letter after the last space)
function initialsOf(name) {
  let last = name.lastIndexOf(" ") + 1; // 0 if there is no space
  return (name.charAt(0) + name.charAt(last)).toUpperCase();
}

// Today as "YYYY-MM-DD" (same format the date input gives us)
function todayString() {
  return new Date().toISOString().split("T")[0];
}

// Show a red message next to one field.
// The message goes in <span id="FIELDID-error"></span>
function showError(fieldId, message) {
  let span = document.getElementById(fieldId + "-error");
  span.innerHTML = message;
  span.style.color = "red";
  span.style.fontSize = "0.8rem";
  span.style.display = "block";
  document.getElementById(fieldId).style.borderColor = "red";
}

// Remove the red messages and borders of all fields in the array
function clearErrors(fieldIds) {
  for (let i = 0; i < fieldIds.length; i++) {
    document.getElementById(fieldIds[i] + "-error").innerHTML = "";
    document.getElementById(fieldIds[i]).style.borderColor = "";
  }
}

// Fill the name and initials in the sidebar and the top bar from the
// "patient" object (patient-account-data.js). Every patient page calls this.
function showPatientHeader() {
  let initials = initialsOf(patient.fullName);
  document.getElementById("sidebar-initials").innerHTML = initials;
  document.getElementById("sidebar-name").innerHTML = patient.fullName;
  document.getElementById("topbar-initials").innerHTML = initials;
}
