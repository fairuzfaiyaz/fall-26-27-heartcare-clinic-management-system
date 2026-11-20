// Sample patient and laboratory report data
var patients = [
    {
        patientId: "P-1001",
        patientName: "Ahmed Rahman",
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

                parameters: [
                    {
                        name: "Hemoglobin",
                        result: "13.5 g/dL",
                        referenceRange: "12–16 g/dL",
                        status: "Normal"
                    },
                    {
                        name: "WBC",
                        result: "7,500 /µL",
                        referenceRange: "4,000–11,000 /µL",
                        status: "Normal"
                    },
                    {
                        name: "Platelets",
                        result: "250,000 /µL",
                        referenceRange: "150,000–450,000 /µL",
                        status: "Normal"
                    }
                ],

                technician: "Lab Technician A",
                verifiedBy: "Dr. Hasan",
                remarks: "No significant abnormality detected.",
                authorizedBy: "Dr. Hasan",
                authorizationDate: "26 Oct 2026"
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

                parameters: [],

                technician: "Lab Technician A",
                verifiedBy: "Not Verified",
                remarks: "Detailed test result is not available in this sample data.",
                authorizedBy: "Pending",
                authorizationDate: "Not Authorized"
            }
        ]
    },

    {
        patientId: "P-1002",
        patientName: "Sarah Rahman",
        age: "28 Years",
        gender: "Female",
        contact: "018XXXXXXXX",

        reports: [
            {
                reportId: "LR-1003",
                testName: "Lipid Profile",
                category: "Biochemistry",
                sampleDate: "28 Oct 2026",
                reportDate: "29 Oct 2026",
                doctor: "Dr. Karim",

                result: "Normal",
                authorization: "Authorized",

                parameters: [
                    {
                        name: "Total Cholesterol",
                        result: "180 mg/dL",
                        referenceRange: "Below 200 mg/dL",
                        status: "Normal"
                    }
                ],

                technician: "Lab Technician B",
                verifiedBy: "Dr. Hasan",
                remarks: "Report verified.",
                authorizedBy: "Dr. Hasan",
                authorizationDate: "29 Oct 2026"
            }
        ]
    }
];