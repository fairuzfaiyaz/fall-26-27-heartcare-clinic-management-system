// admin-audit-log.js
// Read-only list with filters for audit-log.html
// (an audit log is never edited or deleted, so there is no Create/Update/Delete)
// Needs (loaded before this file):
//   admin-audit-log-data.js -> auditLogs, auditMonthNames
//   common.js               -> showToday, containsText, showError, clearErrors

const logFilterFields = ["log_from", "log_to"];

// "2026-10-31" -> "31 Oct 2026"
function formatLogDate(text) {
  let year = text.slice(0, 4);
  let monthIndex = Number(text.slice(5, 7)) - 1;
  let day = text.slice(8, 10);
  return day + " " + auditMonthNames[monthIndex] + " " + year;
}

// READ + FILTERS: loop over the array and keep only the matching rows
function renderLog() {
  let user = document.getElementById("log_user").value;
  let action = document.getElementById("log_action").value;
  let from = document.getElementById("log_from").value;
  let to = document.getElementById("log_to").value;
  let rows = "";
  let count = 0;

  for (let i = 0; i < auditLogs.length; i++) {
    let l = auditLogs[i];

    let matchesUser = containsText(l.user, user);
    let matchesAction = action === "All" || l.action === action;
    // "" means the date box is empty, so no limit
    let matchesFrom = from === "" || l.date >= from;
    let matchesTo = to === "" || l.date <= to;

    if (matchesUser && matchesAction && matchesFrom && matchesTo) {
      rows +=
        "<tr>" +
        "<td>" +
        formatLogDate(l.date) +
        " " +
        l.time +
        "</td>" +
        "<td><strong>" +
        l.user +
        "</strong></td>" +
        "<td>" +
        l.action +
        "</td>" +
        "<td>" +
        l.record +
        "</td>" +
        "</tr>";
      count++;
    }
  }

  if (count === 0) {
    rows = '<tr><td colspan="4">No log entries found.</td></tr>';
  }

  document.getElementById("log-rows").innerHTML = rows;
  document.getElementById("row-count").innerHTML =
    "Showing " + count + " of " + auditLogs.length;
  console.log(auditLogs); // for checking the array while testing
}

// Filter button (onsubmit="return filterLog()")
function filterLog() {
  clearErrors(logFilterFields);

  let from = document.getElementById("log_from").value;
  let to = document.getElementById("log_to").value;

  // Compares two fields: "To" cannot be before "From"
  if (from !== "" && to !== "" && to < from) {
    showError("log_to", "The To date cannot be before the From date.");
    return false;
  }

  renderLog();
  return false; // no backend yet, stay on the page
}

// Reset button: empty every filter and show all rows again
function resetFilters() {
  clearErrors(logFilterFields);
  document.getElementById("log_user").value = "";
  document.getElementById("log_action").value = "All";
  document.getElementById("log_from").value = "";
  document.getElementById("log_to").value = "";
  renderLog();
}

// Run when the page loads
renderLog();
showToday();
