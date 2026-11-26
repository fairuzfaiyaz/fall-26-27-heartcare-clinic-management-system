
/* =================================
   MANAGE LAB RESULTS FUNCTIONALITY
================================= */

var searchText = "";
var selectedTest = "";
var selectedDate = "";
var selectedStatus = "";

var currentPage = 1;
var recordsPerPage = 5;

var filteredIndices = [];


/* =================================
   CHECK SEARCH TEXT
================================= */

// Check whether the search text exists
// inside the patient name or patient ID.

function containsText(value, search) {

    value = value.toLowerCase();
    search = search.toLowerCase();

    if (value.indexOf(search) !== -1) {
        return true;
    }

    return false;
}


/* =================================
   FILTER RESULTS
================================= */

// Find records that match the search
// text, test name, date, and status.

function getFilteredResults() {

    var resultIndices = [];

    for (var i = 0; i < labResults.length; i++) {

        var result = labResults[i];

        var searchMatch = true;
        var testMatch = true;
        var dateMatch = true;
        var statusMatch = true;

        if (searchText !== "") {

            searchMatch =
                containsText(result.patientName, searchText) ||
                containsText(result.patientId, searchText);
        }

        if (selectedTest !== "") {

            testMatch = result.testName === selectedTest;
        }

        if (selectedDate !== "") {

            dateMatch = result.dateValue === selectedDate;
        }

        if (selectedStatus !== "") {

            statusMatch = result.status === selectedStatus;
        }

        if (
            searchMatch &&
            testMatch &&
            dateMatch &&
            statusMatch
        ) {
            resultIndices.push(i);
        }
    }

    return resultIndices;
}


/* =================================
   RENDER SUMMARY CARDS
================================= */

// Calculate total, completed, pending,
// and under-review result counts.

function renderSummary() {

    var total = labResults.length;
    var completed = 0;
    var pending = 0;
    var reviewed = 0;

    for (var i = 0; i < labResults.length; i++) {

        if (labResults[i].status === "Completed") {
            completed++;
        }
        else if (labResults[i].status === "Pending") {
            pending++;
        }
        else if (labResults[i].status === "Under Review") {
            reviewed++;
        }
    }

    document.getElementById("total-results").innerHTML = total;
    document.getElementById("completed-results").innerHTML = completed;
    document.getElementById("pending-results").innerHTML = pending;
    document.getElementById("reviewed-results").innerHTML = reviewed;
}


/* =================================
   GET STATUS DESIGN
================================= */

// Return the appropriate CSS class
// according to the result status.

function getStatusHTML(status) {

    if (status === "Completed") {
        return '<span class="status completed">Completed</span>';
    }
    else if (status === "Pending") {
        return '<span class="status pending">Pending</span>';
    }
    else {
        return '<span class="status review">Under Review</span>';
    }
}


/* =================================
   RENDER RESULTS TABLE
================================= */

// Display the filtered laboratory results
// on the table according to the current page.

function renderResults() {

    filteredIndices = getFilteredResults();

    var tableBody = document.getElementById("results-body");

    var totalFiltered = filteredIndices.length;

    var start = (currentPage - 1) * recordsPerPage;
    var end = start + recordsPerPage;

    var pageIndices = filteredIndices.slice(start, end);

    var tableHTML = "";

    console.log(labResults);

    if (totalFiltered === 0) {

        tableHTML =
            '<tr><td colspan="6" style="text-align:center;">No results found.</td></tr>';
    }
    else {

        for (var i = 0; i < pageIndices.length; i++) {

            var originalIndex = pageIndices[i];
            var result = labResults[originalIndex];

            tableHTML +=
                '<tr>' +

                '<td class="result-id">#' +
                result.resultId +
                '</td>' +

                '<td>' +
                    '<div class="patient-cell">' +
                        '<div class="patient-avatar">' +
                            result.avatar +
                        '</div>' +
                        '<div>' +
                            '<strong>' +
                                result.patientName +
                            '</strong>' +
                            '<small>ID: ' +
                                result.patientId +
                            '</small>' +
                        '</div>' +
                    '</div>' +
                '</td>' +

                '<td>' +
                    result.testName +
                '</td>' +

                '<td>' +
                    result.submittedDate +
                '</td>' +

                '<td>' +
                    getStatusHTML(result.status) +
                '</td>' +

                '<td>' +
                    '<div class="action-buttons">' +

                        '<a href="lab/result-details.php" class="action-btn view-btn" title="View Details">◉</a>' +

                        '<a href="lab/edit-lab-result.php" class="action-btn edit-btn" title="Edit Result">✎</a>' +

                        '<button type="button" class="action-btn delete-btn" title="Delete Result" onclick="deleteLabResult(' +
                            originalIndex +
                        ')">×</button>' +

                        '<button type="button" class="action-btn download-btn" title="Download PDF" onclick="downloadLabResult()">↓</button>' +

                    '</div>' +
                '</td>' +

                '</tr>';
        }
    }

    tableBody.innerHTML = tableHTML;

    document.getElementById("result-count").innerHTML =
        totalFiltered + " Results";

    renderTableSummary();
    renderPagination();
}


