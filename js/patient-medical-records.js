// patient-medical-records.js
// Medical Records (READ ONLY): the page shows the real content of every
// consultation, prescription and lab report, with search, filter and sort,
// plus a summary and the patient's own health trends.
// Patients cannot edit doctor-written records, so there is no create/update/delete.
//
// Needs (loaded before this file):
//   patient-account-data.js        -> patient
//   patient-health-tracker-data.js -> measurementTypes, healthLog (for the trends)
//   patient-medical-records-data.js-> recordTypes, medicalRecords
//   patient-common.js              -> formatDate, formatDayMonth, containsText,
//                                     showPatientHeader

// Badge colour of each record type (switch)
function typeClass(type) {
  switch (type) {
    case "Consultation":
      return "status-badge--done";
    case "Prescription":
      return "status-badge--pending";
    case "Lab report":
      return "status-badge--confirmed";
    default:
      return "";
  }
}

// One "label: value" box for the details grid
function kv(label, value) {
  return "<div><span>" + label + "</span><strong>" + value + "</strong></div>";
}

// LOW / HIGH / Normal for one lab result (informational, not a diagnosis)
function flagOf(result) {
  if (result.value < result.min) {
    return "LOW";
  } else if (result.value > result.max) {
    return "HIGH";
  } else {
    return "Normal";
  }
}

// ---------- The three kinds of record body ----------

function consultationBody(r) {
  let followUp = r.followUp === "" ? "None" : formatDate(r.followUp);

  return (
    '<div class="pp-kv pp-kv--2">' +
    kv("Reason for visit", r.reason) +
    kv("Diagnosis", r.diagnosis) +
    kv("Blood pressure", r.bp) +
    kv("Heart rate", r.heartRate) +
    kv("Weight", r.weight) +
    kv("Follow-up", followUp) +
    "</div>" +
    '<p class="pp-hint"><strong>Doctor\'s notes:</strong> ' +
    r.notes +
    "</p>"
  );
}

function prescriptionBody(r) {
  let rows = "";
  for (let i = 0; i < r.medicines.length; i++) {
    let m = r.medicines[i];
    rows +=
      "<tr><td><strong>" +
      m.name +
      "</strong></td><td>" +
      m.dose +
      "</td><td>" +
      m.frequency +
      "</td><td>" +
      m.duration +
      "</td></tr>";
  }

  return (
    '<div class="table-wrapper"><table class="pp-lines">' +
    "<thead><tr><th>Medicine</th><th>Dose</th><th>How often</th><th>For</th></tr></thead>" +
    "<tbody>" +
    rows +
    "</tbody></table></div>" +
    '<p class="pp-hint"><strong>Advice:</strong> ' +
    r.advice +
    "</p>"
  );
}

function labBody(r) {
  let rows = "";
  for (let i = 0; i < r.results.length; i++) {
    let x = r.results[i];
    let flag = flagOf(x);
    let flagClass = flag === "Normal" ? "pp-flag--in" : "pp-flag--out";

    rows +=
      "<tr><td><strong>" +
      x.test +
      "</strong></td>" +
      "<td>" +
      x.value +
      " " +
      x.unit +
      "</td>" +
      "<td>" +
      x.min +
      " – " +
      x.max +
      " " +
      x.unit +
      "</td>" +
      '<td><span class="pp-flag ' +
      flagClass +
      '">' +
      flag +
      "</span></td></tr>";
  }

  return (
    '<p class="pp-hint">Order ' +
    r.orderNo +
    " · Lab technician: " +
    r.technician +
    "</p>" +
    '<div class="table-wrapper"><table class="pp-lines">' +
    "<thead><tr><th>Test</th><th>Result</th><th>Reference range</th><th>Flag</th></tr></thead>" +
    "<tbody>" +
    rows +
    "</tbody></table></div>" +
    '<p class="pp-hint">Flags are informational and are not a diagnosis. Please discuss your results with your doctor.</p>'
  );
}

// Choose the right body for the record type (switch)
function bodyOf(r) {
  switch (r.type) {
    case "Consultation":
      return consultationBody(r);
    case "Prescription":
      return prescriptionBody(r);
    case "Lab report":
      return labBody(r);
    default:
      return "";
  }
}

// All the words of a record in one text. The search looks inside it,
// so you can find a record by medicine, test or diagnosis too.
function recordText(r) {
  let text =
    r.title +
    " " +
    r.type +
    " " +
    r.doctor +
    " " +
    r.department +
    " " +
    formatDate(r.date);

  if (r.type === "Consultation") {
    text += " " + r.reason + " " + r.diagnosis + " " + r.notes;
  } else if (r.type === "Prescription") {
    for (let i = 0; i < r.medicines.length; i++) {
      text += " " + r.medicines[i].name;
    }
    text += " " + r.advice;
  } else {
    text += " " + r.orderNo;
    for (let i = 0; i < r.results.length; i++) {
      text += " " + r.results[i].test;
    }
  }

  return text;
}

// A copy of the records in date order. newestFirst true = newest on top.
// (a simple selection sort on the date text; same date: higher id first)
function sortedRecords(newestFirst) {
  let copy = medicalRecords.slice(); // slice() makes a copy, the original stays as it is

  for (let i = 0; i < copy.length; i++) {
    for (let j = i + 1; j < copy.length; j++) {
      let jIsNewer =
        copy[j].date > copy[i].date ||
        (copy[j].date === copy[i].date && copy[j].id > copy[i].id);
      let swap = newestFirst ? jIsNewer : !jIsNewer;

      if (swap) {
        let temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
      }
    }
  }
  return copy;
}

