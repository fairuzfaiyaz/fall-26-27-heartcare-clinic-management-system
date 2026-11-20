// patient-book-appointment.js
// Booking form: department -> doctor -> date -> time slot.
// Needs (loaded before this file):
//   patient-account-data.js -> patient
//   patient-book-appointment-data.js -> departments, doctors, allSlots, booked
//   patient-common.js -> formatDate, formatTime, formatMoney, todayString,
//                        showError, clearErrors

const bookFields = ["dept", "doctor", "date", "slot"];

// The time slot the patient clicked ("" = none yet)
let selectedSlot = "";

// Put a value in a summary box. An empty value shows a dash.
function setText(id, text) {
  document.getElementById(id).innerHTML = text === "" ? "—" : text;
}

// Look for a doctor by name. Returns the object, or null if not found.
function findDoctor(name) {
  for (let i = 0; i < doctors.length; i++) {
    if (doctors[i].name === name) {
      return doctors[i];
    }
  }
  return null;
}

// true if this doctor already has a booking on this date at this time
function isBooked(doctorName, dateValue, time) {
  for (let i = 0; i < booked.length; i++) {
    let b = booked[i];
    if (b.doctor === doctorName && b.date === dateValue && b.time === time) {
      return true;
    }
  }
  return false;
}

// 1. Fill the department drop-down with createElement + appendChild
function fillDepartments() {
  let select = document.getElementById("dept");

  for (let i = 0; i < departments.length; i++) {
    let option = document.createElement("option");
    option.value = departments[i];
    option.innerHTML = departments[i];
    select.appendChild(option);
  }
}

// 2. Department changed (onchange): fill the doctor drop-down
function showDoctors() {
  let dept = document.getElementById("dept").value;
  let doctorSelect = document.getElementById("doctor");

  if (dept === "") {
    doctorSelect.innerHTML = '<option value="">Select a department first</option>';
  } else {
    doctorSelect.innerHTML = '<option value="">Select doctor</option>';
    for (let i = 0; i < doctors.length; i++) {
      if (doctors[i].department === dept) {
        let option = document.createElement("option");
        option.value = doctors[i].name;
        option.innerHTML = doctors[i].name;
        doctorSelect.appendChild(option);
      }
    }
  }

  // the doctor and the date must be chosen again
  doctorSelect.disabled = dept === "";
  document.getElementById("date").disabled = true;
  document.getElementById("date").value = "";

  setText("s-dept", dept);
  setText("s-doc", "");
  setText("s-date", "");
  setText("s-fee", "");
  renderSlots();
}

// 3. Doctor changed (onchange): unlock the date, show the fee
function doctorChosen() {
  let name = document.getElementById("doctor").value;
  let d = findDoctor(name);

  document.getElementById("date").disabled = d === null;
  setText("s-doc", name);
  setText("s-fee", d === null ? "" : formatMoney(d.fee));
  renderSlots();
}

// 4. Date changed (onchange)
function dateChosen() {
  let dateValue = document.getElementById("date").value;
  setText("s-date", dateValue === "" ? "" : formatDate(dateValue));
  renderSlots();
}

// 5. Choose a new doctor/date: forget the old slot and draw the slots again
function renderSlots() {
  selectedSlot = "";
  document.getElementById("slot").value = "";
  setText("s-time", "");
  document.getElementById("book-msg").style.display = "none";
  drawSlots();
}

// Draw the free slots as buttons (the selected one gets "is-selected")
function drawSlots() {
  let doctorName = document.getElementById("doctor").value;
  let dateValue = document.getElementById("date").value;
  let html = "";
  let count = 0;

  if (doctorName === "" || dateValue === "") {
    html = '<p class="pp-hint">Choose a doctor and date to see available slots.</p>';
  } else {
    for (let i = 0; i < allSlots.length; i++) {
      let t = allSlots[i];

      if (isBooked(doctorName, dateValue, t) === false) {
        let extra = t === selectedSlot ? " is-selected" : "";
        html +=
          '<button type="button" class="pp-slot' + extra + '" onclick="chooseSlot(\'' + t + '\')">' +
          formatTime(t) + "</button>";
        count++;
      }
    }

    if (count === 0) {
      html = '<p class="pp-hint">No free slots on this date.</p>';
    }
  }

  document.getElementById("slots").innerHTML = html;
}

// A slot button was clicked
function chooseSlot(time) {
  selectedSlot = time;
  document.getElementById("slot").value = time;
  setText("s-time", formatTime(time));
  clearErrors(["slot"]);
  drawSlots();
}

// Confirm Booking button (onsubmit="return confirmBooking()")
function confirmBooking() {
  clearErrors(bookFields);
  document.getElementById("book-msg").style.display = "none";

  let dept = document.getElementById("dept").value;
  let doctorName = document.getElementById("doctor").value;
  let dateValue = document.getElementById("date").value;
  let ok = true;

  if (dept === "") {
    showError("dept", "Please select a department.");
    ok = false;
  }

  if (doctorName === "") {
    showError("doctor", "Please select a doctor.");
    ok = false;
  }

  if (dateValue === "") {
    showError("date", "Please pick a date.");
    ok = false;
  } else if (dateValue < todayString()) {
    showError("date", "The date cannot be in the past.");
    ok = false;
  }

  if (selectedSlot === "") {
    showError("slot", "Please select a time slot.");
    ok = false;
  }

  if (ok === false) {
    return false; // stop, the red messages are on the screen
  }

  // Check the slot again (somebody may have booked it first)
  if (isBooked(doctorName, dateValue, selectedSlot)) {
    renderSlots();
    showError("slot", "That slot was just taken. Please choose another time.");
    return false;
  }

  // CREATE: build an object and push it
  booked.push({ doctor: doctorName, date: dateValue, time: selectedSlot });

  let text =
    "Booking request sent for " + doctorName + " on " + formatDate(dateValue) +
    " at " + formatTime(selectedSlot) + ".";

  renderSlots(); // the booked slot disappears from the list
  let box = document.getElementById("book-msg");
  box.className = "pp-alert pp-alert--ok";
  box.innerHTML = text;
  box.style.display = "block";
  console.log(booked); // for checking the array while testing

  return false; // no backend yet, stay on the page
}

// Run when the page loads
showPatientHeader(); // name and initials in the sidebar and top bar
fillDepartments();
document.getElementById("date").min = todayString(); // no past dates in the picker
