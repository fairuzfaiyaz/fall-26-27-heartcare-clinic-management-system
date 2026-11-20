
/* =====================================
   LAB REPORTS FUNCTIONALITY
===================================== */

// Store the currently selected patient and report.

var currentPatientIndex = 0;
var currentReportIndex = 0;


/* =====================================
   SEARCH PATIENT
===================================== */

// Search patients using patient ID or patient name.

function searchPatient() {

    var patientId = document.getElementById("patientId").value;

    var patientName = document.getElementById("patientName").value;

    patientId = patientId.toLowerCase();
    patientName = patientName.toLowerCase();

    if (patientId === "" && patientName === "") {

        alert("Please enter a Patient ID or Patient Name.");

        return;
    }

    var foundIndex = -1;

    for (var i = 0; i < patients.length; i++) {

        var idMatch = true;
        var nameMatch = true;

        if (patientId !== "") {

            idMatch = patients[i].patientId.toLowerCase() === patientId;
        }

        if (patientName !== "") {

            nameMatch =
                patients[i].patientName.toLowerCase().indexOf(patientName) !== -1;
        }

        if (idMatch && nameMatch) {

            foundIndex = i;

            break;
        }
    }

    if (foundIndex !== -1) {

        currentPatientIndex = foundIndex;

        currentReportIndex = 0;

        renderPatientInformation();

        renderPatientReports();

        renderFullReport();

    }
    else {

        showNoPatientFound();
    }
}


/* =====================================
   DISPLAY PATIENT INFORMATION
===================================== */

// Display the selected patient's personal information.

function renderPatientInformation() {

    var patient = patients[currentPatientIndex];

    var patientHTML = "";

    patientHTML +=
        '<div>' +
            '<span>Patient Name</span>' +
            '<strong>' + patient.patientName + '</strong>' +
        '</div>';

    patientHTML +=
        '<div>' +
            '<span>Patient ID</span>' +
            '<strong>' + patient.patientId + '</strong>' +
        '</div>';

    patientHTML +=
        '<div>' +
            '<span>Age</span>' +
            '<strong>' + patient.age + '</strong>' +
        '</div>';

    patientHTML +=
        '<div>' +
            '<span>Gender</span>' +
            '<strong>' + patient.gender + '</strong>' +
        '</div>';

    patientHTML +=
        '<div>' +
            '<span>Contact Number</span>' +
            '<strong>' + patient.contact + '</strong>' +
        '</div>';

    document.getElementById("patient-information").innerHTML = patientHTML;
}


/* =====================================
   DISPLAY ALL PATIENT REPORTS
===================================== */

// Display every laboratory report belonging to the selected patient.

function renderPatientReports() {

    var patient = patients[currentPatientIndex];

    var reports = patient.reports;

    var tableHTML = "";

    for (var i = 0; i < reports.length; i++) {

        var report = reports[i];

        tableHTML +=
            '<tr>' +

                '<td>' + report.reportId + '</td>' +

                '<td>' + report.testName + '</td>' +

                '<td>' + report.sampleDate + '</td>' +

                '<td>' + report.reportDate + '</td>' +

                '<td>' +
                    getResultBadge(report.result) +
                '</td>' +

                '<td>' +
                    getAuthorizationBadge(report.authorization) +
                '</td>' +

                '<td>' +
                    '<a href="#full-report" class="view-link" ' +
                    'onclick="showReport(' + i + '); return false;">' +
                    'View Report' +
                    '</a>' +
                '</td>' +

            '</tr>';
    }

    document.getElementById("reports-body").innerHTML = tableHTML;

    document.getElementById("report-count").innerHTML =
        reports.length + " Reports";
}


/* =====================================
   RESULT STATUS BADGE
===================================== */

// Return the correct badge according to the report result.

function getResultBadge(result) {

    if (result === "Normal") {

        return '<span class="badge normal">Normal</span>';
    }
    else {

        return '<span class="badge abnormal">' + result + '</span>';
    }
}


/* =====================================
   AUTHORIZATION STATUS BADGE
===================================== */

