/*
    File: doctor-prescription-data.js
    Purpose: Store doctor prescription records.
*/

// Temporary prescription records
const doctorPrescriptions = [
  {
    prescriptionId: "RX-2026-00125",
    prescriptionDate: "2026-10-31",
    followupDate: "",
    patientName: "Fairuz Ahmed",
    patientId: "HC-P-00125",
    age: 35,
    gender: "Male",
    bloodGroup: "B+",
    phone: "01712345678",

    diagnosis: "Cardiac follow-up",

    medicines: [
      {
        name: "Sample Medicine",
        dosage: "500 mg",
        frequency: "1+0+1",
        duration: "7 days",
        instruction: "After meal",
      },
    ],

    advice: "Follow doctor's instructions.",
    followupInstructions: "Return for follow-up.",
  },
];

// Prescription ID counter
let prescriptionCounter = 126;

// Currently editing prescription
let prescriptionEditIndex = -1;
