// admin-manage-doctors.js
// CRUD for manage-doctors.html
// Needs (loaded before this file):
//   admin-manage-doctors-data.js -> doctors array
//   common.js                    -> showToday, containsText, showError, clearErrors
//   admin-validators.js          -> onlyDigits, hasDigit, looksLikeEmail

// -1 = adding a new doctor, 0,1,2... = editing the doctor at that position
let editIndex = -1;

const doctorFields = [
  "doc_name",
  "doc_email",
  "doc_phone",
  "doc_fee",
  "doc_license",
  "doc_pass",
];

// 5000 -> "৳5,000"
function formatFee(amount) {
  return "৳" + amount.toLocaleString("en-US");
}

// READ + SEARCH + FILTERS
function renderDoctors() {
  let search = document.getElementById("search-box").value;
  let deptFilter = document.getElementById("dept-filter").value;
  let statusFilter = document.getElementById("status-filter").value;
  let rows = "";
  let count = 0;

  for (let i = 0; i < doctors.length; i++) {
    let d = doctors[i];

    let matchesSearch =
      containsText(d.name, search) || containsText(d.email, search);
    let matchesDept = deptFilter === "All" || d.department === deptFilter;
    let matchesStatus = statusFilter === "All" || d.status === statusFilter;

    if (matchesSearch && matchesDept && matchesStatus) {
      let badge = d.status === "Active" ? "adm-badge--ok" : "adm-badge--off";
      let toggleText = d.status === "Active" ? "Deactivate" : "Activate";
      // names start with "Dr. " so the letter at position 4 is the initial
      let initial = d.name.slice(4, 5).toUpperCase();

      rows +=
        "<tr>" +
        '<td><div class="adm-person"><span class="adm-person__av">' +
        initial +
        "</span>" +
        "<div><strong>" +
        d.name +
        "</strong><small>" +
        d.email +
        "</small></div></div></td>" +
        "<td>" +
        d.department +
        "</td>" +
        "<td>" +
        formatFee(d.fee) +
        "</td>" +
        '<td><span class="adm-badge ' +
        badge +
        '">' +
        d.status +
        "</span></td>" +
        '<td><div class="adm-actions">' +
        '<button type="button" class="adm-act" onclick="editDoctor(' +
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
    rows = '<tr><td colspan="5">No doctors found.</td></tr>';
  }

  document.getElementById("doctor-rows").innerHTML = rows;
  document.getElementById("row-count").innerHTML =
    "Showing " + count + " of " + doctors.length;
  console.log(doctors); // for checking the array while testing
}

// true if ANOTHER doctor already has this value in this property.
// field is "email" or "license". The doctor being edited is skipped.
function valueExists(field, value) {
  for (let i = 0; i < doctors.length; i++) {
    if (
      i !== editIndex &&
      doctors[i][field].toLowerCase() === value.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
}

// CREATE + UPDATE (onsubmit="return saveDoctor()")
function saveDoctor() {
  clearErrors(doctorFields);

  let name = document.getElementById("doc_name").value.trim();
  let email = document.getElementById("doc_email").value.trim();
  let phone = document.getElementById("doc_phone").value.trim();
  let department = document.getElementById("doc_dept").value;
  let feeText = document.getElementById("doc_fee").value;
  let license = document.getElementById("doc_license").value.trim();
  let password = document.getElementById("doc_pass").value;
  let status = document.getElementById("doc_status").value;
  let ok = true;

  // Name: must start with "Dr. " and have something after it
  if (name.indexOf("Dr. ") !== 0 || name.length < 6) {
    showError("doc_name", 'Name must start with "Dr. " followed by the name.');
    ok = false;
  }

  // Email: format + not used by another doctor
  if (email === "") {
    showError("doc_email", "Email is required.");
    ok = false;
  } else if (!looksLikeEmail(email)) {
    showError("doc_email", "Enter a valid email like doctor@heartcare.com.");
    ok = false;
  } else if (valueExists("email", email)) {
    showError("doc_email", "This email is already used by another doctor.");
    ok = false;
  }

  // Phone: 11 digits starting with 01
  if (phone === "") {
    showError("doc_phone", "Phone number is required.");
    ok = false;
  } else if (
    !onlyDigits(phone) ||
    phone.length !== 11 ||
    phone.indexOf("01") !== 0
  ) {
    showError("doc_phone", "Phone must be 11 digits and start with 01.");
    ok = false;
  }

  // Fee: a number between 100 and 10000
  let fee = Number(feeText);
  if (feeText === "") {
    showError("doc_fee", "Consultation fee is required.");
    ok = false;
  } else if (isNaN(fee) || fee < 100 || fee > 10000) {
    showError("doc_fee", "Fee must be a number between 100 and 10000.");
    ok = false;
  }

  // License: at least 5 characters and unique
  if (license.length < 5) {
    showError("doc_license", "License number must be at least 5 characters.");
    ok = false;
  } else if (valueExists("license", license)) {
    showError("doc_license", "This license number already exists.");
    ok = false;
  }

  // Password: required when ADDING, optional when EDITING (blank = keep old one)
  if (editIndex === -1 || password !== "") {
    if (password.length < 8) {
      showError("doc_pass", "Password must be at least 8 characters.");
      ok = false;
    } else if (!hasDigit(password)) {
      showError("doc_pass", "Password must contain at least one number.");
      ok = false;
    }
  }

  if (ok === false) {
    return false; // stop, the red messages are on the screen
  }

  if (editIndex === -1) {
    // CREATE
    doctors.push({
      name: name,
      email: email,
      phone: phone,
      department: department,
      fee: fee,
      license: license,
      status: status,
    });
  } else {
    // UPDATE: change the properties of the existing object
    doctors[editIndex].name = name;
    doctors[editIndex].email = email;
    doctors[editIndex].phone = phone;
    doctors[editIndex].department = department;
    doctors[editIndex].fee = fee;
    doctors[editIndex].license = license;
    doctors[editIndex].status = status;
  }

  clearForm();
  renderDoctors();
  return false; // no backend yet, stay on the page
}

// Edit button: copy the object into the form
function editDoctor(index) {
  let d = doctors[index];
  editIndex = index;

  clearErrors(doctorFields);
  document.getElementById("doc_name").value = d.name;
  document.getElementById("doc_email").value = d.email;
  document.getElementById("doc_phone").value = d.phone;
  document.getElementById("doc_dept").value = d.department;
  document.getElementById("doc_fee").value = d.fee;
  document.getElementById("doc_license").value = d.license;
  document.getElementById("doc_pass").value = "";
  document.getElementById("doc_pass").placeholder =
    "Leave blank to keep the current password";
  document.getElementById("doc_status").value = d.status;

  document.getElementById("form-title").innerHTML = "Edit Doctor";
  document.getElementById("save-btn").innerHTML = "Update Doctor";
}

// "Delete" = Deactivate / Activate
function toggleStatus(index) {
  if (doctors[index].status === "Active") {
    doctors[index].status = "Inactive";
  } else {
    doctors[index].status = "Active";
  }
  renderDoctors();
}

// Clear button / after saving: back to "add" mode
function clearForm() {
  editIndex = -1;
  clearErrors(doctorFields);
  document.getElementById("doc_name").value = "";
  document.getElementById("doc_email").value = "";
  document.getElementById("doc_phone").value = "";
  document.getElementById("doc_dept").value = "Cardiology";
  document.getElementById("doc_fee").value = "";
  document.getElementById("doc_license").value = "";
  document.getElementById("doc_pass").value = "";
  document.getElementById("doc_pass").placeholder = "Min. 8 characters";
  document.getElementById("doc_status").value = "Active";

  document.getElementById("form-title").innerHTML = "Add Doctor";
  document.getElementById("save-btn").innerHTML = "Create Doctor";
}

// Run when the page loads
renderDoctors();
showToday();