// Return the correct badge according to authorization status.

function getAuthorizationBadge(status) {

    if (status === "Authorized") {

        return '<span class="badge authorized">Authorized</span>';
    }
    else {

        return '<span class="badge pending">Pending</span>';
    }
}


/* =====================================
   SELECT REPORT
===================================== */

// Select a report from the report list and display its details.

function showReport(index) {

    var patient = patients[currentPatientIndex];

    if (index >= 0 && index < patient.reports.length) {

        currentReportIndex = index;

        renderFullReport();

        document.getElementById("full-report").scrollIntoView();
    }
}


/* =====================================
   DISPLAY FULL REPORT
===================================== */

// Display all details of the selected laboratory report.

function renderFullReport() {

    var patient = patients[currentPatientIndex];

    var report = patient.reports[currentReportIndex];

    var reportHTML = "";

    // Report toolbar

    reportHTML +=
        '<div class="report-toolbar">' +

            '<div>' +
                '<h2>Laboratory Test Report</h2>' +
                '<p>Selected Report: ' + report.reportId + '</p>' +
            '</div>' +

            '<button class="btn primary print-btn" type="button" onclick="printReport()">' +
                'Print / Save as PDF' +
            '</button>' +

        '</div>';


    // Report sheet

    reportHTML += '<div class="report-sheet">';


    // Hospital header

    reportHTML +=
        '<header class="hospital-header">' +
            '<h2>HeartCare Hospital</h2>' +
            '<p>Laboratory Investigation Report</p>' +
            '<p>Hospital Address | Contact Number</p>' +
        '</header>';


    // Report metadata

    reportHTML +=
        '<div class="report-meta">' +

            '<p><strong>Report ID:</strong> ' +
                report.reportId +
            '</p>' +

            '<p><strong>Report Status:</strong> ' +
                getResultBadge(report.result) +
            '</p>' +

        '</div>';


    // Patient information

    reportHTML +=
        '<section class="report-section">' +

            '<h3>A. Patient Information</h3>' +

            '<div class="details-grid">' +

                '<p><strong>Patient Name:</strong> ' +
                    patient.patientName +
                '</p>' +

                '<p><strong>Patient ID:</strong> ' +
                    patient.patientId +
                '</p>' +

                '<p><strong>Age:</strong> ' +
                    patient.age +
                '</p>' +

                '<p><strong>Gender:</strong> ' +
                    patient.gender +
                '</p>' +

                '<p><strong>Contact Number:</strong> ' +
                    patient.contact +
                '</p>' +

            '</div>' +

        '</section>';


    // Test information

    reportHTML +=
        '<section class="report-section">' +

            '<h3>B. Test Information</h3>' +

            '<div class="details-grid">' +

                '<p><strong>Report ID:</strong> ' +
                    report.reportId +
                '</p>' +

                '<p><strong>Test Name:</strong> ' +
                    report.testName +
                '</p>' +

                '<p><strong>Test Category:</strong> ' +
                    report.category +
                '</p>' +

                '<p><strong>Sample Collection Date:</strong> ' +
                    report.sampleDate +
                '</p>' +

                '<p><strong>Report Date:</strong> ' +
                    report.reportDate +
                '</p>' +

                '<p><strong>Referring Doctor:</strong> ' +
                    report.doctor +
                '</p>' +

            '</div>' +

        '</section>';


    // Test results

    reportHTML +=
        '<section class="report-section">' +

            '<h3>C. Test Results</h3>' +

            '<div class="table-wrapper">' +

                '<table class="result-table">' +

                    '<thead>' +
                        '<tr>' +
                            '<th>Test Parameter</th>' +
                            '<th>Result</th>' +
                            '<th>Reference Range</th>' +
                            '<th>Status</th>' +
                        '</tr>' +
                    '</thead>' +

                    '<tbody>';


    if (report.parameters.length > 0) {

        for (var i = 0; i < report.parameters.length; i++) {

            var parameter = report.parameters[i];

            reportHTML +=
                '<tr>' +

                    '<td>' + parameter.name + '</td>' +

                    '<td>' + parameter.value + '</td>' +

                    '<td>' + parameter.reference + '</td>' +

                    '<td>' +
                        getResultBadge(parameter.status) +
                    '</td>' +

                '</tr>';
        }

    }
    else {

        reportHTML +=
            '<tr>' +
                '<td colspan="4">' +
                    'Detailed test values are not available in the sample data.' +
                '</td>' +
            '</tr>';
    }


    reportHTML +=
                    '</tbody>' +

                '</table>' +

            '</div>' +

            '<div class="overall">' +

                '<strong>Overall Result:</strong> ' +

                getResultBadge(report.result) +

            '</div>' +

        '</section>';


    // Additional information

    reportHTML +=
        '<section class="report-section">' +

            '<h3>D. Additional Information</h3>' +

            '<div class="details-grid">' +

                '<p><strong>Result Indicator:</strong> ' +
                    getResultBadge(report.result) +
                '</p>' +

                '<p><strong>Technician Name:</strong> ' +
                    report.technician +
                '</p>' +

                '<p><strong>Verified By:</strong> ' +
                    report.verifiedBy +
                '</p>' +

                '<p><strong>Doctor Remarks:</strong> ' +
                    report.remarks +
                '</p>' +

                '<p><strong>Lab Address:</strong> HeartCare Hospital Laboratory</p>' +

            '</div>' +

        '</section>';


    // Authorization information

    reportHTML +=
        '<section class="authorization-section">' +

            '<h3>Report Authorization</h3>' +

            '<div class="authorization-box">' +

                '<p><strong>Authorization Status:</strong> ' +
                    getAuthorizationBadge(report.authorization) +
                '</p>' +

                '<p><strong>Authorized By:</strong> ' +
                    report.verifiedBy +
                '</p>' +

                '<p><strong>Authorization Date:</strong> ' +
                    report.authorizationDate +
                '</p>' +

            '</div>' +

            '<div class="signature-row">' +

                '<div>' +
                    '<span>________________________</span>' +
                    '<strong>Technician Signature</strong>' +
                '</div>' +

                '<div>' +
                    '<span>________________________</span>' +
                    '<strong>Authorized Signature</strong>' +
                '</div>' +

            '</div>' +

            '<p class="footer-note">' +
                'This report is generated by HeartCare Hospital Laboratory.' +
            '</p>' +

        '</section>';


    reportHTML += '</div>';


    // Insert the complete report into the HTML page.

    document.getElementById("full-report").innerHTML = reportHTML;
}


