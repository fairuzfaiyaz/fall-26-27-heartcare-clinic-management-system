/* ==========================================================================
   HeartCare Clinic - Medical Records page (read-only)
   File: js/medical-records.js
   Needs js/data.js loaded first (uses the medicalRecords + recordSummary arrays).

   Patients can only VIEW records, so there is no add / edit / delete here.
   Features: timeline drawn from the array, search, type filter, sort order.
   ========================================================================== */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/* ---------- Helpers ---------- */
function el(id) {
  return document.getElementById(id);
}

// "2026-10-20" -> "20 Oct 2026"
function formatDate(s) {
  const p = s.split("-");
  return p[2] + " " + MONTHS[Number(p[1]) - 1] + " " + p[0];
}

// stops text from being read as HTML when we use innerHTML
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// copy of the records sorted by date ("newest" or "oldest")
function sortedRecords(order) {
  const copy = medicalRecords.slice();
  copy.sort(function (a, b) {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return a.id - b.id;
  });
  if (order === "newest") copy.reverse();
  return copy;
}

// all the words of a record in one string, used by the search
function recordText(r) {
  let text =
    formatDate(r.date) +
    " " +
    r.title +
    " " +
    r.doctor +
    " " +
    r.detail +
    " " +
    r.summary;
  for (let i = 0; i < r.links.length; i++) {
    text += " " + r.links[i].label;
  }
  return text.toLowerCase();
}

/* ---------- Page elements ---------- */
const timeline = el("timeline");
const searchBox = el("rec-search");
const typeFilter = el("rec-type");
const sortSelect = el("rec-sort");
const countLine = el("rec-count");

/* ---------- READ + SEARCH: timeline ---------- */
function renderTimeline() {
  const text = searchBox.value.trim().toLowerCase();
  const typeChoice = typeFilter.value;
  const list = sortedRecords(sortSelect.value);
  let html = "";
  let shown = 0;

  for (let i = 0; i < list.length; i++) {
    const r = list[i];
    if (typeChoice !== "all" && r.type !== typeChoice) continue;
    if (text !== "" && recordText(r).indexOf(text) === -1) continue;

    let links = "";
    for (let j = 0; j < r.links.length; j++) {
      links +=
        '<a href="' +
        r.links[j].href +
        '" class="text-link">' +
        escapeHtml(r.links[j].label) +
        "</a>";
    }

    html +=
      '<li class="pp-tl__item"><span class="pp-tl__dot" aria-hidden="true"></span>' +
      '<div class="pp-tl__card"><time datetime="' +
      r.date +
      '">' +
      formatDate(r.date) +
      "</time>" +
      "<h3>" +
      escapeHtml(r.title) +
      "</h3>" +
      '<p class="pp-tl__meta">' +
      escapeHtml(r.doctor) +
      " · " +
      escapeHtml(r.detail) +
      "</p>" +
      "<p>" +
      escapeHtml(r.summary) +
      "</p>" +
      '<div class="pp-tl__links">' +
      links +
      "</div>" +
      "</div></li>";
    shown++;
  }

  if (shown === 0) {
    html = '<li class="pp-empty">No records match your search.</li>';
  }
  timeline.innerHTML = html;
  countLine.textContent =
    "Showing " + shown + " of " + medicalRecords.length + " records.";
}

/* ---------- Quick links: counts ---------- */
function renderQuickLinks() {
  const p = recordSummary.prescriptions;
  const l = recordSummary.labReports;
  el("count-prescriptions").textContent =
    p + (p === 1 ? " record" : " records");
  el("count-labs").textContent = l + (l === 1 ? " report" : " reports");
}

/* ---------- Events and start-up ---------- */
searchBox.addEventListener("keyup", renderTimeline);
typeFilter.addEventListener("change", renderTimeline);
sortSelect.addEventListener("change", renderTimeline);

renderTimeline();
renderQuickLinks();
