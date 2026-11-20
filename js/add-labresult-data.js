
/* ==============================
   PATIENT DATA
============================== */

var patientData = [

    {
        patientId: "P-1001",
        patientName: "Ahmed Rahman",
        age: 35,
        gender: "Male"
    },

    {
        patientId: "P-1002",
        patientName: "Sarah Rahman",
        age: 28,
        gender: "Female"
    },

    {
        patientId: "P-1003",
        patientName: "Mahmud Karim",
        age: 42,
        gender: "Male"
    },

    {
        patientId: "P-1004",
        patientName: "Fatema Noor",
        age: 31,
        gender: "Female"
    },

    {
        patientId: "P-1005",
        patientName: "Rafiq Hasan",
        age: 45,
        gender: "Male"
    }

];


/* ==============================
   TEST CATALOGUE DATA
============================== */

var testData = [

    {
        code: "TC001",
        name: "Complete Blood Count",
        unit: "-",
        referenceRange: "Depends on individual parameters"
    },

    {
        code: "TC002",
        name: "Hemoglobin",
        unit: "g/dL",
        referenceRange: "12.0-16.0"
    },

    {
        code: "TC003",
        name: "Blood Glucose (Fasting)",
        unit: "mg/dL",
        referenceRange: "70-99"
    },

    {
        code: "TC004",
        name: "Serum Creatinine",
        unit: "mg/dL",
        referenceRange: "0.6-1.3"
    },

    {
        code: "TC005",
        name: "Lipid Profile",
        unit: "mg/dL",
        referenceRange: "Varies by parameter"
    },

    {
        code: "TC006",
        name: "Urine Routine Examination",
        unit: "-",
        referenceRange: "Normal findings"
    },

    {
        code: "TC007",
        name: "Thyroid Stimulating Hormone",
        unit: "mIU/L",
        referenceRange: "0.4-4.0"
    }

];


/* ==============================
   RECENT LAB RESULTS DATA
============================== */

var recentResults = [

    {
        patientId: "P-1024",
        testName: "Hemoglobin",
        status: "Normal",
        time: "Today, 10:30 AM"
    },

    {
        patientId: "P-1031",
        testName: "Blood Glucose",
        status: "Abnormal",
        time: "Today, 09:45 AM"
    },

    {
        patientId: "P-1018",
        testName: "Serum Creatinine",
        status: "Normal",
        time: "Yesterday, 04:20 PM"
    }

];


/* ==============================
   RESULT OVERVIEW DATA
============================== */

var resultOverview = {

    normal: 20,

    abnormal: 8,

    pending: 4

};


/* ==============================
   SAVED LAB RESULTS
============================== */

var savedLabResults = [];
