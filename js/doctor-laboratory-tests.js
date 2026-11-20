/*
    File: doctor-laboratory-tests.js

    Purpose:
    Manage laboratory orders, validation,
    search, CRUD operations and status updates.
*/

// Function to generate laboratory order ID
function generateLabOrderId() {
  let id = "LAB-";

  if (laboratoryOrderCounter < 10) {
    id = id + "0000" + laboratoryOrderCounter;
  } else if (laboratoryOrderCounter < 100) {
    id = id + "000" + laboratoryOrderCounter;
  } else if (laboratoryOrderCounter < 1000) {
    id = id + "00" + laboratoryOrderCounter;
  } else {
    id = id + laboratoryOrderCounter;
  }

  return id;
}

// Function to get today's date
function getTodayDate() {
  const today = new Date();

  let year = today.getFullYear();

  let month = today.getMonth() + 1;

  let day = today.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;
}

// Function to initialize order date
function loadOrderDate() {
  document.getElementById("orderDate").value = getTodayDate();
}

// Function to clear validation messages
function clearLabErrors() {
  const errorIds = [
    "patientId",
    "patientName",
    "age",
    "gender",
    "appointmentId",
    "orderDate",
    "tests",
    "priority",
    "collectionDate",
  ];

  for (let i = 0; i < errorIds.length; i++) {
    document.getElementById(errorIds[i] + "-error").innerHTML = "";
  }

  document.getElementById("labMessage").innerHTML = "";
}

// Function to display a validation message
function showLabError(fieldId, message) {
  document.getElementById(fieldId + "-error").innerHTML = message;
}

// Function to get selected laboratory tests
function getSelectedTests() {
  let selectedTests = [];

  const checkboxes = document.getElementsByName("tests");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked === true) {
      selectedTests.push(checkboxes[i].value);
    }
  }

  return selectedTests;
}

// Function to calculate total test price
function calculateLabPrice() {
  let total = 0;

  const selectedTests = getSelectedTests();

  for (let i = 0; i < selectedTests.length; i++) {
    for (let j = 0; j < laboratoryTests.length; j++) {
      if (selectedTests[i] === laboratoryTests[j].name) {
        total = total + laboratoryTests[j].price;
      }
    }
  }

  document.getElementById("totalTestPrice").innerHTML = "৳" + total;

  return total;
}

// Function to check selected test count
function countSelectedTests() {
  const selectedTests = getSelectedTests();

  return selectedTests.length;
}

// Function to validate laboratory order form
function validateLabForm() {
  clearLabErrors();

  let isValid = true;

  // Get form values
  const patientId = document.getElementById("patientId").value.trim();

  const patientName = document.getElementById("patientName").value.trim();

  const age = document.getElementById("age").value;

  const gender = document.getElementById("gender").value;

  const appointmentId = document.getElementById("appointmentId").value.trim();

  const orderDate = document.getElementById("orderDate").value;

  const priority = document.getElementById("priority").value;

  const collectionDate = document.getElementById("collectionDate").value;

  // Validate patient ID
  if (patientId === "") {
    showLabError("patientId", "Patient ID is required.");

    isValid = false;
  }

  // Validate patient name
  if (patientName === "") {
    showLabError("patientName", "Patient name is required.");

    isValid = false;
  }

  // Validate age
  if (age === "" || age < 1 || age > 120) {
    showLabError("age", "Enter a valid age between 1 and 120.");

    isValid = false;
  }

  // Validate gender
  if (gender === "") {
    showLabError("gender", "Please select patient gender.");

    isValid = false;
  }

  // Validate appointment ID
  if (appointmentId === "") {
    showLabError("appointmentId", "Appointment ID is required.");

    isValid = false;
  }

  // Validate order date
  if (orderDate === "") {
    showLabError("orderDate", "Test order date is required.");

    isValid = false;
  }

  // Validate selected tests
  if (countSelectedTests() === 0) {
    showLabError("tests", "Please select at least one laboratory test.");

    isValid = false;
  }

  // Validate priority
  if (priority === "") {
    showLabError("priority", "Please select test priority.");

    isValid = false;
  }

  // Validate collection date
  if (collectionDate !== "" && orderDate !== "") {
    if (collectionDate < orderDate) {
      showLabError(
        "collectionDate",
        "Collection date cannot be before order date.",
      );

      isValid = false;
    }
  }

  return isValid;
}

