
/* ==============================
   ADD LAB RESULT FUNCTIONALITIES
============================== */


/* Check whether a text exists inside another text */
function containsText(mainText, searchText) {

    mainText = mainText.toLowerCase();

    searchText = searchText.toLowerCase();

    if (mainText.indexOf(searchText) != -1) {
        return true;
    }

    return false;

}


/* Find patient information using Patient ID */
function findPatient() {

    var patientId = document.getElementById("patient-id").value.trim();

    var found = false;

    var i;

    for (i = 0; i < patientData.length; i++) {

        if (patientData[i].patientId.toLowerCase() == patientId.toLowerCase()) {

            document.getElementById("patient-name").value =
                patientData[i].patientName;

            document.getElementById("patient-age").value =
                patientData[i].age;

            document.getElementById("patient-gender").value =
                patientData[i].gender;

            document.getElementById("patient-id-error").innerHTML = "";

            found = true;

            break;

        }

    }

    if (patientId != "" && found == false) {

        document.getElementById("patient-id-error").innerHTML =
            "Patient ID not found. Please enter patient details manually.";

    }

}


/* Automatically fill test code, unit and reference range */
function updateTestDetails() {

    var selectedCode = document.getElementById("test-name").value;

    var i;

    document.getElementById("test-code").value = "";

    document.getElementById("unit").value = "";

    document.getElementById("reference-range").value = "";

    for (i = 0; i < testData.length; i++) {

        if (testData[i].code == selectedCode) {

            document.getElementById("test-code").value =
                testData[i].code;

            document.getElementById("unit").value =
                testData[i].unit;

            document.getElementById("reference-range").value =
                testData[i].referenceRange;

            break;

        }

    }

}


/* Clear all validation messages */
function clearResultErrors() {

    document.getElementById("patient-id-error").innerHTML = "";

    document.getElementById("patient-name-error").innerHTML = "";

    document.getElementById("patient-age-error").innerHTML = "";

    document.getElementById("patient-gender-error").innerHTML = "";

    document.getElementById("order-id-error").innerHTML = "";

    document.getElementById("doctor-name-error").innerHTML = "";

    document.getElementById("sample-date-error").innerHTML = "";

    document.getElementById("sample-type-error").innerHTML = "";

    document.getElementById("test-name-error").innerHTML = "";

    document.getElementById("result-value-error").innerHTML = "";

    document.getElementById("result-status-error").innerHTML = "";

    document.getElementById("form-message").innerHTML = "";

    document.getElementById("form-message").className = "";

}


/* Validate all required form fields */
function validateResultForm() {

    clearResultErrors();

    var patientId = document.getElementById("patient-id").value.trim();

    var patientName = document.getElementById("patient-name").value.trim();

    var age = document.getElementById("patient-age").value;

    var gender = document.getElementById("patient-gender").value;

    var orderId = document.getElementById("order-id").value.trim();

    var doctorName = document.getElementById("doctor-name").value.trim();

    var sampleDate = document.getElementById("sample-date").value;

    var sampleType = document.getElementById("sample-type").value;

    var testName = document.getElementById("test-name").value;

    var resultValue = document.getElementById("result-value").value.trim();

    var resultStatus = document.getElementById("result-status").value;

    var valid = true;


    // Validate Patient ID
    if (patientId == "") {

        document.getElementById("patient-id-error").innerHTML =
            "Patient ID is required.";

        valid = false;

    }


    // Validate Patient Name
    if (patientName == "") {

        document.getElementById("patient-name-error").innerHTML =
            "Patient name is required.";

        valid = false;

    }


    // Validate Age
    if (age == "" || Number(age) <= 0) {

        document.getElementById("patient-age-error").innerHTML =
            "Please enter a valid age.";

        valid = false;

    }


    // Validate Gender
    if (gender == "") {

        document.getElementById("patient-gender-error").innerHTML =
            "Please select patient gender.";

        valid = false;

    }


    // Validate Order ID
    if (orderId == "") {

        document.getElementById("order-id-error").innerHTML =
            "Order ID is required.";

        valid = false;

    }


    // Validate Doctor Name
    if (doctorName == "") {

        document.getElementById("doctor-name-error").innerHTML =
            "Doctor name is required.";

        valid = false;

    }


    // Validate Sample Collection Date
    if (sampleDate == "") {

        document.getElementById("sample-date-error").innerHTML =
            "Sample collection date is required.";

        valid = false;

    }

    else {

        var selectedDate = new Date(sampleDate);

        var today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {

            document.getElementById("sample-date-error").innerHTML =
                "Sample date cannot be in the future.";

            valid = false;

        }

    }


    // Validate Sample Type
    if (sampleType == "") {

        document.getElementById("sample-type-error").innerHTML =
            "Please select sample type.";

        valid = false;

    }


    // Validate Test Name
    if (testName == "") {

        document.getElementById("test-name-error").innerHTML =
            "Please select a laboratory test.";

        valid = false;

    }


    // Validate Result Value
    if (resultValue == "") {

        document.getElementById("result-value-error").innerHTML =
            "Result value is required.";

        valid = false;

    }


    // Validate Result Status
    if (resultStatus == "") {

        document.getElementById("result-status-error").innerHTML =
            "Please select result status.";

        valid = false;

    }


    return valid;

}


