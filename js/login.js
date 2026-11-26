// login.js
// Sign-in page: validation, show/hide password, Caps Lock warning, wrong-password
// counter with a short lock, account status check, remember me, forgot password,
// demo account buttons and a redirect by role (switch).
// Needs login-data.js loaded first (users, maxAttempts, lockSeconds).

const loginFields = ["email", "password"];

let failedAttempts = 0; // wrong passwords in a row
let lockTimer = null; // the countdown while the form is locked

// ---------- small helpers ----------

// true if the text looks like something@something.something
function looksLikeEmail(text) {
  let at = text.indexOf("@");
  let dot = text.lastIndexOf(".");
  return at > 0 && dot > at + 1 && dot < text.length - 1;
}

// Role name shown to the user (switch)
function roleLabel(role) {
  switch (role) {
    case "admin":
      return "Administrator";
    case "doctor":
      return "Doctor";
    case "patient":
      return "Patient";
    case "labtech":
      return "Lab Technician";
    default:
      return role;
  }
}

// The page each role opens after signing in (switch)
function pageFor(role) {
  switch (role) {
    case "admin":
      return "dashboard.php";
    case "doctor":
      return "doctor-dashboard.php";
    case "patient":
      return "patient-dashboard.php";
    case "labtech":
      return "lab-dashboard.php";
    default:
      return "login.php";
  }
}

// Look for the account with this email. Returns the object, or null.
function findUser(email) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === email.toLowerCase()) {
      return users[i];
    }
  }
  return null;
}

// Red message next to one field (the span is <span id="FIELDID-error">)
function showError(fieldId, message) {
  let span = document.getElementById(fieldId + "-error");
  span.innerHTML = message;
  span.style.color = "red";
  span.style.fontSize = "0.8rem";
  span.style.display = "block";
  document.getElementById(fieldId).style.borderColor = "red";
}

// Remove the red messages and borders of the given fields
function clearErrors(fieldIds) {
  for (let i = 0; i < fieldIds.length; i++) {
    document.getElementById(fieldIds[i] + "-error").innerHTML = "";
    document.getElementById(fieldIds[i]).style.borderColor = "";
  }
}

// Message box above the form. kind is "error", "ok" or "warn".
function showMessage(boxId, text, kind) {
  let box = document.getElementById(boxId);
  box.className = "login-msg login-msg--" + kind;
  box.innerHTML = text;
  box.style.display = "block";
}

function hideMessage(boxId) {
  document.getElementById(boxId).style.display = "none";
}

// ---------- password: show / hide ----------

// Eye button: switch the password field between type "password" and "text"
function togglePassword() {
  let field = document.getElementById("password");
  let button = document.getElementById("toggle-password");
  let showing = field.type === "text";

  if (showing) {
    field.type = "password";
    document.getElementById("eye-open").style.display = "block";
    document.getElementById("eye-off").style.display = "none";
    button.setAttribute("aria-label", "Show password");
    button.setAttribute("aria-pressed", "false");
  } else {
    field.type = "text";
    document.getElementById("eye-open").style.display = "none";
    document.getElementById("eye-off").style.display = "block";
    button.setAttribute("aria-label", "Hide password");
    button.setAttribute("aria-pressed", "true");
  }
}

// onkeyup on the password field: warn when Caps Lock is on
function checkCapsLock(event) {
  let warning = document.getElementById("caps-warning");
  warning.style.display = event.getModifierState("CapsLock") ? "block" : "none";
}

// ---------- lock after too many wrong passwords ----------

function lockForm() {
  let seconds = lockSeconds;
  document.getElementById("login-btn").disabled = true;
  showMessage(
    "login-msg",
    "Too many failed attempts. Try again in " + seconds + " seconds.",
    "error",
  );

  lockTimer = setInterval(function () {
    seconds--;
    if (seconds > 0) {
      showMessage(
        "login-msg",
        "Too many failed attempts. Try again in " + seconds + " seconds.",
        "error",
      );
    } else {
      clearInterval(lockTimer);
      lockTimer = null;
      failedAttempts = 0;
      document.getElementById("login-btn").disabled = false;
      hideMessage("login-msg");
    }
  }, 1000);
}

// ---------- remember me (only the email, never the password) ----------

function loadRememberedEmail() {
  let saved = localStorage.getItem("heartcareEmail");
  if (saved !== null) {
    document.getElementById("email").value = saved;
    document.getElementById("remember").checked = true;
  }
}

function saveRememberedEmail(email) {
  if (document.getElementById("remember").checked) {
    localStorage.setItem("heartcareEmail", email);
  } else {
    localStorage.removeItem("heartcareEmail");
  }
}

