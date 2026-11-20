/* ==========================================================================
   HeartCare Clinic - Billing & Invoices page
   File: js/patient-invoice.js
   Needs js/patient-invoice-data.js loaded first (uses invoices, paymentMethods,
   currentPatient).

   Features: patient name in the sidebar, summary cards, invoice list with tabs (All / Unpaid / Paid) and
   search, invoice details, simulated payment (updates the invoice),
   payment history, print.
   No real payment is made. In PHP the payment is done inside a database
   transaction: lock the invoice row, check it belongs to this patient and is
   still unpaid, insert the payment record, set status = paid.
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

function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}

// today as YYYY-MM-DD
function todayString() {
  const d = new Date();
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

// "2026-10-20" -> "20 Oct 2026" ("" -> "—")
function formatDate(s) {
  if (s === "") return "—";
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

function money(n) {
  return "৳" + n.toLocaleString("en-US");
}

// total of all line items of one invoice
function invoiceTotal(inv) {
  let sum = 0;
  for (let i = 0; i < inv.items.length; i++) {
    sum += inv.items[i].amount;
  }
  return sum;
}

function statusBadge(inv) {
  return inv.status === "paid"
    ? '<span class="status-badge status-badge--paid">Paid</span>'
    : '<span class="status-badge status-badge--unpaid">Unpaid</span>';
}

function findInvoice(id) {
  for (let i = 0; i < invoices.length; i++) {
    if (invoices[i].id === id) return invoices[i];
  }
  return null;
}

function findMethod(id) {
  for (let i = 0; i < paymentMethods.length; i++) {
    if (paymentMethods[i].id === id) return paymentMethods[i];
  }
  return null;
}

// copy of the invoices, newest first
function invoicesNewestFirst() {
  const copy = invoices.slice();
  copy.sort(function (a, b) {
    if (a.issued < b.issued) return 1;
    if (a.issued > b.issued) return -1;
    return a.id < b.id ? 1 : -1;
  });
  return copy;
}

// all the words of an invoice in one string, used by the search
function invoiceText(inv) {
  let text =
    inv.id + " " + formatDate(inv.issued) + " " + inv.doctor + " " + inv.status;
  for (let i = 0; i < inv.items.length; i++) {
    text += " " + inv.items[i].name;
  }
  return text.toLowerCase();
}

/* ---------- State ---------- */
let filterChoice = "all"; // all / unpaid / paid
let selectedId = ""; // invoice shown in the details panel

function chooseFirstInvoice() {
  const list = invoicesNewestFirst();
  selectedId = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].status === "unpaid") {
      selectedId = list[i].id; // an unpaid invoice is the most useful one to show
      return;
    }
  }
  if (list.length > 0) selectedId = list[0].id;
}

/* ---------- Summary cards + banner ---------- */
function renderSummary() {
  let outstanding = 0;
  let paidTotal = 0;
  let firstUnpaid = null;
  const list = invoicesNewestFirst();

  for (let i = 0; i < list.length; i++) {
    if (list[i].status === "unpaid") {
      outstanding += invoiceTotal(list[i]);
      firstUnpaid = list[i];
    } else {
      paidTotal += invoiceTotal(list[i]);
    }
  }

  el("k-out").textContent = money(outstanding);
  el("k-paid").textContent = money(paidTotal);
  el("k-count").textContent = pad(invoices.length);
  el("k-methods").textContent = pad(paymentMethods.length);

  if (firstUnpaid !== null) {
    el("banner").innerHTML =
      '<div class="pp-banner"><div><strong>Outstanding balance: ' +
      money(outstanding) +
      "</strong>" +
      "<p>Invoice " +
      firstUnpaid.id +
      " was issued " +
      formatDate(firstUnpaid.issued) +
      " and is due " +
      formatDate(firstUnpaid.due) +
      ".</p></div>" +
      '<button type="button" class="primary-button" data-pick="' +
      firstUnpaid.id +
      '">Pay now</button></div>';
  } else {
    el("banner").innerHTML =
      '<div class="pp-banner pp-banner--ok"><div><strong>You are all paid up</strong>' +
      "<p>There are no outstanding invoices.</p></div></div>";
  }
}

