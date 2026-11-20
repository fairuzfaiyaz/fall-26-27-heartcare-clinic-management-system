// patient-profile.js

// Stores the current profile editing state.
let profileEditing = false;

// Returns the initials of the patient.
function getPatientInitials() {
  let initials = "";
  let foundFirst = false;

  for (let i = 0; i < patient.fullName.length; i++) {
    if (patient.fullName[i] != " ") {
      if (foundFirst == false) {
        initials = patient.fullName[i];
        foundFirst = true;
      }
    } else if (foundFirst == true && i + 1 < patient.fullName.length) {
      initials = initials + patient.fullName[i + 1];
      break;
    }
  }

  return initials;
}

// Loads patient information into the profile form.
function loadProfileForm() {
  document.getElementById("p_name").value = patient.fullName;
  document.getElementById("p_dob").value = patient.dob;
  document.getElementById("p_email").value = patient.email;
  document.getElementById("p_phone").value = patient.phone;
  document.getElementById("p_gender").value = patient.gender;
  document.getElementById("p_addr").value = patient.address;
  document.getElementById("p_ec").value = patient.emergencyName;
  document.getElementById("p_ecp").value = patient.emergencyPhone;
}

// Renders the patient's information in the account overview.
function renderProfile() {
  console.log(patient);

  let initials = getPatientInitials();

  document.getElementById("sidebar-name").innerHTML = patient.fullName;
  document.getElementById("sidebar-avatar").innerHTML = initials;
  document.getElementById("topbar-avatar").innerHTML = initials;

  document.getElementById("profile-avatar").innerHTML = initials;
  document.getElementById("summary-name").innerHTML = patient.fullName;
  document.getElementById("summary-id").innerHTML = patient.id;
  document.getElementById("summary-email").innerHTML = patient.email;
  document.getElementById("summary-dob").innerHTML = patient.dob;

  let statusElement = document.getElementById("summary-status");

  if (patient.status == "Active") {
    statusElement.innerHTML = '<span class="status-dot"></span>Active';
    statusElement.style.color = "green";
  } else {
    statusElement.innerHTML = "Inactive";
    statusElement.style.color = "red";
  }
}

// Displays an error message below a form field.
function showProfileError(fieldId, message) {
  document.getElementById(fieldId + "-error").innerHTML = message;

  document.getElementById(fieldId + "-error").style.color = "red";
}

// Clears all profile validation messages.
function clearProfileErrors() {
  document.getElementById("p_name-error").innerHTML = "";
  document.getElementById("p_dob-error").innerHTML = "";
  document.getElementById("p_email-error").innerHTML = "";
  document.getElementById("p_phone-error").innerHTML = "";
  document.getElementById("p_ecp-error").innerHTML = "";
}

// Checks whether a phone number contains exactly 11 digits starting with 01.
function validatePatientPhone(phone) {
  if (phone.length != 11) {
    return false;
  }

  if (phone[0] != "0" || phone[1] != "1") {
    return false;
  }

  for (let i = 0; i < phone.length; i++) {
    if (phone[i] < "0" || phone[i] > "9") {
      return false;
    }
  }

  return true;
}

// Validates the profile form and saves the updated information.
function validateProfileForm() {
  clearProfileErrors();

  document.getElementById("profile-message").innerHTML = "";

  if (patient.status == "Inactive") {
    alert("Your account is inactive. Profile updates are not allowed.");
    return false;
  }

  let name = document.getElementById("p_name").value;
  let dob = document.getElementById("p_dob").value;
  let email = document.getElementById("p_email").value;
  let phone = document.getElementById("p_phone").value;
  let emergencyPhone = document.getElementById("p_ecp").value;

  let valid = true;

  // Validate full name.
  if (name.length < 3) {
    showProfileError("p_name", "Name must contain at least 3 characters.");

    valid = false;
  }

  // Validate date of birth.
  if (dob == "") {
    showProfileError("p_dob", "Please select your date of birth.");

    valid = false;
  } else if (dob >= "2026-11-20") {
    showProfileError("p_dob", "Date of birth must be before today.");

    valid = false;
  }

  // Validate email address.
  let atPosition = email.indexOf("@");
  let dotPosition = email.indexOf(".", atPosition);

  if (
    atPosition < 1 ||
    dotPosition < atPosition + 2 ||
    dotPosition == email.length - 1
  ) {
    showProfileError("p_email", "Please enter a valid email address.");

    valid = false;
  }

  // Validate phone number.
  if (validatePatientPhone(phone) == false) {
    showProfileError(
      "p_phone",
      "Enter a valid 11-digit phone number starting with 01.",
    );

    valid = false;
  }

  // Validate optional emergency contact phone.
  if (emergencyPhone != "") {
    if (validatePatientPhone(emergencyPhone) == false) {
      showProfileError(
        "p_ecp",
        "Enter a valid 11-digit emergency phone number.",
      );

      valid = false;
    }
  }

  // Stop saving if validation fails.
  if (valid == false) {
    return false;
  }

  // Update the existing patient object.
  patient.fullName = name;
  patient.dob = dob;
  patient.email = email;
  patient.phone = phone;

  patient.gender = document.getElementById("p_gender").value;
  patient.address = document.getElementById("p_addr").value;
  patient.emergencyName = document.getElementById("p_ec").value;
  patient.emergencyPhone = emergencyPhone;

  profileEditing = false;

  // Refresh the account overview.
  renderProfile();

  // Display success message.
  document.getElementById("profile-message").innerHTML =
    "Profile updated successfully!";

  document.getElementById("profile-message").style.color = "green";

  alert("Your profile has been updated successfully!");

  return false;
}

// Resets the form to the current saved patient information.
function resetProfileForm() {
  loadProfileForm();

  clearProfileErrors();

  document.getElementById("profile-message").innerHTML = "";

  profileEditing = false;
}

// Disables profile editing after account deactivation.
function disableProfileEditing() {
  document.getElementById("p_name").disabled = true;
  document.getElementById("p_dob").disabled = true;
  document.getElementById("p_email").disabled = true;
  document.getElementById("p_phone").disabled = true;
  document.getElementById("p_gender").disabled = true;
  document.getElementById("p_addr").disabled = true;
  document.getElementById("p_ec").disabled = true;
  document.getElementById("p_ecp").disabled = true;

  document.getElementById("save-profile-button").disabled = true;
  document.getElementById("cancel-edit").disabled = true;
  document.getElementById("deact").disabled = true;
}

// Deactivates the patient's account after confirmation.
function deactivateAccount() {
  if (patient.status == "Inactive") {
    alert("Your account is already inactive.");
    return;
  }

  let confirmation = confirm(
    "Are you sure you want to deactivate your account?",
  );

  if (confirmation == true) {
    patient.status = "Inactive";

    // Refresh the account overview.
    renderProfile();

    // Disable profile editing.
    disableProfileEditing();

    // Display deactivation message.
    document.getElementById("deactivate-message").innerHTML =
      "Your account has been deactivated.";

    document.getElementById("deactivate-message").style.color = "red";

    alert("Your account has been deactivated.");
  }
}

// Initializes the patient profile page.
function initializeProfilePage() {
  loadProfileForm();

  renderProfile();

  // Reset button event.
  document
    .getElementById("cancel-edit")
    .addEventListener("click", resetProfileForm);

  // Deactivation button event.
  document.getElementById("deact").addEventListener("click", deactivateAccount);
}

// Executes when the page loads.
initializeProfilePage();
