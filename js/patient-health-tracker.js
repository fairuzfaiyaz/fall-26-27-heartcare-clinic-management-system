/* ==========================================================================
   HeartCare Clinic - Health Tracker page
   File: js/health-tracker.js
   Page: health-tracker.html  (no libraries, no charts)

   Frontend only: measurements live in the array below. Changes work while you
   stay on the page and reset on reload. Later PHP/MySQL replaces the array
   (SELECT / INSERT / UPDATE / DELETE on a "measurements" table).

   Features: Read (table + latest readings), Search + type filter,
   Create and Update through a pop-up form, Delete, validation with red
   messages next to each field.
   ========================================================================== */

/* ---------- 1. Settings: informational reference ranges ----------
   These are NOT a diagnosis. Change them here (or load them from the
   database later). */
const REF = {
  bp: { sysMin: 90, sysMax: 129, diaMin: 60, diaMax: 84 },
  glucose: {
    Fasting: { min: 70, max: 99 },
    "Before meal": { min: 70, max: 130 },
    "After meal": { min: 70, max: 180 },
    Random: { min: 70, max: 140 },
  },
  weight: { min: 45, max: 100 },
};

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
const TYPE_NAMES = {
  bp: "Blood pressure",
  glucose: "Blood glucose",
  weight: "Weight",
};

// which inputs belong to which measurement type
const FIELDS_BY_TYPE = {
  bp: ["m_sys", "m_dia"],
  glucose: ["m_glu", "m_ctx"],
  weight: ["m_wt"],
};

/* ---------- 2. Data: array of objects ---------- */
let measurements = [
  {
    id: 1,
    date: "2026-10-28",
    type: "bp",
    sys: 118,
    dia: 78,
    context: "",
    note: "",
  },
  {
    id: 2,
    date: "2026-10-27",
    type: "glucose",
    value: 95,
    context: "Fasting",
    note: "",
  },
  {
    id: 3,
    date: "2026-10-25",
    type: "weight",
    value: 71.0,
    context: "",
    note: "",
  },
  {
    id: 4,
    date: "2026-10-21",
    type: "bp",
    sys: 122,
    dia: 80,
    context: "",
    note: "",
  },
  {
    id: 5,
    date: "2026-10-18",
    type: "glucose",
    value: 118,
    context: "After meal",
    note: "",
  },
  {
    id: 6,
    date: "2026-10-14",
    type: "bp",
    sys: 142,
    dia: 92,
    context: "",
    note: "Felt stressed",
  },
  {
    id: 7,
    date: "2026-10-12",
    type: "weight",
    value: 71.4,
    context: "",
    note: "",
  },
  {
    id: 8,
    date: "2026-10-08",
    type: "glucose",
    value: 102,
    context: "Fasting",
    note: "",
  },
];
let nextId = 9; // always one more than the highest id above
let editId = null; // null = adding, a number = id of the entry being edited

/* ---------- 3. Small helpers ---------- */
function el(id) {
  return document.getElementById(id);
}

function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}