// Function to create a laboratory order object
function createLabOrderObject() {
  const order = {
    orderId: document.getElementById("orderId").value,

    patientId: document.getElementById("patientId").value.trim(),

    patientName: document.getElementById("patientName").value.trim(),

    age: document.getElementById("age").value,

    gender: document.getElementById("gender").value,

    appointmentId: document.getElementById("appointmentId").value.trim(),

    orderDate: document.getElementById("orderDate").value,

    tests: getSelectedTests(),

    priority: document.getElementById("priority").value,

    collectionDate: document.getElementById("collectionDate").value,

    instructions: document.getElementById("instructions").value.trim(),

    totalPrice: calculateLabPrice(),

    status: "Pending",
  };

  return order;
}

// Function to save a new or updated laboratory order
function saveLabOrder() {
  if (validateLabForm() === false) {
    document.getElementById("labMessage").innerHTML =
      "Please correct the errors before submitting.";

    document.getElementById("labMessage").style.color = "red";

    return false;
  }

  const order = createLabOrderObject();

  // Update existing order
  if (laboratoryEditIndex !== -1) {
    order.status = laboratoryOrders[laboratoryEditIndex].status;

    laboratoryOrders[laboratoryEditIndex] = order;

    alert("Laboratory order updated successfully!");

    laboratoryEditIndex = -1;
  }

  // Create new order
  else {
    laboratoryOrders.push(order);

    laboratoryOrderCounter++;

    alert("Laboratory test order submitted successfully!");
  }

  console.log("Laboratory Orders:", laboratoryOrders);

  renderLabOrders();

  resetLabForm();

  return false;
}

// Function to render laboratory order records
function renderLabOrders() {
  console.log("Laboratory Order Array:", laboratoryOrders);

  const tableBody = document.getElementById("labOrderList");

  const searchText = document.getElementById("labSearch").value.toLowerCase();

  let output = "";

  let count = 0;

  for (let i = 0; i < laboratoryOrders.length; i++) {
    const order = laboratoryOrders[i];

    const nameMatch =
      order.patientName.toLowerCase().indexOf(searchText) !== -1;

    const idMatch = order.patientId.toLowerCase().indexOf(searchText) !== -1;

    const orderMatch = order.orderId.toLowerCase().indexOf(searchText) !== -1;

    if (nameMatch || idMatch || orderMatch) {
      let testNames = "";

      for (let j = 0; j < order.tests.length; j++) {
        if (j > 0) {
          testNames = testNames + ", ";
        }

        testNames = testNames + order.tests[j];
      }

      let statusClass = "status-pending";

      if (order.status === "Completed") {
        statusClass = "status-completed";
      } else if (order.status === "Processing") {
        statusClass = "status-processing";
      }

      let priorityClass = "priority-normal";

      if (order.priority === "Urgent") {
        priorityClass = "priority-urgent";
      } else if (order.priority === "Emergency") {
        priorityClass = "priority-emergency";
      }

      output +=
        "<tr>" +
        "<td>" +
        order.orderId +
        "</td>" +
        "<td>" +
        order.patientName +
        "</td>" +
        "<td>" +
        testNames +
        "</td>" +
        "<td>" +
        order.orderDate +
        "</td>" +
        '<td><span class="' +
        priorityClass +
        '">' +
        order.priority +
        "</span></td>" +
        "<td>" +
        '<span class="' +
        statusClass +
        '">' +
        order.status +
        "</span>" +
        '<select onchange="updateLabStatus(' +
        i +
        ', this.value)">' +
        '<option value="">Change Status</option>' +
        '<option value="Pending">Pending</option>' +
        '<option value="Processing">Processing</option>' +
        '<option value="Completed">Completed</option>' +
        "</select>" +
        "</td>" +
        "<td>" +
        '<button type="button" class="report-btn" ' +
        'onclick="viewLabOrder(' +
        i +
        ')">' +
        "View</button>" +
        '<button type="button" class="report-btn" ' +
        'onclick="editLabOrder(' +
        i +
        ')">' +
        "Edit</button>" +
        '<button type="button" class="report-btn" ' +
        'onclick="deleteLabOrder(' +
        i +
        ')">' +
        "Delete</button>" +
        "</td>" +
        "</tr>";

      count++;
    }
  }

  if (count === 0) {
    output = '<tr><td colspan="7">No laboratory orders found.</td></tr>';
  }

  tableBody.innerHTML = output;

  updateLabSummary();
}

// Function to search laboratory orders
function searchLabOrders() {
  renderLabOrders();
}