// ---------- the sign-in form (onsubmit="return validateLogin()") ----------

function validateLogin() {
  clearErrors(loginFields);
  hideMessage("login-msg");

  // the form is locked: do nothing
  if (lockTimer !== null) {
    return false;
  }

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;
  let ok = true;

  // 1. check the fields
  if (email === "") {
    showError("email", "Email is required.");
    ok = false;
  } else if (!looksLikeEmail(email)) {
    showError("email", "Enter a valid email like you@example.com.");
    ok = false;
  }

  if (password === "") {
    showError("password", "Password is required.");
    ok = false;
  }

  if (ok === false) {
    return false; // stop, the red messages are on the screen
  }

  // 2. check the account
  let user = findUser(email);

  if (user === null || user.password !== password) {
    // same message for a wrong email and a wrong password (do not give hints)
    failedAttempts++;
    document.getElementById("password").value = "";

    if (failedAttempts >= maxAttempts) {
      lockForm();
    } else {
      let left = maxAttempts - failedAttempts;
      showMessage(
        "login-msg",
        "Invalid email or password. " +
          left +
          (left === 1 ? " attempt" : " attempts") +
          " left.",
        "error",
      );
    }
    return false;
  }

  // the password is right, but the account may be switched off
  if (user.status !== "Active") {
    showMessage(
      "login-msg",
      "This account is deactivated. Please contact the clinic.",
      "warn",
    );
    return false;
  }

  // 3. success
  failedAttempts = 0;
  saveRememberedEmail(email);
  document.getElementById("login-btn").disabled = true;
  showMessage(
    "login-msg",
    "Welcome back, " +
      user.name +
      "! Opening your " +
      roleLabel(user.role) +
      " dashboard…",
    "ok",
  );

  setTimeout(function () {
    window.location.href = pageFor(user.role);
  }, 800);

  return false; // the redirect above does the work (PHP will do it later)
}

// ---------- forgot password ----------

function showForgot() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("forgotForm").style.display = ""; // "" = back to the CSS default
  document.getElementById("login-title").innerHTML = "Reset your password";
  document.getElementById("login-eyebrow").innerHTML = "ACCOUNT HELP";
  document.getElementById("login-subtitle").innerHTML =
    "We will send a reset link to your email address.";
  document.getElementById("reset_email").value =
    document.getElementById("email").value;
  document.getElementById("reset_email").focus();
  return false; // the link must not jump to "#"
}

function hideForgot() {
  clearErrors(["reset_email"]);
  hideMessage("forgot-msg");
  document.getElementById("forgotForm").style.display = "none";
  document.getElementById("loginForm").style.display = ""; // "" = back to the CSS default
  document.getElementById("login-title").innerHTML = "Sign in to HeartCare";
  document.getElementById("login-eyebrow").innerHTML = "WELCOME BACK";
  document.getElementById("login-subtitle").innerHTML =
    "Access your account and manage your healthcare journey.";
}

// onsubmit="return sendReset()"
function sendReset() {
  clearErrors(["reset_email"]);
  hideMessage("forgot-msg");

  let email = document.getElementById("reset_email").value.trim();

  if (email === "") {
    showError("reset_email", "Email is required.");
    return false;
  }
  if (!looksLikeEmail(email)) {
    showError("reset_email", "Enter a valid email like you@example.com.");
    return false;
  }

  // The same message whether the email exists or not, so nobody can
  // find out which emails have an account. (PHP will really send the email.)
  showMessage(
    "forgot-msg",
    "If an account exists for " +
      email +
      ", a password reset link has been sent.",
    "ok",
  );
  return false;
}

// ---------- demo accounts (for testing, remove before real use) ----------

function renderDemoAccounts() {
  let html = "";

  for (let i = 0; i < users.length; i++) {
    let u = users[i];
    let extra = u.status === "Active" ? "" : " · Inactive";

    html +=
      '<div class="demo-item">' +
      "<div><strong>" +
      roleLabel(u.role) +
      extra +
      "</strong><small>" +
      u.email +
      "</small></div>" +
      '<button type="button" class="demo-use" onclick="fillDemo(' +
      i +
      ')">Use</button>' +
      "</div>";
  }

  document.getElementById("demo-list").innerHTML = html;
}

// "Use" button: fill the form with that demo account
function fillDemo(index) {
  clearErrors(loginFields);
  hideMessage("login-msg");
  document.getElementById("email").value = users[index].email;
  document.getElementById("password").value = users[index].password;
  document.getElementById("password").focus();
}

// Run when the page loads
renderDemoAccounts();
loadRememberedEmail();
document.getElementById("email").focus();
