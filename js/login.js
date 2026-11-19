const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

// Email validation pattern
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation patterns
const passwordLength = /.{8,}/;
const uppercase = /[A-Z]/;
const lowercase = /[a-z]/;
const number = /[0-9]/;
const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;

// Form submission
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Remove unnecessary spaces from email
  const emailValue = email.value.trim();
  const passwordValue = password.value;

  // Check empty fields
  if (emailValue === "" || passwordValue === "") {
    alert("All fields are required.");
  }

  // Validate email format
  else if (!emailPattern.test(emailValue)) {
    alert("Please enter a valid email address.");
  }

  // Check password length
  else if (!passwordLength.test(passwordValue)) {
    alert("Password must contain at least 8 characters.");
  }

  // Check uppercase letter
  else if (!uppercase.test(passwordValue)) {
    alert("Password must contain an uppercase letter.");
  }

  // Check lowercase letter
  else if (!lowercase.test(passwordValue)) {
    alert("Password must contain a lowercase letter.");
  }

  // Check number
  else if (!number.test(passwordValue)) {
    alert("Password must contain at least one number.");
  }

  // Check special character
  else if (!specialCharacter.test(passwordValue)) {
    alert("Password must contain a special character.");
  } else {
    alert(
      "Validation successful! Backend authentication is not connected yet.",
    );
  }
});
