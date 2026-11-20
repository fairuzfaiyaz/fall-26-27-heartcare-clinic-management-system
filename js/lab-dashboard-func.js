
/*
    Lab Technician Dashboard Functionalities
*/

/* Stores current search and filter values. */
let currentSearchText = "";
let currentStatus = "All";


/* Checks whether the search text exists in a value. */
function containsText(text, searchValue) {

    if (searchValue === "") {
        return true;
    }

    if (text.indexOf(searchValue) !== -1) {
        return true;
    }

    return false;
}


/* Calculates and displays dashboard statistics. */
function renderDashboardStats() {

    let totalOrders = labOrders.length;
    let pendingOrders = 0;
    let processingOrders = 0;
    let completedOrders = 0;

    for (let i = 0; i < labOrders.length; i++) {

        if (labOrders[i].status === "Pending") {
            pendingOrders++;

        } else if (labOrders[i].status === "Processing") {
            processingOrders++;

        } else if (labOrders[i].status === "Completed") {
            completedOrders++;
        }
    }

    document.getElementById("total-orders").innerHTML = totalOrders;

    document.getElementById("pending-orders").innerHTML = pendingOrders;

    document.getElementById("processing-orders").innerHTML = processingOrders;

    document.getElementById("completed-orders").innerHTML = completedOrders;


    let completedPercent = 0;
    let processingPercent = 0;
    let pendingPercent = 0;

    if (totalOrders > 0) {

        completedPercent = Math.round(
            (completedOrders / totalOrders) * 100
        );

        processingPercent = Math.round(
            (processingOrders / totalOrders) * 100
        );

        pendingPercent = 100 - completedPercent - processingPercent;
    }

    document.getElementById("completed-percent").innerHTML =
        completedPercent + "%";

    document.getElementById("processing-percent").innerHTML =
        processingPercent + "%";

    document.getElementById("pending-percent").innerHTML =
        pendingPercent + "%";


    document.getElementById("completed-fill").style.width =
        completedPercent + "%";

    document.getElementById("processing-fill").style.width =
        processingPercent + "%";

    document.getElementById("pending-fill").style.width =
        pendingPercent + "%";
}


/* Displays lab orders in the table using search and status filter. */
function renderLabOrders() {

    console.log(labOrders);

    let tableBody = document.getElementById("lab-orders-body");

    let output = "";
    let visibleCount = 0;

    for (let i = 0; i < labOrders.length; i++) {

        let order = labOrders[i];

        let matchesSearch =
            containsText(order.orderId, currentSearchText) ||
            containsText(order.patientName, currentSearchText) ||
            containsText(order.testName, currentSearchText) ||
            containsText(order.doctor, currentSearchText);

        let matchesStatus =
            currentStatus === "All" ||
            order.status === currentStatus;


        if (matchesSearch && matchesStatus) {

            let priorityClass = "normal";
            let statusClass = "pending";

            if (order.priority === "High") {
                priorityClass = "high";
            }

            if (order.status === "Processing") {
                statusClass = "processing";

            } else if (order.status === "Completed") {
                statusClass = "completed";
            }


            output += "<tr>";

            output += "<td>" + order.orderId + "</td>";

            output += "<td>" + order.patientName + "</td>";

            output += "<td>" + order.testName + "</td>";

            output += "<td>" + order.doctor + "</td>";

            output += '<td><span class="priority ' +
                priorityClass + '">' +
                order.priority + "</span></td>";

            output += '<td><span class="status ' +
                statusClass + '">' +
                order.status + "</span></td>";

            output += "</tr>";

            visibleCount++;
        }
    }


    if (visibleCount === 0) {

        output =
            '<tr><td colspan="6">No matching lab orders found.</td></tr>';
    }

    tableBody.innerHTML = output;
}


/* Gets search input and updates the table. */
function searchLabOrders() {

    currentSearchText =
        document.getElementById("order-search").value;

    renderLabOrders();
}


/* Filters lab orders according to selected status. */
function filterLabOrders() {

    currentStatus =
        document.getElementById("status-filter").value;

    renderLabOrders();
}


/* Displays the current date. */
function showCurrentDate() {

    let today = new Date();

    let dateText = today.toDateString();

    document.getElementById("dashboard-date").innerHTML =
        "&#128197; " + dateText;
}


/* Initializes all dashboard functions and events. */
function initializeDashboard() {

    renderDashboardStats();

    renderLabOrders();

    showCurrentDate();

    document.getElementById("order-search").onkeyup =
        searchLabOrders;

    document.getElementById("status-filter").onchange =
        filterLabOrders;
}


/* Runs dashboard initialization when the page loads. */
window.onload = initializeDashboard;
