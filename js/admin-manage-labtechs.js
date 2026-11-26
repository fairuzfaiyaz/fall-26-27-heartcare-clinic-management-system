// admin-manage-labtechs.js
// CRUD for manage-labtechs.php
// Needs (loaded before this file):
//   admin-manage-labtechs-data.js -> labTechs array
//   common.js                     -> showToday, containsText, showError, clearErrors
//   admin-validators.js           -> onlyDigits, hasDigit, looksLikeEmail

// -1 = adding a new technician, 0,1,2... = editing the one at that position
let editIndex = -1;

const techFields = ["lt_name", "lt_email", "lt_phone", "lt_pass"];

// READ + SEARCH + FILTER
function renderTechs() {
  let search = document.getElementById("search-box").value;
  let statusFilter = document.getElementById("status-filter").value;
  let rows = "";
  let count = 0;

  for (let i = 0; i < labTechs.length; i++) {
    let t = labTechs[i];

    let matchesSearch =
      containsText(t.name, search) ||
      containsText(t.email, search) ||
      containsText(t.phone, search);
    let matchesStatus = statusFilter === "All" || t.status === statusFilter;

    if (matchesSearch && matchesStatus) {
      let badge = t.status === "Active" ? "adm-badge--ok" : "adm-badge--off";
      let toggleText = t.status === "Active" ? "Deactivate" : "Activate";
      // first letter of the first name + first letter of the last name
      let initials = (
        t.name.charAt(0) + t.name.charAt(t.name.lastIndexOf(" ") + 1)
      ).toUpperCase();

      rows +=
        "<tr>" +
        '<td><div class="adm-person"><span class="adm-person__av">' +
        initials +
        "</span>" +
        "<div><strong>" +
        t.name +
        "</strong><small>" +
        t.email +
        "</small></div></div></td>" +
        "<td>" +
        t.phone +
        "</td>" +
        '<td><span class="adm-badge ' +
        badge +
        '">' +
        t.status +
        "</span></td>" +
        '<td><div class="adm-actions">' +
        '<button type="button" class="adm-act" onclick="editTech(' +
        i +
        ')">Edit</button>' +
        '<button type="button" class="adm-act adm-act--danger" onclick="toggleStatus(' +
        i +
        ')">' +
        toggleText +
        "</button>" +
        "</div></td>" +
        "</tr>";
      count++;
    }
  }

  if (count === 0) {
    rows = '<tr><td colspan="4">No technicians found.</td></tr>';
  }

  document.getElementById("tech-rows").innerHTML = rows;
  document.getElementById("row-count").innerHTML =
    "Showing " + count + " of " + labTechs.length;
  console.log(labTechs); // for checking the array while testing
}

// true if ANOTHER technician already has this value in this property.
// field is "email" or "phone". The technician being edited is skipped.
function valueExists(field, value) {
  for (let i = 0; i < labTechs.length; i++) {
    if (
      i !== editIndex &&
      labTechs[i][field].toLowerCase() === value.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
}

// CREATE + UPDATE (onsubmit="return saveTech()")
function saveTech() {
  clearErrors(techFields);

  let name = document.getElementById("lt_name").value.trim();
  let email = document.getElementById("lt_email").value.trim();
  let phone = document.getElementById("lt_phone").value.trim();
  let password = document.getElementById("lt_pass").value;
  let status = document.getElementById("lt_status").value;
  let ok = true;

  // Name: at least 3 characters and a space (first name + last name)
  if (name.length < 3 || name.indexOf(" ") === -1) {
    showError("lt_name", "Enter the full name (first and last name).");
    ok = false;
  }

  // Email: format + not used by another technician
  if (email === "") {
    showError("lt_email", "Email is required.");
    ok = false;
  } else if (!looksLikeEmail(email)) {
    showError("lt_email", "Enter a valid email like tech@heartcare.com.");
    ok = false;
  } else if (valueExists("email", email)) {
    showError("lt_email", "This email is already used by another technician.");
    ok = false;
  }

  // Phone: 11 digits starting with 01, not used by another technician
  if (phone === "") {
    showError("lt_phone", "Phone number is required.");
    ok = false;
  } else if (
    !onlyDigits(phone) ||
    phone.length !== 11 ||
    phone.indexOf("01") !== 0
  ) {
    showError("lt_phone", "Phone must be 11 digits and start with 01.");
    ok = false;
  } else if (valueExists("phone", phone)) {
    showError(
      "lt_phone",
      "This phone number is already used by another technician.",
    );
    ok = false;
  }

  // Password: required when ADDING, optional when EDITING (blank = keep old one)
  if (editIndex === -1 || password !== "") {
    if (password.length < 8) {
      showError("lt_pass", "Password must be at least 8 characters.");
      ok = false;
    } else if (!hasDigit(password)) {
      showError("lt_pass", "Password must contain at least one number.");
      ok = false;
    }
  }

  if (ok === false) {
    return false; // stop, the red messages are on the screen
  }

  if (editIndex === -1) {
    // CREATE
    labTechs.push({ name: name, email: email, phone: phone, status: status });
  } else {
    // UPDATE: change the properties of the existing object
    labTechs[editIndex].name = name;
    labTechs[editIndex].email = email;
    labTechs[editIndex].phone = phone;
    labTechs[editIndex].status = status;
  }

  clearForm();
  renderTechs();
  return false; // no backend yet, stay on the page
}

// Edit button: copy the object into the form
function editTech(index) {
  let t = labTechs[index];
  editIndex = index;

  clearErrors(techFields);
  document.getElementById("lt_name").value = t.name;
  document.getElementById("lt_email").value = t.email;
  document.getElementById("lt_phone").value = t.phone;
  document.getElementById("lt_pass").value = "";
  document.getElementById("lt_pass").placeholder =
    "Leave blank to keep the current password";
  document.getElementById("lt_status").value = t.status;

  document.getElementById("form-title").innerHTML = "Edit Technician";
  document.getElementById("save-btn").innerHTML = "Update Technician";
}

// "Delete" = Deactivate / Activate
function toggleStatus(index) {
  if (labTechs[index].status === "Active") {
    labTechs[index].status = "Inactive";
  } else {
    labTechs[index].status = "Active";
  }
  renderTechs();
}

// Clear button / after saving: back to "add" mode
function clearForm() {
  editIndex = -1;
  clearErrors(techFields);
  document.getElementById("lt_name").value = "";
  document.getElementById("lt_email").value = "";
  document.getElementById("lt_phone").value = "";
  document.getElementById("lt_pass").value = "";
  document.getElementById("lt_pass").placeholder = "Min. 8 characters";
  document.getElementById("lt_status").value = "Active";

  document.getElementById("form-title").innerHTML = "Add Technician";
  document.getElementById("save-btn").innerHTML = "Create Technician";
}

// Run when the page loads
renderTechs();
showToday();