/* =================================
   TABLE SUMMARY
================================= */

// Display the number of visible records
// and the total number of filtered records.

function renderTableSummary() {

    var total = filteredIndices.length;

    var start = 0;
    var end = 0;

    if (total > 0) {

        start = (currentPage - 1) * recordsPerPage + 1;

        end = currentPage * recordsPerPage;

        if (end > total) {
            end = total;
        }
    }

    document.getElementById("table-summary").innerHTML =
        "Showing " + start + "–" + end + " of " + total + " results";
}


/* =================================
   RENDER PAGINATION
================================= */

// Create pagination buttons based on
// the number of filtered records.

function renderPagination() {

    var pagination = document.getElementById("pagination");

    var totalPages = Math.ceil(
        filteredIndices.length / recordsPerPage
    );

    var paginationHTML = "";

    if (totalPages === 0) {
        totalPages = 1;
    }

    paginationHTML +=
        '<button type="button" onclick="changePage(' +
        (currentPage - 1) +
        ')" ';

    if (currentPage === 1) {
        paginationHTML += "disabled";
    }

    paginationHTML += '>‹</button>';

    for (var i = 1; i <= totalPages; i++) {

        paginationHTML +=
            '<button type="button" ';

        if (i === currentPage) {
            paginationHTML += 'class="current-page"';
        }

        paginationHTML +=
            ' onclick="changePage(' + i + ')">' +
            i +
            '</button>';
    }

    paginationHTML +=
        '<button type="button" onclick="changePage(' +
        (currentPage + 1) +
        ')" ';

    if (currentPage === totalPages) {
        paginationHTML += "disabled";
    }

    paginationHTML += '>›</button>';

    pagination.innerHTML = paginationHTML;
}


/* =================================
   CHANGE PAGE
================================= */

// Change the current page and display
// the records belonging to that page.

function changePage(pageNumber) {

    var totalPages = Math.ceil(
        filteredIndices.length / recordsPerPage
    );

    if (pageNumber >= 1 && pageNumber <= totalPages) {

        currentPage = pageNumber;

        renderResults();
    }
}


/* =================================
   SEARCH RESULTS
================================= */

// Read the search input and display
// matching patient records.

function searchLabResults() {

    searchText = document.getElementById("search").value;

    selectedTest = document.getElementById("test-name").value;

    selectedDate = document.getElementById("test-date").value;

    selectedStatus = document.getElementById("result-status").value;

    currentPage = 1;

    renderResults();

    return false;
}


/* =================================
   RESET SEARCH
================================= */

// Clear all search and filter fields
// and display all available records.

function resetLabSearch() {

    document.getElementById("search").value = "";

    document.getElementById("test-name").value = "";

    document.getElementById("test-date").value = "";

    document.getElementById("result-status").value = "";

    searchText = "";
    selectedTest = "";
    selectedDate = "";
    selectedStatus = "";

    currentPage = 1;

    renderResults();
}


/* =================================
   DELETE RESULT
================================= */

// Remove a selected record from the array
// using slice() and concat().

function deleteLabResult(index) {

    var firstPart = labResults.slice(0, index);

    var secondPart = labResults.slice(index + 1);

    labResults = firstPart.concat(secondPart);

    currentPage = 1;

    renderSummary();
    renderResults();

    alert("Laboratory result deleted successfully.");
}


/* =================================
   DOWNLOAD RESULT
================================= */

// PDF generation is not implemented in
// this frontend demonstration.

function downloadLabResult() {

    alert("PDF download is not available in this frontend demo.");
}


/* =================================
   INITIALIZE PAGE
================================= */

// Load the summary cards and results table
// when the page is opened.

function initializeManageResults() {

    renderSummary();

    renderResults();

    console.log("Manage Lab Results page loaded.");
}


// Run the initialization function
// after the page has finished loading.

window.onload = initializeManageResults;
