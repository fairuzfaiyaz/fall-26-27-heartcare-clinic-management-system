// Store the currently selected patient
var selectedPatient = null;

// Store the currently selected report
var selectedReport = null;


// This function checks whether the search text matches a patient
function containsText(mainText, searchText) {

    mainText = mainText.toLowerCase();
    searchText = searchText.toLowerCase();

    if (mainText.indexOf(searchText) !== -1) {
        return true;
    }

    return false;
}


// This function searches for a patient using Patient ID or Name
function searchPatient() {

    var patientId = document.getElementById("patientId").value;
    var patientName = document.getElementById("patientName").value;

    patientId = patientId.trim();
    patientName = patientName.trim();

    var message = document.getElementById("search-message");

    // Check whether both fields are empty
    if (patientId === "" && patientName === "") {

        message.innerHTML = "Please enter Patient ID or Patient Name.";
        message.style.color = "red";

        return false;
    }

    selectedPatient = null;
    selectedReport = null;

    // Search through the patient array
    for (var i = 0; i < patients.length; i++) {

        var idMatch = true;
        var nameMatch = true;

        if (patientId !== "") {

            idMatch = containsText(
                patients[i].patientId,
                patientId
            );
        }

        if (patientName !== "") {

            nameMatch = containsText(
                patients[i].patientName,
                patientName
            );
        }

        // Both entered values must match the same patient
        if (idMatch && nameMatch) {

            selectedPatient = patients[i];

            break;
        }
    }

    // Display the search result
    if (selectedPatient !== null) {

        message.innerHTML = "Patient found successfully.";
        message.style.color = "green";

        renderPatientInformation();
        renderPatientReports();

        document.getElementById("selected-report-title").innerHTML =
            "No report selected";

        document.getElementById("report-details").innerHTML =
            "<p>Select a report from the report list to view its details.</p>";

    } else {

        message.innerHTML = "No patient found. Please check the information.";
        message.style.color = "red";

        document.getElementById("patient-information").innerHTML =
            "<p>No patient information available.</p>";

        document.getElementById("reports-body").innerHTML =
            "<tr><td colspan='7'>No reports found.</td></tr>";

        document.getElementById("report-count").innerHTML =
            "0 Reports";

        document.getElementById("selected-report-title").innerHTML =
            "No report selected";

        document.getElementById("report-details").innerHTML =
            "<p>No report available.</p>";
    }

    return false;
}


// This function displays the selected patient's information
function renderPatientInformation() {

    var patientHTML = "";

    patientHTML += "<div>";
    patientHTML += "<span>Patient Name</span>";
    patientHTML += "<strong>" + selectedPatient.patientName + "</strong>";
    patientHTML += "</div>";

    patientHTML += "<div>";
    patientHTML += "<span>Patient ID</span>";
    patientHTML += "<strong>" + selectedPatient.patientId + "</strong>";
    patientHTML += "</div>";

    patientHTML += "<div>";
    patientHTML += "<span>Age</span>";
    patientHTML += "<strong>" + selectedPatient.age + "</strong>";
    patientHTML += "</div>";

    patientHTML += "<div>";
    patientHTML += "<span>Gender</span>";
    patientHTML += "<strong>" + selectedPatient.gender + "</strong>";
    patientHTML += "</div>";

    patientHTML += "<div>";
    patientHTML += "<span>Contact Number</span>";
    patientHTML += "<strong>" + selectedPatient.contact + "</strong>";
    patientHTML += "</div>";

    document.getElementById("patient-information").innerHTML =
        patientHTML;

    console.log("Patient information displayed.");
}


// This function generates a status badge
function getStatusBadge(status) {

    var badgeClass = status.toLowerCase();

    if (status === "Normal") {
        badgeClass = "normal";
    }
    else if (status === "Abnormal") {
        badgeClass = "abnormal";
    }
    else if (status === "Authorized") {
        badgeClass = "authorized";
    }
    else if (status === "Pending") {
        badgeClass = "pending";
    }
    else if (status === "Under Review") {
        badgeClass = "pending";
    }

    return "<span class='badge " + badgeClass + "'>" +
        status + "</span>";
}


