
/* =====================================
   TEST CATALOGUE PAGE JAVASCRIPT
===================================== */

// Global variables
var currentPage = 1;
var recordsPerPage = 5;
var filteredTests = [];


/* =====================================
   FUNCTION: GET FILTERED TESTS
   Search and filter tests
===================================== */

function getFilteredTests() {

    var searchValue = document.getElementById("test-search").value.toLowerCase();

    var categoryValue = document.getElementById("category-filter").value;

    var statusValue = document.getElementById("status-filter").value;

    var result = [];

    for (var i = 0; i < testCatalogue.length; i++) {

        var test = testCatalogue[i];

        var searchMatch =
            test.name.toLowerCase().indexOf(searchValue) !== -1 ||
            test.code.toLowerCase().indexOf(searchValue) !== -1;

        var categoryMatch =
            categoryValue === "" || test.category === categoryValue;

        var statusMatch =
            statusValue === "" || test.status === statusValue;

        if (searchMatch && categoryMatch && statusMatch) {
            result.push(test);
        }
    }

    return result;
}


/* =====================================
   FUNCTION: RENDER STATISTICS
   Calculate total, active, inactive
   and category count
===================================== */

function renderStatistics() {

    var total = testCatalogue.length;
    var active = 0;
    var inactive = 0;
    var categories = [];

    for (var i = 0; i < testCatalogue.length; i++) {

        if (testCatalogue[i].status === "Active") {
            active++;
        } else {
            inactive++;
        }

        if (categories.indexOf(testCatalogue[i].category) === -1) {
            categories.push(testCatalogue[i].category);
        }
    }

    document.getElementById("total-tests").innerHTML = total;

    document.getElementById("active-tests").innerHTML = active;

    document.getElementById("inactive-tests").innerHTML = inactive;

    document.getElementById("category-count").innerHTML = categories.length;
}


/* =====================================
   FUNCTION: RENDER TEST TABLE
   Display filtered tests in table
===================================== */

function renderTestTable() {

    filteredTests = getFilteredTests();

    var tableBody = document.getElementById("test-table-body");

    var start = (currentPage - 1) * recordsPerPage;

    var end = start + recordsPerPage;

    var pageTests = filteredTests.slice(start, end);

    var tableHTML = "";

    if (pageTests.length === 0) {

        tableHTML = "<tr><td colspan='7'>No tests found.</td></tr>";

    } else {

        for (var i = 0; i < pageTests.length; i++) {

            var test = pageTests[i];

            var statusClass = "";

            if (test.status === "Active") {
                statusClass = "active";
            } else {
                statusClass = "inactive";
            }

            tableHTML +=
                "<tr>" +
                    "<td>" + test.code + "</td>" +
                    "<td><strong>" + test.name + "</strong>" +
                    "<small>" + test.shortName + "</small></td>" +
                    "<td>" + test.category + "</td>" +
                    "<td>" + test.specimen + "</td>" +
                    "<td>" + test.referenceRange + "</td>" +
                    "<td>" + test.unit + "</td>" +
                    "<td><span class='status " + statusClass + "'>" +
                    test.status +
                    "</span></td>" +
                "</tr>";
        }
    }

    tableBody.innerHTML = tableHTML;

    renderPagination();

    console.log("Displayed tests:", pageTests);
}


/* =====================================
   FUNCTION: RENDER PAGINATION
   Generate page buttons dynamically
===================================== */

function renderPagination() {

    var totalRecords = filteredTests.length;

    var totalPages = Math.ceil(totalRecords / recordsPerPage);

    var start = 0;
    var end = 0;

    if (totalRecords > 0) {

        start = (currentPage - 1) * recordsPerPage + 1;

        end = start + recordsPerPage - 1;

        if (end > totalRecords) {
            end = totalRecords;
        }
    }

    document.getElementById("pagination-summary").innerHTML =
        "Showing " + start + "–" + end + " of " + totalRecords + " tests";

    var paginationHTML = "";

    if (totalPages > 1) {

        paginationHTML +=
            "<button onclick='changePage(" + (currentPage - 1) + ")' " +
            (currentPage === 1 ? "disabled" : "") +
            ">Previous</button>";

        for (var i = 1; i <= totalPages; i++) {

            var currentClass = "";

            if (i === currentPage) {
                currentClass = "current";
            }

            paginationHTML +=
                "<button class='" + currentClass +
                "' onclick='changePage(" + i + ")'>" +
                i +
                "</button>";
        }

        paginationHTML +=
            "<button onclick='changePage(" + (currentPage + 1) + ")' " +
            (currentPage === totalPages ? "disabled" : "") +
            ">Next</button>";
    }

    document.getElementById("pagination-buttons").innerHTML = paginationHTML;
}


/* =====================================
   FUNCTION: CHANGE PAGE
   Move to selected page
===================================== */

function changePage(pageNumber) {

    var totalPages = Math.ceil(filteredTests.length / recordsPerPage);

    if (pageNumber >= 1 && pageNumber <= totalPages) {

        currentPage = pageNumber;

        renderTestTable();
    }
}


/* =====================================
   FUNCTION: APPLY FILTERS
   Search and filter the catalogue
===================================== */

function applyFilters() {

    currentPage = 1;

    renderTestTable();
}


/* =====================================
   FUNCTION: RESET FILTERS
   Clear search and selected filters
===================================== */

function resetFilters() {

    document.getElementById("test-search").value = "";

    document.getElementById("category-filter").value = "";

    document.getElementById("status-filter").value = "";

    currentPage = 1;

    renderTestTable();
}


/* =====================================
   FUNCTION: ADD NEW TEST NOTICE
   Catalogue changes are controlled
   by the Admin
===================================== */

function showAddTestNotice() {

    alert("Test catalogue information is managed by the Admin. Please contact the Admin to add a new test.");
}


/* =====================================
   FUNCTION: INITIALIZE PAGE
   Load statistics and table
===================================== */

function initializeTestCatalogue() {

    renderStatistics();

    renderTestTable();
}


/* =====================================
   PAGE LOAD
===================================== */

window.onload = initializeTestCatalogue;
