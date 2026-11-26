// admin-reports.js
// Builds the monthly report on reports.php
// Needs (loaded before this file):
//   admin-reports-data.js -> reportMonths, monthlyReports
//   common.js             -> showToday, showError, clearErrors

// 482500 -> "৳482,500"
function formatMoney(amount) {
  return "৳" + amount.toLocaleString("en-US");
}

// Look for the report of one month. Returns the object, or null if none.
function findReport(month, year) {
  for (let i = 0; i < monthlyReports.length; i++) {
    if (monthlyReports[i].month === month && monthlyReports[i].year === year) {
      return monthlyReports[i];
    }
  }
  return null;
}

// Build table rows from a list of { name, value } objects.
// isMoney true -> the value is shown as ৳ money.
function buildRows(list, isMoney) {
  let rows = "";
  for (let i = 0; i < list.length; i++) {
    let text = isMoney ? formatMoney(list[i].value) : list[i].value;
    rows += "<tr><td>" + list[i].name + "</td><td>" + text + "</td></tr>";
  }
  return rows;
}

// Fill the whole report for the month and year chosen in the dropdowns
function showReport() {
  let month = document.getElementById("rep_month").value;
  let year = Number(document.getElementById("rep_year").value);
  let report = findReport(month, year);

  document.getElementById("report-title").innerHTML =
    "Monthly Report: " + month + " " + year;
  document.getElementById("report-generated").innerHTML =
    "Generated " + new Date().toDateString();

  // No data for this month: show a message and hide the report body
  if (report === null) {
    document.getElementById("report-empty").style.display = "block";
    document.getElementById("report-body").style.display = "none";
    return;
  }
  document.getElementById("report-empty").style.display = "none";
  document.getElementById("report-body").style.display = "block";

  // Six number boxes: two arrays with the same length (label and value)
  let labels = [
    "New patients (this month)",
    "Total patients (all time)",
    "Total appointments",
    "Completed consultations",
    "Cancellations",
    "Revenue collected",
  ];
  let values = [
    report.newPatients,
    report.totalPatients.toLocaleString("en-US"),
    report.appointments,
    report.completed,
    report.cancelled,
    formatMoney(report.revenue),
  ];
  let boxes = "";
  for (let i = 0; i < labels.length; i++) {
    boxes +=
      '<div class="adm-stat"><span>' +
      labels[i] +
      "</span><strong>" +
      values[i] +
      "</strong></div>";
  }
  document.getElementById("stats-box").innerHTML = boxes;

  // Three tables of { name, value }
  document.getElementById("revenue-rows").innerHTML = buildRows(
    report.revenueByDoctor,
    true,
  );
  document.getElementById("busiest-rows").innerHTML = buildRows(
    report.busiestDoctors,
    false,
  );
  document.getElementById("tests-rows").innerHTML = buildRows(
    report.topTests,
    false,
  );

  // Abnormal rate = flagged / valid results x 100, rounded to 1 decimal.
  // The ternary avoids dividing by zero.
  let rate =
    report.validResults > 0
      ? Math.round((report.flaggedResults / report.validResults) * 1000) / 10
      : 0;
  document.getElementById("abnormal-rows").innerHTML =
    "<tr><td>Results with valid numeric values</td><td>" +
    report.validResults +
    "</td></tr>" +
    "<tr><td>Flagged LOW or HIGH</td><td>" +
    report.flaggedResults +
    "</td></tr>" +
    "<tr><td>Abnormal rate</td><td>" +
    rate +
    "%</td></tr>";
}

// Generate Report button (onsubmit="return generateReport()")
function generateReport() {
  clearErrors(["rep_month"]);

  let month = document.getElementById("rep_month").value;
  let year = Number(document.getElementById("rep_year").value);

  // A report for a month that has not started yet makes no sense.
  // Compare (year, month number) with today's year and month.
  let today = new Date();
  let monthNumber = reportMonths.indexOf(month); // January = 0
  let isFuture =
    year > today.getFullYear() ||
    (year === today.getFullYear() && monthNumber > today.getMonth());

  if (isFuture) {
    showError("rep_month", "You cannot generate a report for a future month.");
    return false;
  }

  showReport();
  return false; // no backend yet, stay on the page
}

// Run when the page loads (October 2026 is selected by default)
showReport();
showToday();