// This function displays all reports of the selected patient
function renderPatientReports() {

    var reportHTML = "";

    var reports = selectedPatient.reports;

    document.getElementById("report-count").innerHTML =
        reports.length + " Reports";

    if (reports.length === 0) {

        reportHTML = "<tr><td colspan='7'>No reports available for this patient.</td></tr>";

    } else {

        for (var i = 0; i < reports.length; i++) {

            reportHTML += "<tr>";

            reportHTML += "<td>" + reports[i].reportId + "</td>";
            reportHTML += "<td>" + reports[i].testName + "</td>";
            reportHTML += "<td>" + reports[i].sampleDate + "</td>";
            reportHTML += "<td>" + reports[i].reportDate + "</td>";

            reportHTML += "<td>" +
                getStatusBadge(reports[i].result) +
                "</td>";

            reportHTML += "<td>" +
                getStatusBadge(reports[i].authorization) +
                "</td>";

            reportHTML += "<td>";
            reportHTML += "<button type='button' class='view-link' onclick='showReport(" +
                i + ")'>View Report</button>";
            reportHTML += "</td>";

            reportHTML += "</tr>";
        }
    }

    document.getElementById("reports-body").innerHTML = reportHTML;

    console.log("Patient reports displayed.");
}


// This function displays the full details of a selected report
function showReport(index) {

    if (selectedPatient === null) {
        return;
    }

    var reports = selectedPatient.reports;

    if (index < 0 || index >= reports.length) {
        return;
    }

    selectedReport = reports[index];

    renderFullReport();

    document.getElementById("selected-report-title").innerHTML =
        "Selected Report: " + selectedReport.reportId;
}


