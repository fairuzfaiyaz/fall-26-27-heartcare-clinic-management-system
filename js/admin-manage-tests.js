// admin-manage-tests.js
// CRUD for manage-tests.html
// Needs (loaded before this file):
//   admin-manage-tests-data.js -> tests array
//   common.js                  -> showToday, containsText, showError, clearErrors

// -1 = adding a new test, 0,1,2... = editing the test at that position
let editIndex = -1;

const testFields = [
  "test_name",
  "test_unit",
  "test_min",
  "test_max",
  "test_price",
];

// 500 -> "৳500"
function formatPrice(amount) {
  return "৳" + amount.toLocaleString("en-US");
}

// true if the text is a real number (not empty, not letters)
function isNumber(text) {
  return text !== "" && !isNaN(Number(text));
}

// READ + SEARCH + FILTER
function renderTests() {
  let search = document.getElementById("search-box").value;
  let statusFilter = document.getElementById("status-filter").value;
  let rows = "";
  let count = 0;

  for (let i = 0; i < tests.length; i++) {
    let t = tests[i];

    let matchesSearch =
      containsText(t.name, search) || containsText(t.unit, search);
    let matchesStatus = statusFilter === "All" || t.status === statusFilter;

    if (matchesSearch && matchesStatus) {
      let badge = t.status === "Active" ? "adm-badge--ok" : "adm-badge--off";
      let toggleText = t.status === "Active" ? "Deactivate" : "Activate";

      rows +=
        "<tr>" +
        "<td><strong>" +
        t.name +
        "</strong></td>" +
        "<td>" +
        t.unit +
        "</td>" +
        "<td>" +
        t.min +
        "</td>" +
        "<td>" +
        t.max +
        "</td>" +
        "<td>" +
        formatPrice(t.price) +
        "</td>" +
        '<td><span class="adm-badge ' +
        badge +
        '">' +
        t.status +
        "</span></td>" +
        '<td><div class="adm-actions">' +
        '<button type="button" class="adm-act" onclick="editTest(' +
        i +
        ')">Edit</button>' +
        '<button type="button" class="adm-act adm-act--danger" onclick="toggleStatus(' +
        i +
        ')">' +
        toggleText +
        "</button>" +
        "</div></td>" +
        "</tr>";
      count++;
    }
  }

  if (count === 0) {
    rows = '<tr><td colspan="7">No tests found.</td></tr>';
  }

  document.getElementById("test-rows").innerHTML = rows;
  document.getElementById("row-count").innerHTML =
    "Showing " + count + " of " + tests.length;
  console.log(tests); // for checking the array while testing
}

// true if ANOTHER test already has this name (the one being edited is skipped)
function nameExists(name) {
  for (let i = 0; i < tests.length; i++) {
    if (i !== editIndex && tests[i].name.toLowerCase() === name.toLowerCase()) {
      return true;
    }
  }
  return false;
}

// CREATE + UPDATE (onsubmit="return saveTest()")
function saveTest() {
  clearErrors(testFields);

  let name = document.getElementById("test_name").value.trim();
  let unit = document.getElementById("test_unit").value.trim();
  let minText = document.getElementById("test_min").value;
  let maxText = document.getElementById("test_max").value;
  let priceText = document.getElementById("test_price").value;
  let status = document.getElementById("test_status").value;
  let ok = true;

  // Test name: at least 2 characters and unique
  if (name.length < 2) {
    showError("test_name", "Test name must be at least 2 characters.");
    ok = false;
  } else if (nameExists(name)) {
    showError("test_name", "This test already exists.");
    ok = false;
  }

  // Unit: required (e.g. mg/dL)
  if (unit === "") {
    showError("test_unit", "Unit is required (e.g. mg/dL).");
    ok = false;
  }

  // Normal min: a number, not negative
  let min = Number(minText);
  let minOk = true;
  if (!isNumber(minText)) {
    showError("test_min", "Enter a number.");
    ok = false;
    minOk = false;
  } else if (min < 0) {
    showError("test_min", "Cannot be negative.");
    ok = false;
    minOk = false;
  }

  // Normal max: a number
  let max = Number(maxText);
  let maxOk = true;
  if (!isNumber(maxText)) {
    showError("test_max", "Enter a number.");
    ok = false;
    maxOk = false;
  }

  // Compare the two fields: min must be smaller than max
  if (minOk && maxOk && min >= max) {
    showError("test_max", "Max must be greater than min.");
    ok = false;
  }

  // Price: a number from 1 to 20000
  let price = Number(priceText);
  if (!isNumber(priceText)) {
    showError("test_price", "Enter the price as a number.");
    ok = false;
  } else if (price < 1 || price > 20000) {
    showError("test_price", "Price must be between 1 and 20000.");
    ok = false;
  }

  if (ok === false) {
    return false; // stop, the red messages are on the screen
  }

  if (editIndex === -1) {
    // CREATE
    tests.push({
      name: name,
      unit: unit,
      min: min,
      max: max,
      price: price,
      status: status,
    });
  } else {
    // UPDATE: change the properties of the existing object
    tests[editIndex].name = name;
    tests[editIndex].unit = unit;
    tests[editIndex].min = min;
    tests[editIndex].max = max;
    tests[editIndex].price = price;
    tests[editIndex].status = status;
  }

  clearForm();
  renderTests();
  return false; // no backend yet, stay on the page
}

// Edit button: copy the object into the form
function editTest(index) {
  let t = tests[index];
  editIndex = index;

  clearErrors(testFields);
  document.getElementById("test_name").value = t.name;
  document.getElementById("test_unit").value = t.unit;
  document.getElementById("test_min").value = t.min;
  document.getElementById("test_max").value = t.max;
  document.getElementById("test_price").value = t.price;
  document.getElementById("test_status").value = t.status;

  document.getElementById("form-title").innerHTML = "Edit Test";
  document.getElementById("save-btn").innerHTML = "Update Test";
}

// "Delete" = Deactivate / Activate
function toggleStatus(index) {
  if (tests[index].status === "Active") {
    tests[index].status = "Inactive";
  } else {
    tests[index].status = "Active";
  }
  renderTests();
}

// Clear button / after saving: back to "add" mode
function clearForm() {
  editIndex = -1;
  clearErrors(testFields);
  document.getElementById("test_name").value = "";
  document.getElementById("test_unit").value = "";
  document.getElementById("test_min").value = "";
  document.getElementById("test_max").value = "";
  document.getElementById("test_price").value = "";
  document.getElementById("test_status").value = "Active";

  document.getElementById("form-title").innerHTML = "Add Test";
  document.getElementById("save-btn").innerHTML = "Save Test";
}

// Run when the page loads
renderTests();
showToday();
