/*
    File: doctor-laboratory-tests-data.js

    Purpose:
    Store laboratory test information
    and laboratory order records.
*/

// Available laboratory tests
const laboratoryTests = [
  {
    name: "CBC",
    fullName: "Complete Blood Count (CBC)",
    category: "Hematology",
    price: 500,
  },

  {
    name: "Blood Sugar",
    fullName: "Blood Sugar (Fasting)",
    category: "Biochemistry",
    price: 300,
  },

  {
    name: "Lipid Profile",
    fullName: "Lipid Profile",
    category: "Biochemistry",
    price: 900,
  },

  {
    name: "ECG",
    fullName: "ECG",
    category: "Cardiology",
    price: 500,
  },

  {
    name: "Troponin I",
    fullName: "Troponin I",
    category: "Cardiac Marker",
    price: 1200,
  },

  {
    name: "Echocardiogram",
    fullName: "Echocardiogram",
    category: "Cardiology",
    price: 2500,
  },

  {
    name: "Chest X-Ray",
    fullName: "Chest X-Ray",
    category: "Radiology",
    price: 800,
  },

  {
    name: "Kidney Function",
    fullName: "Kidney Function Test",
    category: "Biochemistry",
    price: 1000,
  },
];

// Temporary laboratory order records
let laboratoryOrders = [
  {
    orderId: "LAB-00125",

    patientId: "HC-P-00125",

    patientName: "Fairuz Ahmed",

    age: 35,

    gender: "Male",

    appointmentId: "APT-00125",

    orderDate: "2026-10-31",

    tests: ["ECG"],

    priority: "Normal",

    collectionDate: "2026-10-31",

    instructions: "Regular test.",

    totalPrice: 500,

    status: "Completed",
  },

  {
    orderId: "LAB-00126",

    patientId: "HC-P-00131",

    patientName: "Nusrat Jahan",

    age: 27,

    gender: "Female",

    appointmentId: "APT-00131",

    orderDate: "2026-10-31",

    tests: ["CBC", "Lipid Profile"],

    priority: "Urgent",

    collectionDate: "2026-11-01",

    instructions: "Complete both tests.",

    totalPrice: 1400,

    status: "Pending",
  },

  {
    orderId: "LAB-00127",

    patientId: "HC-P-00142",

    patientName: "Mahmud Hasan",

    age: 45,

    gender: "Male",

    appointmentId: "APT-00142",

    orderDate: "2026-10-30",

    tests: ["Troponin I"],

    priority: "Emergency",

    collectionDate: "2026-10-30",

    instructions: "Urgent cardiac test.",

    totalPrice: 1200,

    status: "Processing",
  },
];

// Order ID counter
let laboratoryOrderCounter = 128;

// Index of the order currently being edited
let laboratoryEditIndex = -1;
