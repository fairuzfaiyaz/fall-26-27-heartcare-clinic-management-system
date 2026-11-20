/* ==========================================================================
   HeartCare Clinic - sample data (frontend only)
   File: js/data.js
   Load this BEFORE the page's own script. Later PHP/MySQL replaces these
   arrays with rows from the database.
   ========================================================================== */

/* ---------- Health Tracker: patient's own measurements ---------- */
let measurements = [
  {
    id: 1,
    date: "2026-10-28",
    type: "bp",
    sys: 118,
    dia: 78,
    context: "",
    note: "",
  },
  {
    id: 2,
    date: "2026-10-27",
    type: "glucose",
    value: 95,
    context: "Fasting",
    note: "",
  },
  {
    id: 3,
    date: "2026-10-25",
    type: "weight",
    value: 71.0,
    context: "",
    note: "",
  },
  {
    id: 4,
    date: "2026-10-21",
    type: "bp",
    sys: 122,
    dia: 80,
    context: "",
    note: "",
  },
  {
    id: 5,
    date: "2026-10-18",
    type: "glucose",
    value: 118,
    context: "After meal",
    note: "",
  },
  {
    id: 6,
    date: "2026-10-14",
    type: "bp",
    sys: 142,
    dia: 92,
    context: "",
    note: "Felt stressed",
  },
  {
    id: 7,
    date: "2026-10-12",
    type: "weight",
    value: 71.4,
    context: "",
    note: "",
  },
  {
    id: 8,
    date: "2026-10-08",
    type: "glucose",
    value: 102,
    context: "Fasting",
    note: "",
  },
];
let nextId = 9; // always one more than the highest measurement id

/* ---------- Medical Records: written by doctors / lab staff (read-only) ----------
   type: "consultation" or "lab"
   detail: department for a consultation, report number for a lab test
   links: shortcuts shown under the record */
const medicalRecords = [
  {
    id: 1,
    date: "2026-10-20",
    type: "consultation",
    title: "Cardiology consultation",
    doctor: "Dr. Rahman",
    detail: "Cardiology",
    summary:
      "Recorded vitals: BP 120/80 mmHg, heart rate 72 bpm. Follow-up advised in 2 weeks.",
    links: [
      { label: "Prescription", href: "prescriptions.html" },
      { label: "Lab report", href: "lab-results.html" },
    ],
  },
  {
    id: 2,
    date: "2026-10-20",
    type: "lab",
    title: "Blood test ordered",
    doctor: "Dr. Rahman",
    detail: "LAB-0028",
    summary:
      "Fasting glucose, hemoglobin and cholesterol. Report completed the same day.",
    links: [{ label: "View report", href: "lab-results.html" }],
  },
  {
    id: 3,
    date: "2026-10-05",
    type: "consultation",
    title: "Cardiology consultation",
    doctor: "Dr. Rahman",
    detail: "Cardiology",
    summary: "Initial assessment and baseline measurements recorded.",
    links: [{ label: "Invoice INV-00108", href: "invoices.html" }],
  },
];

/* numbers for the "Reports" quick links on the Medical Records page */
const recordSummary = { prescriptions: 2, labReports: 1 };