// 1. Fill the type filter from the data (createElement + appendChild)
function fillTypes() {
  let select = document.getElementById("rec-type");

  for (let i = 0; i < recordTypes.length; i++) {
    let option = document.createElement("option");
    option.value = recordTypes[i];
    option.innerHTML = recordTypes[i];
    select.appendChild(option);
  }
}

// 2. READ + SEARCH + FILTER + SORT: draw the timeline
//    Runs on page load, on every key typed (onkeyup) and on onchange.
function renderRecords() {
  let search = document.getElementById("rec-search").value;
  let typeFilter = document.getElementById("rec-type").value;
  let newestFirst = document.getElementById("rec-sort").value === "newest";
  let list = sortedRecords(newestFirst);
  let html = "";
  let count = 0;

  for (let i = 0; i < list.length; i++) {
    let r = list[i];

    let matchesType = typeFilter === "All" || r.type === typeFilter;
    let matchesSearch = containsText(recordText(r), search);

    if (matchesType && matchesSearch) {
      html +=
        '<li class="pp-tl__item"><span class="pp-tl__dot" aria-hidden="true"></span>' +
        '<div class="pp-tl__card">' +
        '<div class="pp-tl__top"><time datetime="' +
        r.date +
        '">' +
        formatDate(r.date) +
        "</time>" +
        '<span class="status-badge ' +
        typeClass(r.type) +
        '">' +
        r.type +
        "</span></div>" +
        "<h3>" +
        r.title +
        "</h3>" +
        '<p class="pp-tl__meta">' +
        r.doctor +
        " · " +
        r.department +
        "</p>" +
        '<div class="pp-rec-body">' +
        bodyOf(r) +
        "</div>" +
        "</div></li>";
      count++;
    }
  }

  if (count === 0) {
    html = '<li class="pp-empty">No records match your search.</li>';
  }

  document.getElementById("timeline").innerHTML = html;
  document.getElementById("rec-count").innerHTML =
    "Showing " + count + " of " + medicalRecords.length + " records.";
  console.log(medicalRecords); // for checking the array while testing
}

// How many records of one type
function countType(type) {
  let count = 0;
  for (let i = 0; i < medicalRecords.length; i++) {
    if (medicalRecords[i].type === type) {
      count++;
    }
  }
  return count;
}

// 3. The four summary cards + the quick-link counts
function renderSummary() {
  // last visit = the newest Consultation ("" if none)
  let lastVisit = "";
  for (let i = 0; i < medicalRecords.length; i++) {
    if (
      medicalRecords[i].type === "Consultation" &&
      medicalRecords[i].date > lastVisit
    ) {
      lastVisit = medicalRecords[i].date;
    }
  }

  document.getElementById("sum-consult").innerHTML = countType("Consultation");
  document.getElementById("sum-presc").innerHTML = countType("Prescription");
  document.getElementById("sum-lab").innerHTML = countType("Lab report");
  document.getElementById("sum-last").innerHTML =
    lastVisit === "" ? "None" : formatDayMonth(lastVisit);

  // quick links (1 record / 2 records)
  let p = countType("Prescription");
  let l = countType("Lab report");
  document.getElementById("count-prescriptions").innerHTML =
    p + (p === 1 ? " record" : " records");
  document.getElementById("count-labs").innerHTML =
    l + (l === 1 ? " report" : " reports");
}

// ---------- Personal health trends (from the Health Tracker data) ----------

function unitOf(type) {
  switch (type) {
    case "Blood pressure":
      return "mmHg";
    case "Blood glucose":
      return "mg/dL";
    case "Weight":
      return "kg";
    default:
      return "";
  }
}

// "118/78 mmHg", "95 mg/dL", "71.0 kg"
function trendValue(e) {
  let number = "" + e.value;
  if (e.type === "Blood pressure") {
    number = e.value + "/" + e.value2;
  } else if (e.type === "Weight") {
    number = e.value.toFixed(1);
  }
  return number + " " + unitOf(e.type);
}

// The newest entry of a type. "skip" is an entry to ignore (use null for none),
// so we can ask a second time for the one BEFORE the newest.
function newestOf(type, skip) {
  let found = null;

  for (let i = 0; i < healthLog.length; i++) {
    let e = healthLog[i];
    if (
      e.type === type &&
      e !== skip &&
      (found === null || e.date > found.date)
    ) {
      found = e;
    }
  }
  return found;
}

function renderTrends() {
  let html = "";

  for (let i = 0; i < measurementTypes.length; i++) {
    let type = measurementTypes[i];
    let latest = newestOf(type, null);

    if (latest === null) {
      html += kv(type, "No readings yet");
    } else {
      let previous = newestOf(type, latest);
      let change = "First reading";

      if (previous !== null) {
        // blood pressure is compared by its systolic value (value)
        let diff = Math.round((latest.value - previous.value) * 10) / 10;
        let arrow = "→";
        if (diff > 0) {
          arrow = "↑";
        } else if (diff < 0) {
          arrow = "↓";
        }
        change =
          arrow +
          " " +
          Math.abs(diff) +
          " since " +
          formatDayMonth(previous.date);
      }

      html +=
        "<div><span>" +
        type +
        "<br><small>" +
        formatDate(latest.date) +
        "</small></span>" +
        "<strong>" +
        trendValue(latest) +
        "<br><small>" +
        change +
        "</small></strong></div>";
    }
  }

  document.getElementById("trend-list").innerHTML = html;
}

// Run when the page loads
showPatientHeader();
fillTypes();
renderSummary();
renderRecords();
renderTrends();
