// patient-health-tracker-data.js
// Data for health-tracker.php.
// Later: SELECT ... FROM health_entries WHERE patient_id = $_SESSION['user_id']

// The kinds of measurement (used for the drop-downs)
const measurementTypes = ["Blood pressure", "Blood glucose", "Weight"];

// Glucose readings depend on when they were taken
const glucoseContexts = ["Fasting", "Before meal", "After meal", "Random"];

// One object per measurement, newest first.
//   Blood pressure: value = systolic, value2 = diastolic
//   Blood glucose : value = mg/dL, context = when it was taken (value2 = 0)
//   Weight        : value = kg (value2 = 0)
let healthLog = [
  {
    date: "2026-10-28",
    type: "Blood pressure",
    value: 118,
    value2: 78,
    context: "",
    note: "",
  },
  {
    date: "2026-10-27",
    type: "Blood glucose",
    value: 95,
    value2: 0,
    context: "Fasting",
    note: "",
  },
  {
    date: "2026-10-25",
    type: "Weight",
    value: 71.0,
    value2: 0,
    context: "",
    note: "",
  },
  {
    date: "2026-10-21",
    type: "Blood pressure",
    value: 122,
    value2: 80,
    context: "",
    note: "",
  },
  {
    date: "2026-10-18",
    type: "Blood glucose",
    value: 118,
    value2: 0,
    context: "After meal",
    note: "",
  },
  {
    date: "2026-10-14",
    type: "Blood pressure",
    value: 142,
    value2: 92,
    context: "",
    note: "Felt stressed",
  },
  {
    date: "2026-10-12",
    type: "Weight",
    value: 71.4,
    value2: 0,
    context: "",
    note: "",
  },
  {
    date: "2026-10-08",
    type: "Blood glucose",
    value: 102,
    value2: 0,
    context: "Fasting",
    note: "",
  },
];

// Configured reference ranges. They are only a guide, NOT a diagnosis.
const bloodPressureRange = { sysMin: 90, sysMax: 129, diaMin: 60, diaMax: 84 };
const weightRange = { min: 45, max: 90 };
const glucoseRanges = [
  { context: "Fasting", min: 70, max: 99 },
  { context: "Before meal", min: 70, max: 130 },
  { context: "After meal", min: 70, max: 140 },
  { context: "Random", min: 70, max: 140 },
];
