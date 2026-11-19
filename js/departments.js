// departments.js
// CRUD for manage-departments.html
// Needs: data.js (departments array) and common.js (helpers)

// -1 means "adding a new department".
// 0, 1, 2 ... means "editing the department at that position".
let editIndex = -1;

const deptFields = ["dept_name", "dept_desc"];

// READ + SEARCH + FILTER
// Loops over the array and builds the table rows.
// Runs on page load, on every key typed in the search box (onkeyup)
// and when the status filter changes (onchange).
function renderDepartments() {
  let search = document.getElementById("search-box").value;
  let filter = document.getElementById("status-filter").value;
  let rows = "";
  let count = 0;

  for (let i = 0; i < departments.length; i++) {
    let d = departments[i];

    let matchesSearch =
      containsText(d.name, search) || containsText(d.description, search);
    let matchesStatus = filter === "All" || d.status === filter;

    if (matchesSearch && matchesStatus) {
      // ternary: pick the badge colour and the button text
      let badge = d.status === "Active" ? "adm-badge--ok" : "adm-badge--off";
      let toggleText = d.status === "Active" ? "Deactivate" : "Activate";

      // i is the position in the FULL array, so Edit/Toggle hit the right object
      rows +=
        "<tr>" +
        "<td><strong>" +
        d.name +
        "</strong></td>" +
        "<td>" +
        d.description +
        "</td>" +
        "<td>" +
        d.doctors +
        "</td>" +
        '<td><span class="adm-badge ' +
        badge +
        '">' +
        d.status +
        "</span></td>" +
        '<td><div class="adm-actions">' +
        '<button type="button" class="adm-act" onclick="editDepartment(' +
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
    rows = '<tr><td colspan="5">No departments found.</td></tr>';
  }

  document.getElementById("department-rows").innerHTML = rows;
  document.getElementById("row-count").innerHTML =
    "Showing " + count + " of " + departments.length;
  console.log(departments); // for checking the array while testing
}

// true if another department already uses this name
// (the one being edited is skipped)
function nameExists(name) {
  for (let i = 0; i < departments.length; i++) {
    if (
      i !== editIndex &&
      departments[i].name.toLowerCase() === name.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
}

// CREATE + UPDATE (onsubmit="return saveDepartment()")
function saveDepartment() {
  clearErrors(deptFields);

  let name = document.getElementById("dept_name").value.trim();
  let description = document.getElementById("dept_desc").value.trim();
  let status = document.getElementById("dept_status").value;
  let ok = true;

  // validation
  if (name.length < 2) {
    showError("dept_name", "Department name must be at least 2 characters.");
    ok = false;
  } else if (nameExists(name)) {
    showError("dept_name", "This department already exists.");
    ok = false;
  }

  if (description.length < 5) {
    showError("dept_desc", "Description must be at least 5 characters.");
    ok = false;
  }

  if (ok === false) {
    return false; // stop, errors are on the screen
  }

  if (editIndex === -1) {
    // CREATE: build an object and push it
    departments.push({
      name: name,
      description: description,
      doctors: 0,
      status: status,
    });
  } else {
    // UPDATE: change the properties of the existing object
    departments[editIndex].name = name;
    departments[editIndex].description = description;
    departments[editIndex].status = status;
  }

  clearForm();
  renderDepartments();
  return false; // no backend yet, so we stay on the page
}

// Edit button: copy the object into the form
function editDepartment(index) {
  let d = departments[index];
  editIndex = index;

  clearErrors(deptFields);
  document.getElementById("dept_name").value = d.name;
  document.getElementById("dept_desc").value = d.description;
  document.getElementById("dept_status").value = d.status;

  document.getElementById("form-title").innerHTML = "Edit Department";
  document.getElementById("save-btn").innerHTML = "Update Department";
}

// "Delete" = Deactivate / Activate (history stays in the system)
function toggleStatus(index) {
  if (departments[index].status === "Active") {
    departments[index].status = "Inactive";
  } else {
    departments[index].status = "Active";
  }
  renderDepartments();
}

// Clear button / after saving: back to "add" mode
function clearForm() {
  editIndex = -1;
  clearErrors(deptFields);
  document.getElementById("dept_name").value = "";
  document.getElementById("dept_desc").value = "";
  document.getElementById("dept_status").value = "Active";
  document.getElementById("form-title").innerHTML = "Add Department";
  document.getElementById("save-btn").innerHTML = "Save Department";
}

// Run when the page loads
renderDepartments();
showToday();
