// common.js
// Small helpers shared by the admin manage-pages.

// Today's date in the top bar
function showToday() {
  let today = new Date();
  document.getElementById("today-date").innerHTML = today.toDateString();
}

// true if "text" contains "search" (ignores upper/lower case)
// An empty search matches everything, because indexOf("") is 0.
function containsText(text, search) {
  return text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
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
/* ==========================================================================
   HeartCare Clinic - shared code for all patient pages
   File: js/common.js
   Load order at the end of <body>:  data.js  ->  common.js  ->  the page's script
   Fills the patient's name and initials from data.js, so no page has the
   name typed into its HTML. Later: the name comes from $_SESSION / the database.
   ========================================================================== */

// "Fairuz Ahmed" -> "FA"
function getInitials(fullName) {
  const words = fullName.trim().split(" ");
  let letters = "";
  for (let i = 0; i < words.length && letters.length < 2; i++) {
    if (words[i] !== "") letters += words[i].charAt(0).toUpperCase();
  }
  return letters;
}

// fills every element that has data-patient="name" / "initials" / "id"
function loadPatientInfo() {
  const names = document.querySelectorAll('[data-patient="name"]');
  for (let i = 0; i < names.length; i++) {
    names[i].textContent = currentPatient.name;
  }

  const initials = document.querySelectorAll('[data-patient="initials"]');
  for (let i = 0; i < initials.length; i++) {
    initials[i].textContent = getInitials(currentPatient.name);
  }

  const ids = document.querySelectorAll('[data-patient="id"]');
  for (let i = 0; i < ids.length; i++) {
    ids[i].textContent = currentPatient.id;
  }
}

loadPatientInfo();
