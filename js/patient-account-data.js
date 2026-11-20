// // patient-account-data.js
// // The logged-in patient. Every patient page loads this file FIRST, so the
// // name and initials in the sidebar and top bar come from here, not from HTML.
// // Later: $_SESSION['user_id'] + a SELECT from the patients table.
// const patient = {
//   id: "HC-P-00125",
//   fullName: "Nazibha Tabassum",
//   email: "nazibha@example.com",
//   phone: "01712345678",
//   dob: "2003-03-15",
//   status: "Active",
// };

// patient-account-data.js

// Stores the currently logged-in patient's information.
// Later: PHP session + SELECT from the patients table.

// const patient = {
//   id: "HC-P-00125",
//   fullName: "Nazibha Tabassum",
//   email: "nazibha@example.com",
//   phone: "01712345678",
//   dob: "2003-03-15",
//   gender: "Prefer not to say",
//   address: "",
//   emergencyName: "",
//   emergencyPhone: "",
//   status: "Active",
// };

// patient-account-data.js

// Stores the currently logged-in patient's information.
// Later: PHP session + SELECT from the patients table.

const patient = {
  id: "HC-P-00125",
  fullName: "Nazibha Tabassum",
  email: "nazibha@example.com",
  phone: "01712345678",
  dob: "2003-03-15",
  gender: "Prefer not to say",
  address: "",
  emergencyName: "",
  emergencyPhone: "",
  status: "Active",
};
