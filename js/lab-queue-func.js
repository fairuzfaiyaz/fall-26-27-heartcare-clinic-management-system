
/*
    Lab Queue Functionalities

    Features:
    1. Dynamic Statistics
    2. Search Orders
    3. Filter by Status
    4. Filter by Priority
    5. Pagination
    6. Current Date
*/

var searchText = "";
var selectedStatus = "All";
var selectedPriority = "All";

var currentPage = 1;
var recordsPerPage = 5;

var filteredOrders = [];


/* Checks whether search text exists in a value. */
function containsText(value, searchValue) {

    if (value.indexOf(searchValue) !== -1) {
        return true;
    } else {
        return false;
    }

}


/* Returns orders matching search and filters. */
function getFilteredOrders() {

    var result = [];

    for (var i = 0; i < labOrders.length; i++) {

        var order = labOrders[i];

        var matchesSearch = false;

        if (
            containsText(order.orderId, searchText) ||
            containsText(order.patientName, searchText) ||
            containsText(order.patientId, searchText) ||
            containsText(order.testName, searchText) ||
            containsText(order.doctor, searchText)
        ) {
            matchesSearch = true;
        }

        var matchesStatus = false;

        if (
            selectedStatus === "All" ||
            order.status === selectedStatus
        ) {
            matchesStatus = true;
        }

        var matchesPriority = false;

        if (
            selectedPriority === "All" ||
            order.priority === selectedPriority
        ) {
            matchesPriority = true;
        }

        if (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        ) {
            result.push(order);
        }

    }

    return result;

}


/* Updates the statistics cards. */
function renderStatistics() {

    var total = labOrders.length;

    var pending = 0;
    var processing = 0;
    var completed = 0;

    for (var i = 0; i < labOrders.length; i++) {

        if (labOrders[i].status === "Pending") {

            pending++;

        } else if (labOrders[i].status === "Processing") {

            processing++;

        } else if (labOrders[i].status === "Completed") {

            completed++;

        }

    }

    document.getElementById("total-orders").innerHTML = total;

    document.getElementById("pending-orders").innerHTML = pending;

    document.getElementById("processing-orders").innerHTML = processing;

    document.getElementById("completed-orders").innerHTML = completed;

}


/* Displays the correct status label. */
function getStatusHTML(status) {

    if (status === "Pending") {

        return '<span class="status pending">Pending</span>';

    } else if (status === "Processing") {

        return '<span class="status processing">Processing</span>';

    } else {

        return '<span class="status completed">Completed</span>';

    }

}


/* Displays the correct priority label. */
function getPriorityHTML(priority) {

    if (priority === "High") {

        return '<span class="priority high">High</span>';

    } else {

        return '<span class="priority normal">Normal</span>';

    }

}


/* Renders the laboratory orders in the table. */
function renderLabQueue() {

    console.log(labOrders);

    filteredOrders = getFilteredOrders();

    var totalPages = Math.ceil(
        filteredOrders.length / recordsPerPage
    );

    if (totalPages === 0) {
        totalPages = 1;
    }

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    var startIndex = (currentPage - 1) * recordsPerPage;

    var endIndex = startIndex + recordsPerPage;

    var pageOrders = filteredOrders.slice(startIndex, endIndex);

    var tableHTML = "";

    if (pageOrders.length === 0) {

        tableHTML =
            '<tr><td colspan="7" class="empty-message">' +
            'No matching laboratory orders found.' +
            '</td></tr>';

    } else {

        for (var i = 0; i < pageOrders.length; i++) {

            var order = pageOrders[i];

            tableHTML +=
                "<tr>" +

                "<td><strong>" +
                order.orderId +
                "</strong></td>" +

                '<td><div class="patient-name">' +
                order.patientName +
                '</div><small class="patient-id">PID: ' +
                order.patientId +
                "</small></td>" +

                "<td>" +
                order.testName +
                "</td>" +

                "<td>" +
                order.doctor +
                "</td>" +

                "<td>" +
                order.orderDate +
                "</td>" +

                "<td>" +
                getPriorityHTML(order.priority) +
                "</td>" +

                "<td>" +
                getStatusHTML(order.status) +
                "</td>" +

                "</tr>";

        }

    }

    document.getElementById("lab-queue-body").innerHTML = tableHTML;

    document.getElementById("filtered-total").innerHTML =
        filteredOrders.length;

    renderPagination(totalPages, startIndex, pageOrders.length);

}


/* Creates the pagination buttons. */
function renderPagination(totalPages, startIndex, visibleCount) {

    var paginationHTML = "";

    var firstRecord = 0;
    var lastRecord = 0;

    if (filteredOrders.length > 0) {

        firstRecord = startIndex + 1;

        lastRecord = startIndex + visibleCount;

    }

    document.getElementById("pagination-summary").innerHTML =
        "Showing " + firstRecord +
        "–" + lastRecord +
        " of " + filteredOrders.length +
        " orders";


    if (totalPages > 1) {

        if (currentPage > 1) {

            paginationHTML +=
                '<button type="button" onclick="changePage(' +
                (currentPage - 1) + ')">‹</button>';

        } else {

            paginationHTML +=
                '<button type="button" disabled>‹</button>';

        }


        for (var i = 1; i <= totalPages; i++) {

            if (i === currentPage) {

                paginationHTML +=
                    '<button type="button" class="selected" onclick="changePage(' +
                    i + ')">' + i + '</button>';

            } else {

                paginationHTML +=
                    '<button type="button" onclick="changePage(' +
                    i + ')">' + i + '</button>';

            }

        }


        if (currentPage < totalPages) {

            paginationHTML +=
                '<button type="button" onclick="changePage(' +
                (currentPage + 1) + ')">›</button>';

        } else {

            paginationHTML +=
                '<button type="button" disabled>›</button>';

        }

    }

    document.getElementById("page-buttons").innerHTML =
        paginationHTML;

}


/* Changes the current pagination page. */
function changePage(pageNumber) {

    currentPage = pageNumber;

    renderLabQueue();

}


/* Handles the search input. */
function searchLabOrders() {

    searchText = document.getElementById("order-search").value;

    currentPage = 1;

    renderLabQueue();

}


/* Filters orders according to status. */
function filterByStatus() {

    selectedStatus =
        document.getElementById("status-filter").value;

    currentPage = 1;

    renderLabQueue();

}


/* Filters orders according to priority. */
function filterByPriority() {

    selectedPriority =
        document.getElementById("priority-filter").value;

    currentPage = 1;

    renderLabQueue();

}


/* Displays the current date. */
function showCurrentDate() {

    var today = new Date();

    var day = today.getDate();

    var monthNames = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    var month = monthNames[today.getMonth()];

    var year = today.getFullYear();

    document.getElementById("queue-date").innerHTML =
        "📅 " + day + " " + month + " " + year;

}


/* Initializes all Lab Queue functionalities. */
function initializeLabQueue() {

    renderStatistics();

    showCurrentDate();

    renderLabQueue();

    document.getElementById("order-search")
        .addEventListener("input", searchLabOrders);

    document.getElementById("status-filter")
        .addEventListener("change", filterByStatus);

    document.getElementById("priority-filter")
        .addEventListener("change", filterByPriority);

}


/* Runs the page initialization after loading. */
window.onload = initializeLabQueue;