// This function generates the complete laboratory report
function renderFullReport() {

    var reportHTML = "";

    var report = selectedReport;
    var patient = selectedPatient;

    reportHTML += "<div class='report-sheet'>";

    // Hospital header
    reportHTML += "<header class='hospital-header'>";
    reportHTML += "<h2>HeartCare Hospital</h2>";
    reportHTML += "<p>Laboratory Investigation Report</p>";
    reportHTML += "<p>Hospital Address | Contact Number</p>";
    reportHTML += "</header>";

    // Report metadata
    reportHTML += "<div class='report-meta'>";

    reportHTML += "<p><strong>Report ID:</strong> " +
        report.reportId + "</p>";

    reportHTML += "<p><strong>Report Status:</strong> " +
        getStatusBadge(report.result) + "</p>";

    reportHTML += "</div>";

    // A. Patient information
    reportHTML += "<section class='report-section'>";
    reportHTML += "<h3>A. Patient Information</h3>";
    reportHTML += "<div class='details-grid'>";

    reportHTML += "<p><strong>Patient Name:</strong> " +
        patient.patientName + "</p>";

    reportHTML += "<p><strong>Patient ID:</strong> " +
        patient.patientId + "</p>";

    reportHTML += "<p><strong>Age:</strong> " +
        patient.age + "</p>";

    reportHTML += "<p><strong>Gender:</strong> " +
        patient.gender + "</p>";

    reportHTML += "<p><strong>Contact Number:</strong> " +
        patient.contact + "</p>";

    reportHTML += "</div>";
    reportHTML += "</section>";

    // B. Test information
    reportHTML += "<section class='report-section'>";
    reportHTML += "<h3>B. Test Information</h3>";
    reportHTML += "<div class='details-grid'>";

    reportHTML += "<p><strong>Report ID:</strong> " +
        report.reportId + "</p>";

    reportHTML += "<p><strong>Test Name:</strong> " +
        report.testName + "</p>";

    reportHTML += "<p><strong>Test Category:</strong> " +
        report.category + "</p>";

    reportHTML += "<p><strong>Sample Collection Date:</strong> " +
        report.sampleDate + "</p>";

    reportHTML += "<p><strong>Report Date:</strong> " +
        report.reportDate + "</p>";

    reportHTML += "<p><strong>Referring Doctor:</strong> " +
        report.doctor + "</p>";

    reportHTML += "</div>";
    reportHTML += "</section>";

    // C. Test results
    reportHTML += "<section class='report-section'>";
    reportHTML += "<h3>C. Test Results</h3>";

    if (report.parameters.length > 0) {

        reportHTML += "<div class='table-wrapper'>";
        reportHTML += "<table class='result-table'>";

        reportHTML += "<thead>";
        reportHTML += "<tr>";
        reportHTML += "<th>Test Parameter</th>";
        reportHTML += "<th>Result</th>";
        reportHTML += "<th>Reference Range</th>";
        reportHTML += "<th>Status</th>";
        reportHTML += "</tr>";
        reportHTML += "</thead>";

        reportHTML += "<tbody>";

        for (var i = 0; i < report.parameters.length; i++) {

            reportHTML += "<tr>";

            reportHTML += "<td>" +
                report.parameters[i].name + "</td>";

            reportHTML += "<td>" +
                report.parameters[i].result + "</td>";

            reportHTML += "<td>" +
                report.parameters[i].referenceRange + "</td>";

            reportHTML += "<td>" +
                getStatusBadge(report.parameters[i].status) +
                "</td>";

            reportHTML += "</tr>";
        }

        reportHTML += "</tbody>";
        reportHTML += "</table>";
        reportHTML += "</div>";

    } else {

        reportHTML += "<p>Detailed test parameter values are not available for this report.</p>";
    }

    reportHTML += "<div class='overall'>";
    reportHTML += "<strong>Overall Result:</strong> ";
    reportHTML += getStatusBadge(report.result);
    reportHTML += "</div>";

    reportHTML += "</section>";

    // D. Additional information
    reportHTML += "<section class='report-section'>";
    reportHTML += "<h3>D. Additional Information</h3>";
    reportHTML += "<div class='details-grid'>";

    reportHTML += "<p><strong>Result Indicator:</strong> " +
        getStatusBadge(report.result) + "</p>";

    reportHTML += "<p><strong>Technician Name:</strong> " +
        report.technician + "</p>";

    reportHTML += "<p><strong>Verified By:</strong> " +
        report.verifiedBy + "</p>";

    reportHTML += "<p><strong>Doctor's Remarks:</strong> " +
        report.remarks + "</p>";

    reportHTML += "<p><strong>Lab Address:</strong> HeartCare Hospital Laboratory</p>";

    reportHTML += "</div>";
    reportHTML += "</section>";

    // Authorization information
    reportHTML += "<section class='authorization-section'>";
    reportHTML += "<h3>Report Authorization</h3>";

    reportHTML += "<div class='authorization-box'>";

    reportHTML += "<p><strong>Authorization Status:</strong> " +
        getStatusBadge(report.authorization) + "</p>";

    reportHTML += "<p><strong>Authorized By:</strong> " +
        report.authorizedBy + "</p>";

    reportHTML += "<p><strong>Authorization Date:</strong> " +
        report.authorizationDate + "</p>";

    reportHTML += "</div>";

    reportHTML += "<div class='signature-row'>";

    reportHTML += "<div>";
    reportHTML += "<span>________________________</span>";
    reportHTML += "<strong>Technician Signature</strong>";
    reportHTML += "</div>";

    reportHTML += "<div>";
    reportHTML += "<span>________________________</span>";
    reportHTML += "<strong>Authorized Signature</strong>";
    reportHTML += "</div>";

    reportHTML += "</div>";

    reportHTML += "<p class='footer-note'>";
    reportHTML += "This report is generated by HeartCare Hospital Laboratory.";
    reportHTML += "</p>";

    reportHTML += "</section>";

    reportHTML += "</div>";

    document.getElementById("report-details").innerHTML =
        reportHTML;

    console.log("Full laboratory report displayed.");
}


// This function clears the search fields and displayed information
function clearPatientSearch() {

    document.getElementById("patientId").value = "";
    document.getElementById("patientName").value = "";

    document.getElementById("search-message").innerHTML = "";

    document.getElementById("patient-information").innerHTML =
        "<p>Search for a patient to view information.</p>";

    document.getElementById("reports-body").innerHTML =
        "<tr><td colspan='7'>Search for a patient to view reports.</td></tr>";

    document.getElementById("report-count").innerHTML =
        "0 Reports";

    document.getElementById("selected-report-title").innerHTML =
        "No report selected";

    document.getElementById("report-details").innerHTML =
        "<p>Select a report from the report list to view its details.</p>";

    selectedPatient = null;
    selectedReport = null;
}


// This function prints the currently selected laboratory report
function printReport() {

    if (selectedReport === null) {

        alert("Please select a report before printing.");

        return;
    }

    window.print();
}