/* =====================================
   NO PATIENT FOUND
===================================== */

// Display a message when the entered patient information
// does not match any patient in the data array.

function showNoPatientFound() {

    document.getElementById("patient-information").innerHTML =
        '<p>No patient found. Please check the Patient ID or Name.</p>';

    document.getElementById("reports-body").innerHTML =
        '<tr><td colspan="7" style="text-align:center;">No reports available.</td></tr>';

    document.getElementById("report-count").innerHTML = "0 Reports";

    document.getElementById("full-report").innerHTML =
        '<h2>No Report Selected</h2>' +
        '<p>Please search for a valid patient.</p>';
}


/* =====================================
   CLEAR SEARCH
===================================== */

// Clear the search fields and restore the default patient.

function clearPatientSearch() {

    document.getElementById("patientId").value = "";

    document.getElementById("patientName").value = "";

    currentPatientIndex = 0;

    currentReportIndex = 0;

    renderPatientInformation();

    renderPatientReports();

    renderFullReport();
}


/* =====================================
   PRINT REPORT
===================================== */

// Open the browser print window for printing or saving as PDF.

function printReport() {

    window.print();
}


/* =====================================
   INITIALIZE PAGE
===================================== */

// Load the default patient's information and reports
// when the page is opened.

function initializeLabReports() {

    renderPatientInformation();

    renderPatientReports();

    renderFullReport();

    console.log(patients);
}


// Run the initialization function after page loading.

window.onload = initializeLabReports;