/* ---------- READ + SEARCH: invoice list ---------- */
function renderList() {
  const text = el("inv-search").value.trim().toLowerCase();
  const list = invoicesNewestFirst();
  let html = "";
  let shown = 0;

  for (let i = 0; i < list.length; i++) {
    const inv = list[i];
    if (filterChoice !== "all" && inv.status !== filterChoice) continue;
    if (text !== "" && invoiceText(inv).indexOf(text) === -1) continue;

    const count = inv.items.length;
    html +=
      '<button type="button" class="pp-inv' +
      (inv.id === selectedId ? " is-active" : "") +
      '" data-id="' +
      inv.id +
      '">' +
      '<span class="pp-inv__main"><strong>' +
      inv.id +
      "</strong><small>" +
      formatDate(inv.issued) +
      " · " +
      count +
      (count > 1 ? " items" : " item") +
      "</small></span>" +
      '<span class="pp-inv__side"><span class="pp-inv__amt">' +
      money(invoiceTotal(inv)) +
      "</span>" +
      statusBadge(inv) +
      "</span></button>";
    shown++;
  }

  if (shown === 0) {
    html = '<p class="pp-empty">No invoices found.</p>';
  }
  el("inv-list").innerHTML = html;
}

/* ---------- Invoice details ---------- */
function renderDetail() {
  const inv = findInvoice(selectedId);
  if (inv === null) {
    el("inv-detail").innerHTML =
      '<p class="pp-empty">Select an invoice to see its details.</p>';
    return;
  }

  let rows = "";
  for (let i = 0; i < inv.items.length; i++) {
    rows +=
      "<tr><td>" +
      escapeHtml(inv.items[i].name) +
      '</td><td class="pp-r">' +
      money(inv.items[i].amount) +
      "</td></tr>";
  }

  let foot;
  if (inv.status === "unpaid") {
    if (paymentMethods.length === 0) {
      foot =
        '<div class="pp-alert pp-alert--error">You have no saved payment method. ' +
        '<a class="text-link" href="payment-methods.html">Add one</a> to pay this invoice.</div>';
    } else {
      let options = "";
      for (let k = 0; k < paymentMethods.length; k++) {
        const m = paymentMethods[k];
        options +=
          '<label class="pp-method"><input type="radio" name="method" value="' +
          m.id +
          '"' +
          (k === 0 ? " checked" : "") +
          " /><span><strong>" +
          escapeHtml(m.label) +
          "</strong><small>" +
          (m.tag !== "" ? m.tag : "Demo card") +
          "</small></span></label>";
      }
      foot =
        '<form class="pp-paybox pp-noprint" id="pay-form" data-id="' +
        inv.id +
        '">' +
        '<fieldset class="pp-methods"><legend>Pay with</legend>' +
        options +
        "</fieldset>" +
        '<div id="pay-msg" class="pp-alert" hidden></div>' +
        '<button type="submit" class="primary-button pp-submit" id="pay-btn">Pay ' +
        money(invoiceTotal(inv)) +
        "</button>" +
        '<p class="pp-hint">Need another method? <a class="text-link" href="payment-methods.html">Add one</a>. ' +
        "Simulated checkout only.</p></form>";
    }
  } else {
    foot =
      '<div class="pp-paid-info"><div class="pp-kv pp-kv--2">' +
      "<div><span>Paid on</span><strong>" +
      formatDate(inv.paidOn) +
      "</strong></div>" +
      "<div><span>Payment method</span><strong>" +
      escapeHtml(inv.method) +
      "</strong></div>" +
      "<div><span>Transaction reference</span><strong>" +
      escapeHtml(inv.ref) +
      "</strong></div>" +
      "<div><span>Amount paid</span><strong>" +
      money(invoiceTotal(inv)) +
      "</strong></div>" +
      "</div></div>";
  }

  el("inv-detail").innerHTML =
    '<article class="pp-sheet"><header class="pp-sheet__head">' +
    "<div><strong>HeartCare Clinic</strong><small>Dhaka, Bangladesh</small></div>" +
    '<div class="pp-sheet__meta"><span>Invoice ' +
    inv.id +
    "</span>" +
    statusBadge(inv) +
    "</div></header>" +
    '<div class="pp-kv pp-kv--2">' +
    "<div><span>Billed to</span><strong>" +
    escapeHtml(currentPatient.name) +
    " (" +
    currentPatient.id +
    ")</strong></div>" +
    "<div><span>Doctor</span><strong>" +
    escapeHtml(inv.doctor) +
    "</strong></div>" +
    "<div><span>Issue date</span><strong>" +
    formatDate(inv.issued) +
    "</strong></div>" +
    "<div><span>Due date</span><strong>" +
    formatDate(inv.due) +
    "</strong></div></div>" +
    '<table class="pp-lines"><thead><tr><th>Item</th><th class="pp-r">Amount</th></tr></thead><tbody>' +
    rows +
    "</tbody></table>" +
    '<div class="pp-totals"><div class="pp-totals__grand"><span>Total</span><span>' +
    money(invoiceTotal(inv)) +
    "</span></div></div>" +
    foot +
    '<button type="button" class="pp-act pp-noprint" onclick="window.print()">' +
    (inv.status === "paid" ? "Print receipt" : "Print invoice") +
    "</button></article>";
}

