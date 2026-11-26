// register.js
// Form validation for register.php (Week 06 style:
// onsubmit="return validateForm()" -> return false stops the form).

// ids of every field that can show an error
const fieldIds = [
  "full_name",
  "email",
  "phone",
  "date_of_birth",
  "gender",
  "password",
  "confirm_password",
  "terms",
];

// Today as "YYYY-MM-DD" (same format the date input gives us)
function todayString() {
  return new Date().toISOString().split("T")[0];
}

// true if every character of the text is 0-9
function onlyDigits(text) {
  for (let i = 0; i < text.length; i++) {
    if (text[i] < "0" || text[i] > "9") {
      return false;
    }
  }
  return true;
}

// true if the text contains at least one digit
function hasDigit(text) {
  for (let i = 0; i < text.length; i++) {
    if (text[i] >= "0" && text[i] <= "9") {
      return true;
    }
  }
  return false;
}

// true if the text looks like an email: something@something.something
function looksLikeEmail(text) {
  let at = text.indexOf("@");
  let dot = text.lastIndexOf(".");
  return at > 0 && dot > at + 1 && dot < text.length - 1;
}

// Show a red message next to one field
function showError(fieldId, message) {
  let span = document.getElementById(fieldId + "-error");
  span.innerHTML = message;
  span.style.color = "red";
  span.style.fontSize = "0.8rem";
  span.style.display = "block";
  document.getElementById(fieldId).style.borderColor = "red";
}

// Remove all error messages (called at the start of every submit)
function clearErrors() {
  for (let i = 0; i < fieldIds.length; i++) {
    document.getElementById(fieldIds[i] + "-error").innerHTML = "";
    document.getElementById(fieldIds[i]).style.borderColor = "";
  }
}

// Main function. Returns true (send form) or false (stop form).
function validateForm() {
  let ok = true;
  clearErrors();

  let fullName = document.getElementById("full_name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let dob = document.getElementById("date_of_birth").value;
  let gender = document.getElementById("gender").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm_password").value;

  // Full name: at least 2 characters
  if (fullName.length < 2) {
    showError(
      "full_name",
      "Please enter your full name (at least 2 characters).",
    );
    ok = false;
  }

  // Email
  if (email === "") {
    showError("email", "Email is required.");
    ok = false;
  } else if (!looksLikeEmail(email)) {
    showError("email", "Enter a valid email like you@example.com.");
    ok = false;
  }

  // Phone: 11 digits, starts with 01
  if (phone === "") {
    showError("phone", "Phone number is required.");
    ok = false;
  } else if (
    !onlyDigits(phone) ||
    phone.length !== 11 ||
    phone.indexOf("01") !== 0
  ) {
    showError("phone", "Phone must be 11 digits and start with 01.");
    ok = false;
  }

  // Date of birth: required and not in the future
  if (dob === "") {
    showError("date_of_birth", "Date of birth is required.");
    ok = false;
  } else if (dob > todayString()) {
    showError("date_of_birth", "Date of birth cannot be in the future.");
    ok = false;
  }

  // Gender: the first option has value ""
  if (gender === "") {
    showError("gender", "Please select your gender.");
    ok = false;
  }

  // Password: at least 8 characters and one number
  if (password.length < 8) {
    showError("password", "Password must be at least 8 characters.");
    ok = false;
  } else if (!hasDigit(password)) {
    showError("password", "Password must contain at least one number.");
    ok = false;
  }

  // Confirm password: compares two fields, so it needs JavaScript
  if (confirmPassword === "") {
    showError("confirm_password", "Please confirm your password.");
    ok = false;
  } else if (confirmPassword !== password) {
    showError("confirm_password", "Passwords do not match.");
    ok = false;
  }

  // Terms must be ticked
  if (!document.getElementById("terms").checked) {
    showError("terms", "You must agree to the terms.");
    ok = false;
  }

  return ok;
}

// Register button stays disabled until the terms box is ticked
function toggleRegisterButton() {
  let ticked = document.getElementById("terms").checked;
  document.getElementById("register-btn").disabled = !ticked;
}

// Block future dates in the date picker too
document.getElementById("date_of_birth").max = todayString();
