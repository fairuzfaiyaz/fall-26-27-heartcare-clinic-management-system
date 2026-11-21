// login-data.js
// Demo accounts for login.html: an array of objects.
// FRONTEND ONLY. In the real system the passwords are never stored like this:
// PHP stores a hash (password_hash) in MySQL and checks it with
// password_verify(), then starts a session ($_SESSION['user_id'], ['role']).
//
// role   : decides which dashboard opens (admin, doctor, patient, labtech)
// status : "Active" or "Inactive". An Inactive account cannot sign in.
const users = [
  {
    name: "Clinic Admin",
    email: "admin@heartcare.com",
    password: "Admin123!",
    role: "admin",
    status: "Active",
  },
  {
    name: "Dr. Rahman",
    email: "doctor@heartcare.com",
    password: "Doctor123!",
    role: "doctor",
    status: "Active",
  },
  {
    name: "Nazibha Tabassum",
    email: "patient@heartcare.com",
    password: "Patient123!",
    role: "patient",
    status: "Active",
  },
  {
    name: "Rafiq Uddin",
    email: "labtech@heartcare.com",
    password: "Labtech123!",
    role: "labtech",
    status: "Active",
  },
  {
    name: "Dr. Islam",
    email: "islam@heartcare.com",
    password: "Islam123!",
    role: "doctor",
    status: "Inactive",
  },
];

// Sign-in rules
const maxAttempts = 5; // wrong passwords allowed in a row
const lockSeconds = 30; // how long the form stays locked after that
