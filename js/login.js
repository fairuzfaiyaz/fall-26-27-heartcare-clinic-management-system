// Login credentials
var users = [
  {
    email: "admin@heartcare.com",
    password: "Admin123!",
    role: "admin",
  },
  {
    email: "doctor@heartcare.com",
    password: "Doctor123!",
    role: "doctor",
  },
  {
    email: "patient@heartcare.com",
    password: "Patient123!",
    role: "patient",
  },
  {
    email: "labtech@heartcare.com",
    password: "Labtech123!",
    role: "labtech",
  },
];

// Get form elements
var loginForm = document.getElementById("loginForm");

var email = document.getElementById("email");
var password = document.getElementById("password");

// Email validation pattern
var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Form submission
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get input values
  var emailValue = email.value.trim();
  var passwordValue = password.value;

  // Check empty fields
  if (emailValue === "" || passwordValue === "") {
    alert("All fields are required.");
  }

  // Validate email format
  else if (!emailPattern.test(emailValue)) {
    alert("Please enter a valid email address.");
  } else {
    var found = false;

    // Check login credentials
    for (var i = 0; i < users.length; i++) {
      if (
        users[i].email === emailValue &&
        users[i].password === passwordValue
      ) {
        found = true;

        // Redirect according to user role
        if (users[i].role === "admin") {
          window.location.href = "dashboard.html";
        } else if (users[i].role === "doctor") {
          window.location.href = "doctor-dashboard.html";
        } else if (users[i].role === "patient") {
          window.location.href = "patient-dashboard.html";
        } else if (users[i].role === "labtech") {
          window.location.href = "lab-dashboard.html";
        }

        break;
      }
    }

    // Invalid credentials
    if (found === false) {
      alert("Invalid email address or password.");
    }
  }
});