// today as YYYY-MM-DD
function todayString() {
  const d = new Date();
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

// "2026-10-28" -> "28 Oct 2026"
function formatDate(s) {
  const p = s.split("-");
  return p[2] + " " + MONTHS[Number(p[1]) - 1] + " " + p[0];
}

// stops user text from being read as HTML when we use innerHTML
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// returns a new array without the item at index (slice + concat)
function removeAt(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}

// newest first (works on a copy so the original order is kept)
function sortedNewestFirst() {
  const copy = measurements.slice();
  copy.sort(function (a, b) {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return b.id - a.id;
  });
  return copy;
}

function findById(id) {
  for (let i = 0; i < measurements.length; i++) {
    if (measurements[i].id === id) return measurements[i];
  }
  return null;
}

function indexOfId(id) {
  for (let i = 0; i < measurements.length; i++) {
    if (measurements[i].id === id) return i;
  }
  return -1;
}

function valueText(m) {
  switch (m.type) {
    case "bp":
      return m.sys + "/" + m.dia + " mmHg";
    case "glucose":
      return m.value + " mg/dL";
    default:
      return Number(m.value).toFixed(1) + " kg";
  }
}

function notesText(m) {
  const parts = [];
  if (m.context !== "") parts.push(m.context);
  if (m.note !== "") parts.push(m.note);
  return parts.length > 0 ? parts.join(" · ") : "—";
}

// true when the reading is inside the configured range
function isInRange(m) {
  switch (m.type) {
    case "bp":
      return (
        m.sys >= REF.bp.sysMin &&
        m.sys <= REF.bp.sysMax &&
        m.dia >= REF.bp.diaMin &&
        m.dia <= REF.bp.diaMax
      );
    case "glucose": {
      const r = REF.glucose[m.context] || REF.glucose["Random"];
      return m.value >= r.min && m.value <= r.max;
    }
    default:
      return m.value >= REF.weight.min && m.value <= REF.weight.max;
  }
}

/* ---------- 4. Page elements (all exist in the HTML) ---------- */
const form = el("measure-form");
const modal = el("modal");
const tbody = el("log-body");
const searchBox = el("log-search");
const typeFilter = el("log-type");
const countLine = el("log-count");
const formMsg = el("form-msg");
const pageMsg = el("page-msg");
const saveBtn = el("save-btn");
const cancelBtn = el("cancel-btn");

/* ---------- 5. READ + SEARCH: table ---------- */
function renderTable() {
  const text = searchBox.value.trim().toLowerCase();
  const typeChoice = typeFilter.value;
  const list = sortedNewestFirst();
  let html = "";
  let shown = 0;

  for (let i = 0; i < list.length; i++) {
    const m = list[i];
    if (typeChoice !== "all" && m.type !== typeChoice) continue;

    const rowText =
      formatDate(m.date) +
      " " +
      TYPE_NAMES[m.type] +
      " " +
      valueText(m) +
      " " +
      notesText(m);
    if (text !== "" && rowText.toLowerCase().indexOf(text) === -1) continue;

    const flag = isInRange(m)
      ? '<span class="pp-flag pp-flag--in">Within range</span>'
      : '<span class="pp-flag pp-flag--out">Outside configured range</span>';

    html +=
      "<tr>" +
      "<td>" +
      formatDate(m.date) +
      "</td>" +
      "<td>" +
      TYPE_NAMES[m.type] +
      "</td>" +
      "<td>" +
      valueText(m) +
      "</td>" +
      "<td>" +
      escapeHtml(notesText(m)) +
      "</td>" +
      "<td>" +
      flag +
      "</td>" +
      '<td><div class="pp-actions">' +
      '<button type="button" class="pp-act" data-action="edit" data-id="' +
      m.id +
      '">Edit</button>' +
      '<button type="button" class="pp-act pp-act--danger" data-action="delete" data-id="' +
      m.id +
      '">Delete</button>' +
      "</div></td></tr>";
    shown++;
  }

  if (shown === 0) {
    html =
      '<tr><td colspan="6" class="pp-empty">No measurements found.</td></tr>';
  }
  tbody.innerHTML = html;
  countLine.textContent =
    "Showing " + shown + " of " + measurements.length + " entries.";
}

/* ---------- 6. Latest readings cards ---------- */
function showLatest(valueId, dateId, m, unit) {
  if (m === null) {
    el(valueId).innerHTML = "—";
    el(dateId).textContent = "No readings yet";
    return;
  }
  let number;
  if (m.type === "bp") {
    number = m.sys + "/" + m.dia;
  } else if (m.type === "glucose") {
    number = String(m.value);
  } else {
    number = Number(m.value).toFixed(1);
  }
  el(valueId).innerHTML = number + " <small>" + unit + "</small>";

  let dateText = formatDate(m.date);
  if (m.context !== "") dateText += " · " + m.context;
  el(dateId).textContent = dateText;
}

function renderLatest() {
  const list = sortedNewestFirst(); // newest first, so the first match is the latest
  let bp = null,
    glu = null,
    wt = null;

  for (let i = 0; i < list.length; i++) {
    if (list[i].type === "bp" && bp === null) bp = list[i];
    if (list[i].type === "glucose" && glu === null) glu = list[i];
    if (list[i].type === "weight" && wt === null) wt = list[i];
  }

  showLatest("latest-bp", "latest-bp-date", bp, "mmHg");
  showLatest("latest-glu", "latest-glu-date", glu, "mg/dL");
  showLatest("latest-wt", "latest-wt-date", wt, "kg");
}

function renderAll() {
  renderTable();
  renderLatest();
}

/* ---------- 7. Messages and validation ---------- */
// green message above the table (shown after save / update / delete)
let pageMsgTimer = null;
function showPageMessage(text) {
  pageMsg.textContent = text;
  pageMsg.className = "pp-alert pp-alert--ok";
  pageMsg.hidden = false;
  clearTimeout(pageMsgTimer);
  pageMsgTimer = setTimeout(function () {
    pageMsg.hidden = true;
  }, 4000);
}

// red text under a field (Lab 04 Task 1 style)
function showError(inputId, message) {
  const input = el(inputId);
  const box = input.parentNode; // the .pp-field wrapper
  const old = box.querySelector(".field-error");
  if (old) box.removeChild(old);

  const span = document.createElement("span");
  span.className = "field-error";
  span.textContent = message;
  box.appendChild(span);
  input.classList.add("has-error");
}

function clearErrors() {
  const errors = form.querySelectorAll(".field-error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].parentNode.removeChild(errors[i]);
  }
  const inputs = form.querySelectorAll(".pp-input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("has-error");
  }
  formMsg.hidden = true;
}

// red message inside the pop-up
function showFormError(text) {
  formMsg.textContent = text;
  formMsg.className = "pp-alert pp-alert--error";
  formMsg.hidden = false;
}

// reads one number field; shows an error and returns null when it is wrong
function readNumber(id, label, min, max, wholeOnly) {
  const raw = el(id).value.trim();
  if (raw === "") {
    showError(id, label + " is required.");
    return null;
  }
  const n = Number(raw);
  if (isNaN(n)) {
    showError(id, label + " must be a number.");
    return null;
  }
  if (wholeOnly && n % 1 !== 0) {
    showError(id, label + " must be a whole number.");
    return null;
  }
  if (n < min || n > max) {
    showError(id, label + " must be between " + min + " and " + max + ".");
    return null;
  }
  return n;
}

/* Checks the whole form. Returns null if something is wrong, otherwise an
   object holding only the parts the user filled in. */
function validateForm() {
  clearErrors();
  let ok = true;
  const result = { date: "", note: "", bp: null, glucose: null, weight: null };

  // date: required and not in the future
  const date = el("m_date").value;
  if (date === "") {
    showError("m_date", "Please choose the measurement date.");
    ok = false;
  } else if (date > todayString()) {
    showError("m_date", "The date cannot be in the future.");
    ok = false;
  }
  result.date = date;

  // notes: optional, at most 200 characters
  const note = el("m_note").value.trim();
  if (note.length > 200) {
    showError("m_note", "Notes can be at most 200 characters.");
    ok = false;
  }
  result.note = note;

  // which measurement types are being saved?
  let wantBp, wantGlucose, wantWeight;
  if (editId === null) {
    wantBp = el("m_sys").value.trim() !== "" || el("m_dia").value.trim() !== "";
    wantGlucose = el("m_glu").value.trim() !== "";
    wantWeight = el("m_wt").value.trim() !== "";
  } else {
    const editingType = findById(editId).type;
    wantBp = editingType === "bp";
    wantGlucose = editingType === "glucose";
    wantWeight = editingType === "weight";
  }

  if (!wantBp && !wantGlucose && !wantWeight) {
    showFormError(
      "Enter at least one measurement: blood pressure, glucose or weight.",
    );
    return null;
  }

  if (wantBp) {
    const sys = readNumber("m_sys", "Systolic", 50, 260, true);
    const dia = readNumber("m_dia", "Diastolic", 30, 160, true);
    if (sys === null || dia === null) {
      ok = false;
    } else if (sys <= dia) {
      showError("m_sys", "Systolic must be higher than diastolic.");
      ok = false;
    } else {
      result.bp = { sys: sys, dia: dia };
    }
  }

  if (wantGlucose) {
    const glu = readNumber("m_glu", "Blood glucose", 20, 600, false);
    if (glu === null) {
      ok = false;
    } else {
      result.glucose = { value: glu, context: el("m_ctx").value };
    }
  }

  if (wantWeight) {
    const wt = readNumber("m_wt", "Weight", 1, 400, false);
    if (wt === null) {
      ok = false;
    } else {
      result.weight = { value: wt };
    }
  }

  if (!ok) {
    showFormError("Please fix the highlighted fields.");
    return null;
  }
  return result;
}

/* ---------- 8. Pop-up: open / close ---------- */
function setFieldsDisabled(onlyType) {
  // onlyType = the one type that stays enabled (null = enable everything)
  for (const type in FIELDS_BY_TYPE) {
    for (let i = 0; i < FIELDS_BY_TYPE[type].length; i++) {
      el(FIELDS_BY_TYPE[type][i]).disabled =
        onlyType !== null && type !== onlyType;
    }
  }
}

// empties the form and puts it back into "add" mode
function resetForm() {
  editId = null;
  form.reset();
  el("m_date").value = todayString();
  setFieldsDisabled(null);
  saveBtn.textContent = "Save Measurement";
  el("form-eyebrow").textContent = "ADD ENTRY";
  el("form-title").textContent = "Record a Measurement";
  el("form-hint").hidden = false;
  clearErrors();
}

function openForm() {
  modal.hidden = false;
  document.body.style.overflow = "hidden"; // page behind does not scroll
  el("m_date").focus();
}

function closeForm() {
  modal.hidden = true;
  document.body.style.overflow = "";
  resetForm();
}

// "Add Measurement" / "Add new"
function openAddForm() {
  resetForm();
  openForm();
}

/* ---------- 9. CREATE + UPDATE ---------- */
function saveMeasurement() {
  const data = validateForm();
  if (data === null) return;

  let message;
  if (editId === null) {
    // CREATE: push one object for every type that was filled in
    let count = 0;
    if (data.bp !== null) {
      measurements.push({
        id: nextId++,
        date: data.date,
        type: "bp",
        sys: data.bp.sys,
        dia: data.bp.dia,
        context: "",
        note: data.note,
      });
      count++;
    }
    if (data.glucose !== null) {
      measurements.push({
        id: nextId++,
        date: data.date,
        type: "glucose",
        value: data.glucose.value,
        context: data.glucose.context,
        note: data.note,
      });
      count++;
    }
    if (data.weight !== null) {
      measurements.push({
        id: nextId++,
        date: data.date,
        type: "weight",
        value: data.weight.value,
        context: "",
        note: data.note,
      });
      count++;
    }
    message =
      count === 1
        ? "Measurement added to your log."
        : count + " measurements added to your log.";
  } else {
    // UPDATE: change the properties of the existing object
    const m = findById(editId);
    m.date = data.date;
    m.note = data.note;
    if (m.type === "bp") {
      m.sys = data.bp.sys;
      m.dia = data.bp.dia;
    } else if (m.type === "glucose") {
      m.value = data.glucose.value;
      m.context = data.glucose.context;
    } else {
      m.value = data.weight.value;
    }
    message = "Measurement updated.";
  }

  console.log(measurements); // check the array while testing
  closeForm();
  renderAll();
  showPageMessage(message);
}

function startEdit(id) {
  const m = findById(id);
  if (m === null) return;

  resetForm();
  editId = id;
  el("m_date").value = m.date;
  el("m_note").value = m.note;

  if (m.type === "bp") {
    el("m_sys").value = m.sys;
    el("m_dia").value = m.dia;
  } else if (m.type === "glucose") {
    el("m_glu").value = m.value;
    el("m_ctx").value = m.context;
  } else {
    el("m_wt").value = m.value;
  }

  setFieldsDisabled(m.type); // only the type being edited is active
  saveBtn.textContent = "Update Measurement";
  el("form-eyebrow").textContent = "EDIT ENTRY";
  el("form-title").textContent = "Edit " + TYPE_NAMES[m.type];
  el("form-hint").hidden = true;
  openForm();
}

/* ---------- 10. DELETE ---------- */
function deleteMeasurement(id) {
  const index = indexOfId(id);
  if (index === -1) return;
  if (!confirm("Delete this measurement?")) return;

  measurements = removeAt(measurements, index);
  renderAll();
  showPageMessage("Measurement deleted.");
}

/* ---------- 11. Events and start-up ---------- */
el("m_date").max = todayString(); // simple HTML5 rule

el("add-btn").addEventListener("click", openAddForm);
el("add-link").addEventListener("click", function (e) {
  e.preventDefault();
  openAddForm();
});

form.addEventListener("submit", function (e) {
  e.preventDefault(); // like "return false" in Week 06
  saveMeasurement();
});

el("close-btn").addEventListener("click", closeForm);
cancelBtn.addEventListener("click", closeForm);

// click on the dark area around the box closes the pop-up
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeForm();
});

// Esc key closes the pop-up
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.hidden) closeForm();
});

searchBox.addEventListener("keyup", renderTable);
typeFilter.addEventListener("change", renderTable);

// one listener for all Edit / Delete buttons (rows are redrawn often)
tbody.addEventListener("click", function (e) {
  const btn = e.target;
  const action = btn.getAttribute("data-action");
  if (!action) return;
  const id = Number(btn.getAttribute("data-id"));
  if (action === "edit") {
    startEdit(id);
  } else {
    deleteMeasurement(id);
  }
});

resetForm();
renderAll();

// opening health-tracker.html#add goes straight to the form
if (window.location.hash === "#add") openAddForm();
