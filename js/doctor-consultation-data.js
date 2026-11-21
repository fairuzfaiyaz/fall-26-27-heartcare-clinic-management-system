/*
    File: doctor-consultation-data.js
    Purpose: Store patient information, vital signs
    and consultation records.
*/

// Patient information
const consultationPatients = [
  {
    patientId: "HC-P-00125",
    patientName: "Fairuz Ahmed",
    age: 35,
    gender: "Male",
    appointmentDate: "31 Oct 2026",
    phone: "01712345678",
    bloodGroup: "B+",
    status: "Completed",

    heartRate: "82",
    bloodPressure: "120/80",
    temperature: "98.6",
    oxygenLevel: "98",

    symptoms: "Chest discomfort during physical activity.",
    diagnosis: "Mild cardiovascular symptoms.",
    treatment: "Regular exercise and follow-up.",
    notes: "Patient condition is stable.",
  },

  {
    patientId: "HC-P-00131",
    patientName: "Nusrat Jahan",
    age: 27,
    gender: "Female",
    appointmentDate: "31 Oct 2026",
    phone: "01812345678",
    bloodGroup: "A+",
    status: "Pending",

    heartRate: "88",
    bloodPressure: "110/75",
    temperature: "99.1",
    oxygenLevel: "97",

    symptoms: "",
    diagnosis: "",
    treatment: "",
    notes: "",
  },

  {
    patientId: "HC-P-00142",
    patientName: "Mahmud Hasan",
    age: 45,
    gender: "Male",
    appointmentDate: "31 Oct 2026",
    phone: "01912345678",
    bloodGroup: "O+",
    status: "Pending",

    heartRate: "76",
    bloodPressure: "130/85",
    temperature: "98.4",
    oxygenLevel: "96",

    symptoms: "",
    diagnosis: "",
    treatment: "",
    notes: "",
  },
];

// Consultation records
const consultationRecords = [
  {
    patientId: "HC-P-00125",
    symptoms: "Chest discomfort during physical activity.",
    diagnosis: "Mild cardiovascular symptoms.",
    treatment: "Regular exercise and follow-up.",
    notes: "Patient condition is stable.",
  },
];