/* ---------- Payment history ---------- */
function renderHistory() {
  const list = invoices.slice();
  list.sort(function (a, b) {
    if (a.paidOn < b.paidOn) return 1;
    if (a.paidOn > b.paidOn) return -1;
    return 0;
  });

  let html = "";
  for (let i = 0; i < list.length; i++) {
    const inv = list[i];
    if (inv.status !== "paid") continue;
    html +=
      "<tr><td>" +
      formatDate(inv.paidOn) +
      "</td><td>" +
      inv.id +
      "</td><td>" +
      escapeHtml(inv.method) +
      "</td><td>" +
      escapeHtml(inv.ref) +
      '</td><td class="invoice-amount">' +
      money(invoiceTotal(inv)) +
      "</td></tr>";
  }
  if (html === "") {
    html = '<tr><td colspan="5">No payments yet.</td></tr>';
  }
  el("hist-body").innerHTML = html;
}

function renderAll() {
  renderSummary();
  renderList();
  renderDetail();
  renderHistory();
}

function showInvoice(id) {
  selectedId = id;
  renderList();
  renderDetail();
}

/* ---------- UPDATE: pay an invoice (simulated) ---------- */
function payInvoice(id) {
  const inv = findInvoice(id);
  if (inv === null || inv.status === "paid") return; // already paid: do nothing

  // which radio button is ticked?
  const radios = document.getElementsByName("method");
  let methodId = 0;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) methodId = Number(radios[i].value);
  }
  const method = findMethod(methodId);

  const msg = el("pay-msg");
  if (method === null) {
    msg.textContent = "Please choose a payment method.";
    msg.className = "pp-alert pp-alert--error";
    msg.hidden = false;
    return;
  }
  msg.hidden = true;

  const btn = el("pay-btn");
  btn.disabled = true; // blocks a double click
  btn.textContent = "Processing…";

  setTimeout(function () {
    const today = todayString();
    inv.status = "paid";
    inv.paidOn = today;
    inv.ref = "TXN-" + today.replace(/-/g, "") + "-" + inv.id.slice(-4);
    inv.method = method.label;
    inv.due = "";
    console.log(invoices); // check the array while testing
    renderAll();
    el("invoice-detail").scrollIntoView({ behavior: "smooth", block: "start" });
  }, 900);
}

/* ---------- Events and start-up ---------- */
// tabs: All / Unpaid / Paid
const tabs = document.querySelectorAll(".pp-tab");
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function () {
    filterChoice = this.getAttribute("data-filter");
    for (let j = 0; j < tabs.length; j++) {
      tabs[j].classList.remove("is-active");
    }
    this.classList.add("is-active");
    renderList();
  });
}

el("inv-search").addEventListener("keyup", renderList);

// click on an invoice in the list
el("inv-list").addEventListener("click", function (e) {
  const item = e.target.closest(".pp-inv");
  if (item) showInvoice(item.getAttribute("data-id"));
});

// "Pay now" button in the banner
el("banner").addEventListener("click", function (e) {
  const pick = e.target.closest("[data-pick]");
  if (pick) {
    showInvoice(pick.getAttribute("data-pick"));
    el("invoice-detail").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

// pay form (created by renderDetail, so listen on its container)
el("inv-detail").addEventListener("submit", function (e) {
  e.preventDefault(); // like "return false" in Week 06
  if (e.target.id === "pay-form") payInvoice(e.target.getAttribute("data-id"));
});

/* ---------- Patient name + initials (sidebar and top bar) ---------- */
// "Fairuz Ahmed" -> "FA"
function getInitials(fullName) {
  const words = fullName.trim().split(" ");
  let letters = "";
  for (let i = 0; i < words.length && letters.length < 2; i++) {
    if (words[i] !== "") letters += words[i].charAt(0).toUpperCase();
  }
  return letters;
}

// fills every element that has data-patient="name" or data-patient="initials"
function loadPatientInfo() {
  const names = document.querySelectorAll('[data-patient="name"]');
  for (let i = 0; i < names.length; i++) {
    names[i].textContent = currentPatient.name;
  }
  const initials = document.querySelectorAll('[data-patient="initials"]');
  for (let i = 0; i < initials.length; i++) {
    initials[i].textContent = getInitials(currentPatient.name);
  }
}

loadPatientInfo();
chooseFirstInvoice();
renderAll();
