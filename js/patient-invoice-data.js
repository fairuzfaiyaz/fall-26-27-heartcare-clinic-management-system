/* ==========================================================================
   HeartCare Clinic - Billing & Invoices: sample data (frontend only)
   File: js/patient-invoice-data.js
   Load this BEFORE js/patient-invoice.js.
   Later PHP/MySQL replaces these arrays with rows from the database
   (only the logged-in patient's invoices, line items and saved methods).
   ========================================================================== */

/* ---------- Logged-in patient (later: $_SESSION) ---------- */
const currentPatient = { id: "HC-P-00125", name: "Nazibha Tabassum" };

/* ---------- Billing: invoices ----------
   status: "unpaid" or "paid"
   due: "" when already paid
   paidOn / ref / method are filled in when status is "paid"
   Fees must come from the database in PHP, never from the browser. */
const invoices = [
  {
    id: "INV-00132",
    issued: "2026-11-18",
    due: "2026-12-02",
    doctor: "Dr. Rahman · Cardiology",
    status: "unpaid",
    items: [
      { name: "Consultation fee", amount: 1000 },
      { name: "ECG test", amount: 800 },
      { name: "Blood test", amount: 500 },
    ],
    paidOn: "",
    ref: "",
    method: "",
  },
  {
    id: "INV-00131",
    issued: "2026-11-14",
    due: "",
    doctor: "Dr. Sultana · Preventive Care",
    status: "paid",
    items: [
      { name: "Consultation fee", amount: 800 },
      { name: "Blood glucose test", amount: 400 },
    ],
    paidOn: "2026-11-14",
    ref: "TXN-20261114-0131",
    method: "Visa •••• 4242",
  },
  {
    id: "INV-00129",
    issued: "2026-11-10",
    due: "",
    doctor: "Dr. Haque · Cardiology",
    status: "paid",
    items: [
      { name: "Consultation fee", amount: 1200 },
      { name: "Lipid profile", amount: 900 },
    ],
    paidOn: "2026-11-10",
    ref: "TXN-20261110-0129",
    method: "Mastercard •••• 1881",
  },
  {
    id: "INV-00125",
    issued: "2026-10-20",
    due: "2026-11-04",
    doctor: "Dr. Rahman · Cardiology",
    status: "unpaid",
    items: [
      { name: "Consultation fee", amount: 1000 },
      { name: "Laboratory test A", amount: 500 },
      { name: "Laboratory test B", amount: 300 },
    ],
    paidOn: "",
    ref: "",
    method: "",
  },
  {
    id: "INV-00122",
    issued: "2026-10-15",
    due: "",
    doctor: "Dr. Chowdhury · General Medicine",
    status: "paid",
    items: [
      { name: "Consultation fee", amount: 700 },
      { name: "Complete blood count", amount: 600 },
    ],
    paidOn: "2026-10-16",
    ref: "TXN-20261016-0122",
    method: "Visa •••• 4242",
  },
  {
    id: "INV-00108",
    issued: "2026-10-05",
    due: "",
    doctor: "Dr. Rahman · Cardiology",
    status: "paid",
    items: [{ name: "Cardiology consultation", amount: 1000 }],
    paidOn: "2026-10-05",
    ref: "TXN-20261005-0108",
    method: "Visa •••• 4242",
  },
  {
    id: "INV-00098",
    issued: "2026-09-25",
    due: "",
    doctor: "Dr. Haque · Cardiology",
    status: "paid",
    items: [
      { name: "Consultation fee", amount: 1200 },
      { name: "ECG test", amount: 800 },
    ],
    paidOn: "2026-09-25",
    ref: "TXN-20260925-0098",
    method: "Mastercard •••• 1881",
  },
  {
    id: "INV-00091",
    issued: "2026-09-12",
    due: "",
    doctor: "Dr. Sultana · Preventive Care",
    status: "paid",
    items: [
      { name: "Consultation fee", amount: 800 },
      { name: "Laboratory test C", amount: 700 },
    ],
    paidOn: "2026-09-12",
    ref: "TXN-20260912-0091",
    method: "Mastercard •••• 1881",
  },
  {
    id: "INV-00083",
    issued: "2026-08-30",
    due: "",
    doctor: "Dr. Rahman · Cardiology",
    status: "paid",
    items: [
      { name: "Consultation fee", amount: 1000 },
      { name: "Blood glucose test", amount: 400 },
    ],
    paidOn: "2026-08-30",
    ref: "TXN-20260830-0083",
    method: "Visa •••• 4242",
  },
  {
    id: "INV-00072",
    issued: "2026-08-14",
    due: "",
    doctor: "Dr. Chowdhury · General Medicine",
    status: "paid",
    items: [
      { name: "Consultation fee", amount: 700 },
      { name: "Complete blood count", amount: 600 },
    ],
    paidOn: "2026-08-14",
    ref: "TXN-20260814-0072",
    method: "Mastercard •••• 1881",
  },
  {
    id: "INV-00061",
    issued: "2026-07-28",
    due: "",
    doctor: "Dr. Sultana · Preventive Care",
    status: "paid",
    items: [
      { name: "Consultation fee", amount: 800 },
      { name: "Lipid profile", amount: 900 },
    ],
    paidOn: "2026-07-28",
    ref: "TXN-20260728-0061",
    method: "Visa •••• 4242",
  },
  {
    id: "INV-00049",
    issued: "2026-07-10",
    due: "",
    doctor: "Dr. Rahman · Cardiology",
    status: "paid",
    items: [
      { name: "Cardiology consultation", amount: 1000 },
      { name: "ECG test", amount: 800 },
    ],
    paidOn: "2026-07-10",
    ref: "TXN-20260710-0049",
    method: "Mastercard •••• 1881",
  },
];

/* ---------- Saved payment methods (demo cards, no real numbers) ---------- */
const paymentMethods = [
  { id: 1, label: "Visa •••• 4242", tag: "Primary" },
  { id: 2, label: "Mastercard •••• 1881", tag: "" },
];
