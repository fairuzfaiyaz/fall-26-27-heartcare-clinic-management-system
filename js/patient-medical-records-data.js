// patient-medical-records-data.js
// Data for medical-records.html. These records are written by doctors and lab
// staff, so the patient can only READ them (no add / edit / delete).
// Later: SELECT ... FROM consultations, prescriptions, lab_results
//        WHERE patient_id = $_SESSION['user_id']   (a patient only sees HIS OWN records)
//
// Every record has: id, date, type, title, doctor, department.
// The rest depends on the type:
//   "Consultation": reason, diagnosis, bp, heartRate, weight, notes, followUp
//   "Prescription": medicines (array of objects), advice
//   "Lab report"  : orderNo, technician, results (array of objects)
// (Sample data only.)

const recordTypes = ["Consultation", "Prescription", "Lab report"];

let medicalRecords = [
  {
    id: 1,
    date: "2026-10-20",
    type: "Consultation",
    title: "Cardiology consultation",
    doctor: "Dr. Rahman",
    department: "Cardiology",
    reason: "Follow-up visit for blood pressure",
    diagnosis: "Elevated blood pressure, to be monitored",
    bp: "120/80 mmHg",
    heartRate: "72 bpm",
    weight: "71.0 kg",
    notes:
      "Lifestyle advice given. Continue recording your blood pressure at home.",
    followUp: "2026-11-03",
  },
  {
    id: 2,
    date: "2026-10-20",
    type: "Prescription",
    title: "Prescription",
    doctor: "Dr. Rahman",
    department: "Cardiology",
    medicines: [
      {
        name: "Amlodipine",
        dose: "5 mg",
        frequency: "Once daily, morning",
        duration: "30 days",
      },
      {
        name: "Atorvastatin",
        dose: "10 mg",
        frequency: "Once daily, night",
        duration: "30 days",
      },
    ],
    advice:
      "Take after meals. Reduce salt in your food and walk for 30 minutes a day.",
  },
  {
    id: 3,
    date: "2026-10-20",
    type: "Lab report",
    title: "Blood test report",
    doctor: "Dr. Rahman",
    department: "Cardiology",
    orderNo: "LAB-0028",
    technician: "Rafiq Uddin",
    results: [
      {
        test: "Fasting Blood Glucose",
        value: 95,
        unit: "mg/dL",
        min: 70,
        max: 99,
      },
      {
        test: "Total Cholesterol",
        value: 214,
        unit: "mg/dL",
        min: 0,
        max: 200,
      },
      { test: "Hemoglobin", value: 13.8, unit: "g/dL", min: 12, max: 17.5 },
      {
        test: "Serum Creatinine",
        value: 0.9,
        unit: "mg/dL",
        min: 0.6,
        max: 1.3,
      },
    ],
  },
  {
    id: 4,
    date: "2026-10-05",
    type: "Consultation",
    title: "Cardiology consultation",
    doctor: "Dr. Rahman",
    department: "Cardiology",
    reason: "First visit: occasional palpitations",
    diagnosis: "Initial assessment, no urgent findings",
    bp: "128/84 mmHg",
    heartRate: "76 bpm",
    weight: "71.4 kg",
    notes:
      "Baseline measurements recorded. Blood tests ordered for the next visit.",
    followUp: "2026-10-20",
  },
  {
    id: 5,
    date: "2026-10-05",
    type: "Prescription",
    title: "Prescription",
    doctor: "Dr. Rahman",
    department: "Cardiology",
    medicines: [
      {
        name: "Vitamin D3",
        dose: "1000 IU",
        frequency: "Once daily",
        duration: "60 days",
      },
    ],
    advice: "Take with food.",
  },
];