// Function to update laboratory summary cards
function updateLabSummary() {
  let total = laboratoryOrders.length;

  let pending = 0;

  let completed = 0;

  for (let i = 0; i < laboratoryOrders.length; i++) {
    if (laboratoryOrders[i].status === "Pending") {
      pending++;
    } else if (laboratoryOrders[i].status === "Completed") {
      completed++;
    }
  }

  document.getElementById("totalOrders").innerHTML = total;

  document.getElementById("pendingOrders").innerHTML = pending;

  document.getElementById("completedOrders").innerHTML = completed;

  document.getElementById("orderCount").innerHTML = total + " Orders";
}

// Function to update the status of a laboratory order
function updateLabStatus(index, newStatus) {
  if (
    newStatus === "Pending" ||
    newStatus === "Processing" ||
    newStatus === "Completed"
  ) {
    laboratoryOrders[index].status = newStatus;

    renderLabOrders();

    console.log("Updated Order Status:", laboratoryOrders[index]);
  }
}

// Function to view laboratory order details
function viewLabOrder(index) {
  const order = laboratoryOrders[index];

  let testNames = "";

  for (let i = 0; i < order.tests.length; i++) {
    testNames += order.tests[i] + "\n";
  }

  alert(
    "LABORATORY ORDER DETAILS\n\n" +
      "Order ID: " +
      order.orderId +
      "\n" +
      "Patient Name: " +
      order.patientName +
      "\n" +
      "Patient ID: " +
      order.patientId +
      "\n" +
      "Age: " +
      order.age +
      "\n" +
      "Gender: " +
      order.gender +
      "\n" +
      "Appointment ID: " +
      order.appointmentId +
      "\n" +
      "Tests:\n" +
      testNames +
      "\n" +
      "Total Price: ৳" +
      order.totalPrice +
      "\n" +
      "Priority: " +
      order.priority +
      "\n" +
      "Status: " +
      order.status +
      "\n" +
      "Instructions: " +
      order.instructions,
  );
}

// Function to edit an existing laboratory order
function editLabOrder(index) {
  const order = laboratoryOrders[index];

  laboratoryEditIndex = index;

  document.getElementById("orderId").value = order.orderId;

  document.getElementById("patientId").value = order.patientId;

  document.getElementById("patientName").value = order.patientName;

  document.getElementById("age").value = order.age;

  document.getElementById("gender").value = order.gender;

  document.getElementById("appointmentId").value = order.appointmentId;

  document.getElementById("orderDate").value = order.orderDate;

  document.getElementById("priority").value = order.priority;

  document.getElementById("collectionDate").value = order.collectionDate;

  document.getElementById("instructions").value = order.instructions;

  // Clear all selected test checkboxes
  const checkboxes = document.getElementsByName("tests");

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }

  // Select previously saved tests
  for (let i = 0; i < order.tests.length; i++) {
    for (let j = 0; j < checkboxes.length; j++) {
      if (checkboxes[j].value === order.tests[i]) {
        checkboxes[j].checked = true;
      }
    }
  }

  clearLabErrors();

  calculateLabPrice();

  document.getElementById("orderForm").scrollIntoView();

  document.getElementById("labSubmitButton").innerHTML = "Update Test Order";

  console.log("Editing Laboratory Order:", order);
}

// Function to remove an item from an array
function removeLabOrderAt(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}

// Function to delete a laboratory order
function deleteLabOrder(index) {
  laboratoryOrders = removeLabOrderAt(laboratoryOrders, index);

  if (laboratoryEditIndex === index) {
    laboratoryEditIndex = -1;

    resetLabForm();
  } else if (laboratoryEditIndex > index) {
    laboratoryEditIndex--;
  }

  renderLabOrders();

  console.log("Updated Laboratory Orders:", laboratoryOrders);

  alert("Laboratory order deleted successfully!");
}

// Function to reset the laboratory order form
function resetLabForm() {
  document.getElementById("orderForm").reset();

  clearLabErrors();

  laboratoryEditIndex = -1;

  document.getElementById("orderId").value = generateLabOrderId();

  loadOrderDate();

  calculateLabPrice();

  document.getElementById("labSubmitButton").innerHTML = "+ Submit Test Order";
}

// Function to initialize laboratory page
function initializeLabPage() {
  document.getElementById("orderForm").onsubmit = saveLabOrder;

  document.getElementById("labSearch").onkeyup = searchLabOrders;

  document.getElementById("labResetButton").onclick = resetLabForm;

  // Add change event to every test checkbox
  const checkboxes = document.getElementsByName("tests");

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].onchange = calculateLabPrice;
  }

  document.getElementById("orderId").value = generateLabOrderId();

  loadOrderDate();

  calculateLabPrice();

  renderLabOrders();
}

// Initialize laboratory page
initializeLabPage();