/* Return the current date and time as readable text */
function getCurrentDateTime() {

    var currentDate = new Date();

    var hours = currentDate.getHours();

    var minutes = currentDate.getMinutes();

    var ampm = "AM";

    if (hours >= 12) {
        ampm = "PM";
    }

    if (hours > 12) {
        hours = hours - 12;
    }

    if (hours == 0) {
        hours = 12;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return "Today, " + hours + ":" + minutes + " " + ampm;

}


/* Save a new laboratory result */
function saveLabResult() {

    if (validateResultForm() == false) {

        return false;

    }


    // Create a new result object
    var newResult = {

        resultId: "LR-" + (1000 + savedLabResults.length + 1),

        patientId: document.getElementById("patient-id").value.trim(),

        patientName: document.getElementById("patient-name").value.trim(),

        age: document.getElementById("patient-age").value,

        gender: document.getElementById("patient-gender").value,

        orderId: document.getElementById("order-id").value.trim(),

        doctorName: document.getElementById("doctor-name").value.trim(),

        sampleDate: document.getElementById("sample-date").value,

        sampleType: document.getElementById("sample-type").value,

        testName: document.getElementById("test-name").options[
            document.getElementById("test-name").selectedIndex
        ].text,

        testCode: document.getElementById("test-code").value,

        resultValue: document.getElementById("result-value").value.trim(),

        unit: document.getElementById("unit").value,

        referenceRange: document.getElementById("reference-range").value,

        status: document.getElementById("result-status").value,

        remarks: document.getElementById("technician-remarks").value.trim(),

        dateTime: getCurrentDateTime()

    };


    // Add the new result to the array
    savedLabResults.push(newResult);


    // Add the new result to recent results
    recentResults.push({

        patientId: newResult.patientId,

        testName: newResult.testName,

        status: newResult.status,

        time: newResult.dateTime

    });


    // Update result overview
    if (newResult.status == "Normal") {

        resultOverview.normal++;

    }

    else if (newResult.status == "Abnormal" ||
        newResult.status == "Critical") {

        resultOverview.abnormal++;

    }

    else if (newResult.status == "Pending Verification") {

        resultOverview.pending++;

    }


    // Update the page
    renderRecentResults();

    renderResultOverview();


    // Show success message
    document.getElementById("form-message").innerHTML =
        "Lab result saved successfully. Result ID: " + newResult.resultId;

    document.getElementById("form-message").className = "success";


    console.log("New Lab Result:", newResult);

    console.log("All Saved Lab Results:", savedLabResults);


    // Reset form fields after saving
    document.getElementById("add-result-form").reset();

    document.getElementById("test-code").value = "";

    document.getElementById("unit").value = "";

    document.getElementById("reference-range").value = "";

    clearResultErrors();

    document.getElementById("form-message").innerHTML =
        "Lab result saved successfully. Result ID: " + newResult.resultId;

    document.getElementById("form-message").className = "success";


    return false;

}


/* Display recent laboratory results */
function renderRecentResults() {

    var recentList = document.getElementById("recent-results-list");

    var html = "";

    var i;

    var start = recentResults.length - 1;

    var end = start - 2;

    if (end < 0) {
        end = 0;
    }

    for (i = start; i >= end; i--) {

        var statusClass = "normal";

        if (recentResults[i].status == "Abnormal" ||
            recentResults[i].status == "Critical") {

            statusClass = "abnormal";

        }

        else if (recentResults[i].status == "Pending Verification") {

            statusClass = "pending";

        }

        html += "<div class='recent-item'>";

        html += "<div>";

        html += "<strong>" + recentResults[i].testName + "</strong>";

        html += "<p>Patient: " + recentResults[i].patientId + "</p>";

        html += "<small>" + recentResults[i].time + "</small>";

        html += "</div>";

        html += "<span class='result-badge " + statusClass + "'>";

        html += recentResults[i].status;

        html += "</span>";

        html += "</div>";

    }

    if (recentResults.length == 0) {

        html = "<p>No recent results available.</p>";

    }

    recentList.innerHTML = html;

    console.log("Recent results rendered.");

}


/* Update the result overview counts */
function renderResultOverview() {

    document.getElementById("normal-count").innerHTML =
        resultOverview.normal;

    document.getElementById("abnormal-count").innerHTML =
        resultOverview.abnormal;

    document.getElementById("pending-count").innerHTML =
        resultOverview.pending;

    console.log("Result overview updated.");

}


/* Clear the form and all validation messages */
function resetResultForm() {

    document.getElementById("add-result-form").reset();

    document.getElementById("test-code").value = "";

    document.getElementById("unit").value = "";

    document.getElementById("reference-range").value = "";

    clearResultErrors();

    console.log("Form cleared.");

}


/* Initialize the Add Lab Results page */
function initializeAddLabResults() {

    renderRecentResults();

    renderResultOverview();

    console.log("Add Lab Results page initialized.");

}


/* Run page initialization after the page loads */
window.addEventListener("load", initializeAddLabResults);
