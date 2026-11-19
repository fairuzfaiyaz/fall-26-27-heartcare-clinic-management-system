// common.js
// Small helpers shared by the admin manage-pages.

// Today's date in the top bar
function showToday() {
  let today = new Date();
  document.getElementById("today-date").innerHTML = today.toDateString();
}

// true if "text" contains "search" (ignores upper/lower case)
// An empty search matches everything, because indexOf("") is 0.
function containsText(text, search) {
  return text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
}

// Show a red message next to one field.
// The message goes in <span id="FIELDID-error"></span>
function showError(fieldId, message) {
  let span = document.getElementById(fieldId + "-error");
  span.innerHTML = message;
  span.style.color = "red";
  span.style.fontSize = "0.8rem";
  span.style.display = "block";
  document.getElementById(fieldId).style.borderColor = "red";
}

// Remove the red messages and borders of all fields in the array
function clearErrors(fieldIds) {
  for (let i = 0; i < fieldIds.length; i++) {
    document.getElementById(fieldIds[i] + "-error").innerHTML = "";
    document.getElementById(fieldIds[i]).style.borderColor = "";
  }
}
