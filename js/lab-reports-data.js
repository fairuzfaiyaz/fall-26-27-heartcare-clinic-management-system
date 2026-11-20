
/* =====================================
   LAB REPORTS DATA
===================================== */

// Store patient information and laboratory reports.

var patients = [
    {
        patientName: "Ahmed Rahman",
        patientId: "P-1001",
        age: "35 Years",
        gender: "Male",
        contact: "017XXXXXXXX",

        reports: [
            {
                reportId: "LR-1001",
                testName: "Complete Blood Count (CBC)",
                category: "Hematology",
                sampleDate: "25 Oct 2026",
                reportDate: "26 Oct 2026",
                doctor: "Dr. Rahman",
                result: "Normal",
                authorization: "Authorized",
                technician: "Lab Technician A",
                verifiedBy: "Dr. Hasan",
                authorizationDate: "26 Oct 2026",
                remarks: "No significant abnormality detected.",

                parameters: [
                    {
                        name: "Hemoglobin",
                        value: "13.5 g/dL",
                        reference: "12–16 g/dL",
                        status: "Normal"
                    },
                    {
                        name: "WBC",
                        value: "7,500 /µL",
                        reference: "4,000–11,000 /µL",
                        status: "Normal"
                    },
                    {
                        name: "Platelets",
                        value: "250,000 /µL",
                        reference: "150,000–450,000 /µL",
                        status: "Normal"
                    }
                ]
            },

            {
                reportId: "LR-1002",
                testName: "Blood Glucose",
                category: "Biochemistry",
                sampleDate: "27 Oct 2026",
                reportDate: "27 Oct 2026",
                doctor: "Dr. Rahman",
                result: "Abnormal",
                authorization: "Pending",
                technician: "Not provided",
                verifiedBy: "Not provided",
                authorizationDate: "Pending",
                remarks: "Doctor's remarks are not available.",

                parameters: []
            }
        ]
    }
];
