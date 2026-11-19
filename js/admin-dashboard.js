// admin-dashboard.js
// Needs data.js to be loaded first (it gives us stats, appointments, ...).

// Turns 482500 into "৳482,500"
function formatMoney(amount) {
  return "৳" + amount.toLocaleString("en-US");
}

// Picks the badge colour class for a status (switch)
function statusClass(status) {
  switch (status) {
    case "Confirmed":
      return "adm-badge--ok";
    case "Pending":
      return "adm-badge--wait";
    case "Completed":
      return "adm-badge--done";
    case "Cancelled":
      return "adm-badge--bad";
    default:
      return "";
  }
}

// 1. Fill the four KPI cards from the stats object
function renderKpis() {
  document.getElementById("kpi-patients").innerHTML =
    stats.patients.toLocaleString("en-US");
  document.getElementById("kpi-patients-note").innerHTML =
    "+" + stats.newPatients + " this month";

  document.getElementById("kpi-doctors").innerHTML = stats.doctors;
  document.getElementById("kpi-doctors-note").innerHTML =
    "Across " + stats.departments + " departments";

  document.getElementById("kpi-today").innerHTML = stats.todayAppointments;
  document.getElementById("kpi-today-note").innerHTML =
    stats.pending + " still pending";

  document.getElementById("kpi-revenue").innerHTML = formatMoney(stats.revenue);
}

// 2. Draw the appointments table. Runs on page load and every time
//    the status filter changes (onchange).
function renderAppointments() {
  let filter = document.getElementById("status-filter").value;
  let rows = "";
  let count = 0;

  for (let i = 0; i < appointments.length; i++) {
    let a = appointments[i];

    // show the row only if the filter is "All" or matches the status
    if (filter === "All" || a.status === filter) {
      rows +=
        "<tr>" +
        "<td>" +
        a.time +
        "</td>" +
        "<td>" +
        a.patient +
        "</td>" +
        "<td>" +
        a.doctor +
        "</td>" +
        "<td>" +
        a.department +
        "</td>" +
        '<td><span class="adm-badge ' +
        statusClass(a.status) +
        '">' +
        a.status +
        "</span></td>" +
        "</tr>";
      count++;
    }
  }

  if (count === 0) {
    rows = '<tr><td colspan="5">No appointments found.</td></tr>';
  }

  document.getElementById("appointment-rows").innerHTML = rows;
}

// 3. Draw the recent activity list
function renderActivities() {
  let items = "";

  for (let i = 0; i < activities.length; i++) {
    let a = activities[i];
    items +=
      "<li>" +
      '<span class="adm-activity__time">' +
      a.time +
      "</span>" +
      "<p><strong>" +
      a.who +
      "</strong> " +
      a.text +
      "</p>" +
      "</li>";
  }

  document.getElementById("activity-list").innerHTML = items;
}

// 4. Draw a simple bar chart with divs (no chart library).
//    containerId : id of the box to draw in
//    labels      : array of names
//    values      : array of numbers (same length as labels)
//    isMoney     : true -> show values as ৳ money
//    fillClass   : extra class for the bar colour ("" = blue)
function drawBars(containerId, labels, values, isMoney, fillClass) {
  // find the biggest value so it gets a 100% wide bar
  let max = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] > max) {
      max = values[i];
    }
  }

  let html = "";
  for (let i = 0; i < values.length; i++) {
    let percent = Math.round((values[i] / max) * 100);
    let text = isMoney ? formatMoney(values[i]) : values[i];

    html +=
      '<div class="adm-bar-row">' +
      "<span>" +
      labels[i] +
      "</span>" +
      '<div class="adm-bar-track"><div class="adm-bar-fill ' +
      fillClass +
      '" style="width: ' +
      percent +
      '%"></div></div>' +
      '<span class="adm-bar-value">' +
      text +
      "</span>" +
      "</div>";
  }

  document.getElementById(containerId).innerHTML = html;
}

// 5. Today's date in the top bar
function showToday() {
  let today = new Date();
  document.getElementById("today-date").innerHTML = today.toDateString();
}

// Run everything once when the page loads
renderKpis();
renderAppointments();
renderActivities();
drawBars("chart-appointments", months, appointmentsPerMonth, false, "");
drawBars(
  "chart-departments",
  departmentNames,
  departmentVisits,
  false,
  "adm-bar-fill--red",
);
drawBars("chart-revenue", months, revenuePerMonth, true, "adm-bar-fill--dark");
showToday();
