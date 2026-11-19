// data.js
// All dashboard data lives here in plain objects and arrays.
// Later (PHP + MySQL) these will come from the database instead.

// Numbers shown in the four KPI cards
const stats = {
  patients: 1248,
  newPatients: 32,
  doctors: 18,
  departments: 6,
  todayAppointments: 42,
  pending: 9,
  revenue: 482500,
};

// Array of objects: today's appointments
const appointments = [
  {
    time: "10:00 AM",
    patient: "Fairuz Ahmed",
    doctor: "Dr. Rahman",
    department: "Cardiology",
    status: "Confirmed",
  },
  {
    time: "10:30 AM",
    patient: "Nusrat Jahan",
    doctor: "Dr. Sultana",
    department: "Preventive Care",
    status: "Pending",
  },
  {
    time: "11:00 AM",
    patient: "Tanvir Hasan",
    doctor: "Dr. Rahman",
    department: "Cardiology",
    status: "Completed",
  },
  {
    time: "11:30 AM",
    patient: "Maliha Karim",
    doctor: "Dr. Chowdhury",
    department: "General Medicine",
    status: "Cancelled",
  },
];

// Array of objects: latest audit log entries
const activities = [
  { time: "11:05", who: "Admin", text: "updated doctor fee · Doctor #6" },
  {
    time: "10:32",
    who: "Lab Technician",
    text: "added result · Lab order #28",
  },
  {
    time: "10:15",
    who: "Dr. Rahman",
    text: "completed consultation · Appointment #14",
  },
  { time: "09:48", who: "Admin", text: "deactivated account · User #41" },
];

// Chart data: labels and values are two arrays with the same length
const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const appointmentsPerMonth = [180, 205, 192, 230, 248, 271];
const revenuePerMonth = [310000, 345000, 328000, 402000, 439000, 482500];

const departmentNames = [
  "Cardiology",
  "General Medicine",
  "Preventive Care",
  "Pathology",
  "Pediatrics",
];
const departmentVisits = [96, 74, 58, 31, 12];
