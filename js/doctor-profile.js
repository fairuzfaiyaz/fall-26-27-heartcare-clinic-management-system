/*
    File: doctor-profile.js
    Purpose: Manage doctor profile information,
    validation, editing, saving and cancelling.
*/

// Function to load doctor information into HTML fields
function loadDoctorProfile() {
  console.log("Doctor Profile:", doctorProfile);

  document.getElementById("fullName").value = doctorProfile.fullName;

  document.getElementById("gender").value = doctorProfile.gender;

  document.getElementById("dateOfBirth").value = doctorProfile.dateOfBirth;

  document.getElementById("bloodGroup").value = doctorProfile.bloodGroup;

  document.getElementById("email").value = doctorProfile.email;

  document.getElementById("phone").value = doctorProfile.phone;

  document.getElementById("address").value = doctorProfile.address;

  document.getElementById("doctorId").value = doctorProfile.doctorId;

  document.getElementById("specialization").value =
    doctorProfile.specialization;

  document.getElementById("qualification").value = doctorProfile.qualification;

  document.getElementById("experience").value = doctorProfile.experience;

  document.getElementById("department").value = doctorProfile.department;

  document.getElementById("hospital").value = doctorProfile.hospital;

  document.getElementById("biography").value = doctorProfile.biography;

  updateProfileHeader();
}

// Function to update the profile header
function updateProfileHeader() {
  document.getElementById("profileName").innerHTML = doctorProfile.fullName;

  document.getElementById("profileEmail").innerHTML = doctorProfile.email;

  document.getElementById("profilePhone").innerHTML = doctorProfile.phone;

  document.getElementById("profileSpecialization").innerHTML =
    doctorProfile.specialization;

  document.getElementById("profileAvatar").innerHTML = "DR";
}

// Function to show an individual validation error
function showError(fieldId, message) {
  document.getElementById(fieldId + "-error").innerHTML = message;
}

// Function to clear all validation errors
function clearErrors() {
  const errorFields = [
    "fullName",
    "gender",
    "dateOfBirth",
    "bloodGroup",
    "email",
    "phone",
    "address",
    "specialization",
    "qualification",
    "experience",
    "department",
    "hospital",
    "biography",
  ];

  for (let i = 0; i < errorFields.length; i++) {
    document.getElementById(errorFields[i] + "-error").innerHTML = "";
  }

  document.getElementById("profileMessage").innerHTML = "";
}

// Function to validate doctor profile information
function validateProfile() {
  clearErrors();

  let isValid = true;

  // Get input values
  const fullName = document.getElementById("fullName").value.trim();

  const gender = document.getElementById("gender").value;

  const dateOfBirth = document.getElementById("dateOfBirth").value;

  const bloodGroup = document.getElementById("bloodGroup").value;

  const email = document.getElementById("email").value.trim();

  const phone = document.getElementById("phone").value.trim();

  const address = document.getElementById("address").value.trim();

  const specialization = document.getElementById("specialization").value.trim();

  const qualification = document.getElementById("qualification").value.trim();

  const experience = document.getElementById("experience").value.trim();

  const department = document.getElementById("department").value.trim();

  const hospital = document.getElementById("hospital").value.trim();

  const biography = document.getElementById("biography").value.trim();

  // Validate full name
  if (fullName === "") {
    showError("fullName", "Full name is required.");

    isValid = false;
  }

  // Validate gender
  if (gender === "") {
    showError("gender", "Please select your gender.");

    isValid = false;
  }

  // Validate date of birth
  if (dateOfBirth === "") {
    showError("dateOfBirth", "Date of birth is required.");

    isValid = false;
  } else {
    const selectedDate = new Date(dateOfBirth);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      showError("dateOfBirth", "Date of birth must be in the past.");

      isValid = false;
    }
  }

  // Validate blood group
  if (bloodGroup === "") {
    showError("bloodGroup", "Please select your blood group.");

    isValid = false;
  }

  // Validate email
  if (email === "") {
    showError("email", "Email address is required.");

    isValid = false;
  } else if (
    email.indexOf("@") === -1 ||
    email.indexOf(".") === -1 ||
    email.indexOf(" ") !== -1
  ) {
    showError("email", "Please enter a valid email address.");

    isValid = false;
  }

  // Validate phone number
  if (phone === "") {
    showError("phone", "Phone number is required.");

    isValid = false;
  } else {
    let digitCount = 0;

    for (let i = 0; i < phone.length; i++) {
      if (phone[i] >= "0" && phone[i] <= "9") {
        digitCount++;
      }
    }

    if (digitCount < 10 || digitCount > 15) {
      showError("phone", "Phone number must contain 10 to 15 digits.");

      isValid = false;
    }
  }

  // Validate address
  if (address === "") {
    showError("address", "Address is required.");

    isValid = false;
  }

  // Validate specialization
  if (specialization === "") {
    showError("specialization", "Specialization is required.");

    isValid = false;
  }

  // Validate qualification
  if (qualification === "") {
    showError("qualification", "Qualification is required.");

    isValid = false;
  }

  // Validate experience
  if (experience === "") {
    showError("experience", "Experience is required.");

    isValid = false;
  }

  // Validate department
  if (department === "") {
    showError("department", "Department is required.");

    isValid = false;
  }

  // Validate hospital
  if (hospital === "") {
    showError("hospital", "Hospital name is required.");

    isValid = false;
  }

  // Validate biography
  if (biography === "") {
    showError("biography", "Professional biography is required.");

    isValid = false;
  }

  return isValid;
}

// Function to save updated doctor profile information
function saveDoctorProfile() {
  if (validateProfile() === false) {
    document.getElementById("profileMessage").innerHTML =
      "Please correct the errors before saving.";

    document.getElementById("profileMessage").style.color = "red";

    return false;
  }

  // Update doctor profile object
  doctorProfile.fullName = document.getElementById("fullName").value.trim();

  doctorProfile.gender = document.getElementById("gender").value;

  doctorProfile.dateOfBirth = document.getElementById("dateOfBirth").value;

  doctorProfile.bloodGroup = document.getElementById("bloodGroup").value;

  doctorProfile.email = document.getElementById("email").value.trim();

  doctorProfile.phone = document.getElementById("phone").value.trim();

  doctorProfile.address = document.getElementById("address").value.trim();

  doctorProfile.specialization = document
    .getElementById("specialization")
    .value.trim();

  doctorProfile.qualification = document
    .getElementById("qualification")
    .value.trim();

  doctorProfile.experience = document.getElementById("experience").value.trim();

  doctorProfile.department = document.getElementById("department").value.trim();

  doctorProfile.hospital = document.getElementById("hospital").value.trim();

  doctorProfile.biography = document.getElementById("biography").value.trim();

  // Update profile header
  updateProfileHeader();

  // Display success message
  document.getElementById("profileMessage").innerHTML =
    "Profile updated successfully!";

  document.getElementById("profileMessage").style.color = "green";

  // Display updated information in console
  console.log("Updated Doctor Profile:", doctorProfile);

  alert("Doctor profile updated successfully!");

  return false;
}

// Function to cancel changes and restore saved information
function cancelProfileChanges() {
  loadDoctorProfile();

  clearErrors();

  document.getElementById("profileMessage").innerHTML =
    "Changes have been cancelled.";

  document.getElementById("profileMessage").style.color = "red";
}

// Function to initialize profile event handling
function initializeProfileEvents() {
  document.getElementById("profileForm").onsubmit = saveDoctorProfile;

  document.getElementById("cancelChanges").onclick = cancelProfileChanges;
}

// Load doctor profile when page opens
loadDoctorProfile();

initializeProfileEvents();
