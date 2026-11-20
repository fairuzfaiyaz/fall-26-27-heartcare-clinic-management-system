/* =====================================
   PATIENT DATA
===================================== */

const patients = [
  {
    id: "HC-P-00125",
    name: "Fairuz Ahmed",
    age: 35,
    gender: "Male",
    bloodGroup: "B+",
    phone: "01712345678",
    department: "Cardiology",
    firstVisit: "12 March 2026",
    bloodPressure: "120/80",
    heartRate: 76,
    temperature: 98.6,
    weight: 68,
  },

  {
    id: "HC-P-00131",
    name: "Nusrat Jahan",
    age: 27,
    gender: "Female",
    bloodGroup: "A+",
    phone: "01812345678",
    department: "Cardiology",
    firstVisit: "15 March 2026",
    bloodPressure: "110/75",
    heartRate: 88,
    temperature: 99.1,
    weight: 58,
  },

  {
    id: "HC-P-00142",
    name: "Mahmud Hasan",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    phone: "01912345678",
    department: "Cardiology",
    firstVisit: "20 March 2026",
    bloodPressure: "130/85",
    heartRate: 76,
    temperature: 98.4,
    weight: 75,
  },
];

/* =====================================
   MEDICAL HISTORY RECORDS
===================================== */

let timelineRecords = [
  {
    id: "REC-001",
    patientId: "HC-P-00125",
    type: "Consultation",
    title: "Cardiology Follow-up",
    date: "2026-10-31",
    doctor: "Dr. Badhon Pal",
    status: "Completed",
    details:
      "Patient reported improvement in general condition. Blood pressure was monitored.",
  },

  {
    id: "REC-002",
    patientId: "HC-P-00125",
    type: "Prescription",
    title: "Medication Prescribed",
    date: "2026-10-31",
    doctor: "Dr. Badhon Pal",
    status: "Issued",
    details:
      "Sample medication record. Follow the instructions written in the prescription.",
  },

  {
    id: "REC-003",
    patientId: "HC-P-00125",
    type: "Laboratory",
    title: "Laboratory Test Report",
    date: "2026-10-25",
    doctor: "Dr. Badhon Pal",
    status: "Completed",
    details: "ECG test completed. Report available.",
  },

  {
    id: "REC-004",
    patientId: "HC-P-00125",
    type: "Consultation",
    title: "Initial Cardiology Consultation",
    date: "2026-03-12",
    doctor: "Dr. Badhon Pal",
    status: "Completed",
    details: "Initial patient assessment and medical history collection.",
  },

  {
    id: "REC-005",
    patientId: "HC-P-00131",
    type: "Consultation",
    title: "General Checkup",
    date: "2026-10-31",
    doctor: "Dr. Badhon Pal",
    status: "Pending",
    details: "General patient checkup.",
  },

  {
    id: "REC-006",
    patientId: "HC-P-00131",
    type: "Laboratory",
    title: "Blood Test",
    date: "2026-10-30",
    doctor: "Dr. Badhon Pal",
    status: "Processing",
    details: "Blood sample submitted for laboratory testing.",
  },

  {
    id: "REC-007",
    patientId: "HC-P-00142",
    type: "Laboratory",
    title: "Troponin I Test",
    date: "2026-10-30",
    doctor: "Dr. Badhon Pal",
    status: "Processing",
    details: "Troponin I test is being processed.",
  },
];

/* =====================================
   GLOBAL VARIABLES
===================================== */

let selectedPatientId = "HC-P-00125";

let editIndex = -1;

let currentFilter = "All";

let nextRecordNumber = 8;
