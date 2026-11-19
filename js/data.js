// data.js
// All dashboard data lives here in plain objects and arrays.
// Later (PHP + MySQL) these will come from the database instead.

// Numbers shown in the KPI cards
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
    time: "09:00 AM",
    patient: "Rafiq Uddin",
    doctor: "Dr. Haque",
    department: "Cardiology",
    status: "Confirmed",
  },
  {
    time: "09:30 AM",
    patient: "Sabina Yasmin",
    doctor: "Dr. Chowdhury",
    department: "General Medicine",
    status: "Pending",
  },
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
  {
    time: "12:00 PM",
    patient: "Imran Hossain",
    doctor: "Dr. Haque",
    department: "Cardiology",
    status: "Confirmed",
  },
  {
    time: "12:30 PM",
    patient: "Sharmin Akter",
    doctor: "Dr. Sultana",
    department: "Preventive Care",
    status: "Completed",
  },
  {
    time: "01:00 PM",
    patient: "Rakibul Islam",
    doctor: "Dr. Rahman",
    department: "Cardiology",
    status: "Pending",
  },
  {
    time: "01:30 PM",
    patient: "Tanjina Rahman",
    doctor: "Dr. Chowdhury",
    department: "General Medicine",
    status: "Confirmed",
  },
  {
    time: "02:00 PM",
    patient: "Arif Hossain",
    doctor: "Dr. Haque",
    department: "Cardiology",
    status: "Confirmed",
  },
  {
    time: "02:30 PM",
    patient: "Maliha Chowdhury",
    doctor: "Dr. Sultana",
    department: "Preventive Care",
    status: "Completed",
  },
  {
    time: "03:00 PM",
    patient: "Sabbir Ahmed",
    doctor: "Dr. Rahman",
    department: "Cardiology",
    status: "Pending",
  },
  {
    time: "03:30 PM",
    patient: "Jannatul Ferdous",
    doctor: "Dr. Chowdhury",
    department: "General Medicine",
    status: "Confirmed",
  },
  {
    time: "04:00 PM",
    patient: "Mehedi Hasan",
    doctor: "Dr. Haque",
    department: "Cardiology",
    status: "Confirmed",
  },
];

// Array of objects: latest audit log entries
const activities = [
  {
    time: "11:45",
    who: "Admin",
    text: "registered new patient · Patient #1249",
  },
  {
    time: "11:30",
    who: "Lab Technician",
    text: "completed blood test · Lab order #32",
  },
  {
    time: "11:15",
    who: "Dr. Rahman",
    text: "created prescription · Appointment #18",
  },
  {
    time: "11:05",
    who: "Admin",
    text: "updated doctor fee · Doctor #6",
  },
  {
    time: "10:55",
    who: "Patient",
    text: "booked appointment · Appointment #1072",
  },
  {
    time: "10:45",
    who: "Lab Technician",
    text: "collected sample · Lab order #31",
  },
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
  {
    time: "10:05",
    who: "Admin",
    text: "confirmed appointment · Appointment #1070",
  },
  {
    time: "09:48",
    who: "Admin",
    text: "deactivated account · User #41",
  },
  {
    time: "09:35",
    who: "Dr. Sultana",
    text: "updated patient health record · Patient #112",
  },
  {
    time: "09:20",
    who: "Patient",
    text: "updated profile information · Patient #205",
  },
  {
    time: "09:10",
    who: "Admin",
    text: "added new lab test · Test #30",
  },
  {
    time: "08:55",
    who: "Lab Technician",
    text: "started processing sample · Lab order #27",
  },
  {
    time: "08:40",
    who: "Admin",
    text: "registered new doctor · Doctor #19",
  },
];

// Chart data: labels and values have the same length
const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

const appointmentsPerMonth = [180, 205, 192, 230, 248, 271];

const revenuePerMonth = [310000, 345000, 328000, 402000, 439000, 482500];

// Department names and their corresponding visit counts
const departmentNames = [
  "Cardiology",
  "General Medicine",
  "Preventive Care",
  "Pathology",
  "Pediatrics",
  "Neurology",
];

const departmentVisits = [96, 74, 58, 31, 12, 24];
