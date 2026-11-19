// admin-validators.js
// Small yes/no checks that several admin pages can share.

// true if every character of the text is 0-9
function onlyDigits(text) {
  for (let i = 0; i < text.length; i++) {
    if (text[i] < "0" || text[i] > "9") {
      return false;
    }
  }
  return true;
}

// true if the text contains at least one digit
function hasDigit(text) {
  for (let i = 0; i < text.length; i++) {
    if (text[i] >= "0" && text[i] <= "9") {
      return true;
    }
  }
  return false;
}

// true if the text looks like something@something.something
function looksLikeEmail(text) {
  let at = text.indexOf("@");
  let dot = text.lastIndexOf(".");
  return at > 0 && dot > at + 1 && dot < text.length - 1;
}
