// patient-book-appointment-data.js
// Data for patient-book-appointment.php (arrays of objects).
// Later: departments and doctors come from MySQL, and "booked" comes from the
// appointments table (UNIQUE doctor_id + date + start_time).

const departments = [
  "Cardiology",
  "General Medicine",
  "Preventive Care",
  "Pathology",
  "Neurology",
  "Endocrinology",
];

const doctors = [
  // Cardiology
  { name: "Dr. Rahman", department: "Cardiology", fee: 1000 },
  { name: "Dr. Haque", department: "Cardiology", fee: 1200 },
  { name: "Dr. Farhana Ahmed", department: "Cardiology", fee: 1100 },
  { name: "Dr. Kamal Hossain", department: "Cardiology", fee: 1300 },
  { name: "Dr. Mahmud Hasan", department: "Cardiology", fee: 1500 },

  // General Medicine
  { name: "Dr. Chowdhury", department: "General Medicine", fee: 700 },
  { name: "Dr. Arif Hossain", department: "General Medicine", fee: 800 },
  { name: "Dr. Nusrat Karim", department: "General Medicine", fee: 900 },
  { name: "Dr. Imran Kabir", department: "General Medicine", fee: 750 },

  // Preventive Care
  { name: "Dr. Sultana", department: "Preventive Care", fee: 800 },
  { name: "Dr. Samira Islam", department: "Preventive Care", fee: 900 },
  { name: "Dr. Tanjina Rahman", department: "Preventive Care", fee: 850 },
  { name: "Dr. Fahim Ahmed", department: "Preventive Care", fee: 1000 },

  // Pathology
  { name: "Dr. Rezaul Karim", department: "Pathology", fee: 900 },
  { name: "Dr. Sharmeen Akter", department: "Pathology", fee: 1000 },
  { name: "Dr. Tanvir Hasan", department: "Pathology", fee: 850 },

  // Neurology
  { name: "Dr. Saif Uddin", department: "Neurology", fee: 1400 },
  { name: "Dr. Mehedi Hasan", department: "Neurology", fee: 1300 },
  { name: "Dr. Lamia Sultana", department: "Neurology", fee: 1500 },

  // Endocrinology
  { name: "Dr. Sadia Rahman", department: "Endocrinology", fee: 1100 },
  { name: "Dr. Faisal Ahmed", department: "Endocrinology", fee: 1200 },
];

// Every doctor works 10:00 - 12:00 with 30-minute slots (24 hour text)
const allSlots = ["10:00", "10:30", "11:00", "11:30"];

// Slots that are already taken. A new booking is push()ed here.
let booked = [
  // November 23
  { doctor: "Dr. Sultana", date: "2026-11-23", time: "10:00" },
  { doctor: "Dr. Rahman", date: "2026-11-23", time: "11:00" },
  { doctor: "Dr. Haque", date: "2026-11-23", time: "10:30" },
  { doctor: "Dr. Chowdhury", date: "2026-11-23", time: "11:30" },
  { doctor: "Dr. Farhana Ahmed", date: "2026-11-23", time: "10:00" },
  { doctor: "Dr. Samira Islam", date: "2026-11-23", time: "11:00" },

  // November 24
  { doctor: "Dr. Rahman", date: "2026-11-24", time: "10:30" },
  { doctor: "Dr. Rahman", date: "2026-11-24", time: "11:00" },
  { doctor: "Dr. Haque", date: "2026-11-24", time: "10:00" },
  { doctor: "Dr. Haque", date: "2026-11-24", time: "11:30" },
  { doctor: "Dr. Chowdhury", date: "2026-11-24", time: "10:30" },
  { doctor: "Dr. Sultana", date: "2026-11-24", time: "11:00" },
  { doctor: "Dr. Arif Hossain", date: "2026-11-24", time: "10:00" },
  { doctor: "Dr. Rezaul Karim", date: "2026-11-24", time: "11:30" },

  // November 25
  { doctor: "Dr. Rahman", date: "2026-11-25", time: "10:00" },
  { doctor: "Dr. Rahman", date: "2026-11-25", time: "11:30" },
  { doctor: "Dr. Haque", date: "2026-11-25", time: "10:30" },
  { doctor: "Dr. Sultana", date: "2026-11-25", time: "10:00" },
  { doctor: "Dr. Sultana", date: "2026-11-25", time: "11:30" },
  { doctor: "Dr. Kamal Hossain", date: "2026-11-25", time: "11:00" },
  { doctor: "Dr. Saif Uddin", date: "2026-11-25", time: "10:30" },

  // November 26
  { doctor: "Dr. Rahman", date: "2026-11-26", time: "11:00" },
  { doctor: "Dr. Chowdhury", date: "2026-11-26", time: "10:00" },
  { doctor: "Dr. Nusrat Karim", date: "2026-11-26", time: "10:30" },
  { doctor: "Dr. Tanjina Rahman", date: "2026-11-26", time: "11:30" },
  { doctor: "Dr. Lamia Sultana", date: "2026-11-26", time: "10:00" },

  // November 27
  { doctor: "Dr. Haque", date: "2026-11-27", time: "11:00" },
  { doctor: "Dr. Sultana", date: "2026-11-27", time: "10:30" },
  { doctor: "Dr. Imran Kabir", date: "2026-11-27", time: "11:30" },
  { doctor: "Dr. Sharmeen Akter", date: "2026-11-27", time: "10:00" },
  { doctor: "Dr. Faisal Ahmed", date: "2026-11-27", time: "11:00" },

  // November 28
  { doctor: "Dr. Rahman", date: "2026-11-28", time: "10:30" },
  { doctor: "Dr. Chowdhury", date: "2026-11-28", time: "11:00" },
  { doctor: "Dr. Farhana Ahmed", date: "2026-11-28", time: "11:30" },
  { doctor: "Dr. Fahim Ahmed", date: "2026-11-28", time: "10:00" },
  { doctor: "Dr. Mehedi Hasan", date: "2026-11-28", time: "10:30" },

  // November 30
  { doctor: "Dr. Haque", date: "2026-11-30", time: "10:00" },
  { doctor: "Dr. Sultana", date: "2026-11-30", time: "11:30" },
  { doctor: "Dr. Mahmud Hasan", date: "2026-11-30", time: "10:30" },
  { doctor: "Dr. Sadia Rahman", date: "2026-11-30", time: "11:00" },

  // December 1
  { doctor: "Dr. Rahman", date: "2026-12-01", time: "10:30" },
  { doctor: "Dr. Chowdhury", date: "2026-12-01", time: "11:30" },
  { doctor: "Dr. Rezaul Karim", date: "2026-12-01", time: "10:00" },
  { doctor: "Dr. Saif Uddin", date: "2026-12-01", time: "11:00" },

  // December 2
  { doctor: "Dr. Haque", date: "2026-12-02", time: "10:30" },
  { doctor: "Dr. Sultana", date: "2026-12-02", time: "10:00" },
  { doctor: "Dr. Nusrat Karim", date: "2026-12-02", time: "11:00" },
  { doctor: "Dr. Lamia Sultana", date: "2026-12-02", time: "11:30" },
];
