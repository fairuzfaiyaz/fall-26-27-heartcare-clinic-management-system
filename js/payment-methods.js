// payment-methods.js

// Returns the patient's initials.
function getPaymentPatientInitials() {
  let initials = "";
  let foundFirst = false;

  for (let i = 0; i < patient.fullName.length; i++) {
    if (patient.fullName[i] != " ") {
      if (foundFirst == false) {
        initials = patient.fullName[i];
        foundFirst = true;
      }
    } else if (foundFirst == true && i + 1 < patient.fullName.length) {
      initials = initials + patient.fullName[i + 1];
      break;
    }
  }

  return initials;
}

// Displays patient information in the sidebar and topbar.
function renderPaymentPatient() {
  let initials = getPaymentPatientInitials();

  document.getElementById("sidebar-name").innerHTML = patient.fullName;

  document.getElementById("sidebar-avatar").innerHTML = initials;

  document.getElementById("topbar-avatar").innerHTML = initials;
}

// Checks whether a payment method is primary.
function isPrimaryPayment(index) {
  if (paymentMethods[index].isPrimary == true) {
    return true;
  }

  return false;
}

// Renders all saved payment methods.
function renderPaymentMethods() {
  console.log(paymentMethods);

  let output = "";

  if (paymentMethods.length == 0) {
    document.getElementById("payment-list").innerHTML = "";

    document.getElementById("empty-message").innerHTML =
      "You have no saved payment methods. Add one to get started.";

    document.getElementById("empty-message").style.color = "gray";

    return;
  }

  document.getElementById("empty-message").innerHTML = "";

  for (let i = 0; i < paymentMethods.length; i++) {
    output += '<div class="pp-card">';

    // Card heading.
    output += '<div class="pp-card__top">';

    output += "<strong>" + paymentMethods[i].brand + "</strong>";

    if (isPrimaryPayment(i)) {
      output += '<span class="pp-chip">Primary</span>';
    } else {
      output += '<button type="button" class="pp-act" ';
      output += 'onclick="setPrimaryPayment(' + i + ')">';
      output += "Set as primary</button>";
    }

    output += "</div>";

    // Card nickname.
    output += "<p><strong>" + paymentMethods[i].nickname + "</strong></p>";

    // Masked card number.
    output += '<p class="pp-card__num">';
    output += "•••• •••• •••• " + paymentMethods[i].last4;
    output += "</p>";

    // Card footer.
    output += '<div class="pp-card__foot">';

    output += "<span>Demo reference</span>";

    output += '<button type="button" ';
    output += 'class="pp-act pp-act--danger" ';
    output += 'onclick="removePaymentMethod(' + i + ')">';
    output += "Remove</button>";

    output += "</div>";

    output += "</div>";
  }

  document.getElementById("payment-list").innerHTML = output;
}

// Displays a message to the user.
function showPaymentMessage(message, color) {
  document.getElementById("payment-message").innerHTML = message;

  document.getElementById("payment-message").style.color = color;
}

// Displays a validation error below a field.
function showPaymentError(fieldId, message) {
  document.getElementById(fieldId + "-error").innerHTML = message;

  document.getElementById(fieldId + "-error").style.color = "red";
}

// Clears all validation errors.
function clearPaymentErrors() {
  document.getElementById("c_nick-error").innerHTML = "";

  document.getElementById("c_last4-error").innerHTML = "";
}

// Validates the last four digits of a payment reference.
function validateLastFour(last4) {
  if (last4.length != 4) {
    return false;
  }

  for (let i = 0; i < last4.length; i++) {
    if (last4[i] < "0" || last4[i] > "9") {
      return false;
    }
  }

  return true;
}

// Validates the payment form and creates a new payment method.
function validatePaymentForm() {
  clearPaymentErrors();

  document.getElementById("payment-message").innerHTML = "";

  let nickname = document.getElementById("c_nick").value;

  let brand = document.getElementById("c_brand").value;

  let last4 = document.getElementById("c_last4").value;

  let valid = true;

  // Validate nickname.
  if (nickname.length < 3) {
    showPaymentError("c_nick", "Nickname must contain at least 3 characters.");

    valid = false;
  }

  // Validate last four digits.
  if (validateLastFour(last4) == false) {
    showPaymentError("c_last4", "Enter exactly 4 numeric digits.");

    valid = false;
  }

  // Stop if validation fails.
  if (valid == false) {
    return false;
  }

  // Check whether this is the first saved payment method.
  let primaryStatus = false;

  if (paymentMethods.length == 0) {
    primaryStatus = true;
  }

  // Create a new payment method object.
  let newPayment = {
    id: nextPaymentId,

    nickname: nickname,

    brand: brand,

    last4: last4,

    isPrimary: primaryStatus,
  };

  // Add the new payment method to the array.
  paymentMethods.push(newPayment);

  nextPaymentId++;

  // Refresh the payment methods list.
  renderPaymentMethods();

  // Reset the form.
  resetPaymentForm();

  // Display success message.
  showPaymentMessage("Payment method saved successfully!", "green");

  alert("Payment method added successfully!");

  return false;
}

// Makes a selected payment method the primary method.
function setPrimaryPayment(index) {
  if (index < 0 || index >= paymentMethods.length) {
    return;
  }

  // Remove primary status from all payment methods.
  for (let i = 0; i < paymentMethods.length; i++) {
    paymentMethods[i].isPrimary = false;
  }

  // Assign primary status to the selected method.
  paymentMethods[index].isPrimary = true;

  // Refresh the payment methods list.
  renderPaymentMethods();

  showPaymentMessage("Primary payment method updated successfully!", "green");
}

// Removes a payment method from the array.
function removePaymentMethod(index) {
  if (index < 0 || index >= paymentMethods.length) {
    return;
  }

  let confirmation = confirm(
    "Are you sure you want to remove this payment method?",
  );

  if (confirmation == false) {
    return;
  }

  // Check whether the selected method is primary.
  let wasPrimary = paymentMethods[index].isPrimary;

  // Remove the selected object using slice and concat.
  paymentMethods = paymentMethods
    .slice(0, index)
    .concat(paymentMethods.slice(index + 1));

  // If the primary method was removed, assign a new primary.
  if (wasPrimary == true && paymentMethods.length > 0) {
    paymentMethods[0].isPrimary = true;
  }

  // Refresh the payment methods list.
  renderPaymentMethods();

  showPaymentMessage("Payment method removed successfully!", "green");
}

// Resets the add payment form.
function resetPaymentForm() {
  document.getElementById("c_nick").value = "";

  document.getElementById("c_brand").value = "Visa";

  document.getElementById("c_last4").value = "";

  clearPaymentErrors();
}

// Initializes the payment methods page.
function initializePaymentMethods() {
  renderPaymentPatient();

  renderPaymentMethods();

  // Reset form button event.
  document
    .getElementById("reset-payment-form")
    .addEventListener("click", resetPaymentForm);
}

// Runs when the page loads.
initializePaymentMethods();
