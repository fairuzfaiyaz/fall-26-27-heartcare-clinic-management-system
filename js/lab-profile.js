// This function loads profile information into the form
function loadProfile() {

    document.getElementById("fullname").value = profileData.fullname;

    document.getElementById("employeeid").value = profileData.employeeid;

    document.getElementById("email").value = profileData.email;

    document.getElementById("phone").value = profileData.phone;

    document.getElementById("gender").value = profileData.gender;

    document.getElementById("dob").value = profileData.dob;

    document.getElementById("address").value = profileData.address;

    document.getElementById("designation").value = profileData.designation;

    document.getElementById("department").value = profileData.department;

    updateProfileHeader();

    console.log("Profile information loaded.");
}


// This function updates the profile name displayed on the page
function updateProfileHeader() {

    document.getElementById("sidebar-name").innerHTML =
        profileData.fullname;

    document.getElementById("welcome-name").innerHTML =
        "Hello, " + profileData.fullname + "..";

    document.getElementById("profile-display-name").innerHTML =
        profileData.fullname;
}


// This function clears all validation error messages
function clearErrors() {

    document.getElementById("fullname-error").innerHTML = "";

    document.getElementById("email-error").innerHTML = "";

    document.getElementById("phone-error").innerHTML = "";

    document.getElementById("gender-error").innerHTML = "";

    document.getElementById("dob-error").innerHTML = "";

    document.getElementById("form-message").innerHTML = "";
}


// This function validates the profile form
function validateProfile() {

    clearErrors();

    var fullname = document.getElementById("fullname").value.trim();

    var email = document.getElementById("email").value.trim();

    var phone = document.getElementById("phone").value.trim();

    var gender = document.getElementById("gender").value;

    var dob = document.getElementById("dob").value;

    var valid = true;

    // Validate full name
    if (fullname === "") {

        document.getElementById("fullname-error").innerHTML =
            "Full name is required.";

        valid = false;
    }

    // Validate email
    if (email === "") {

        document.getElementById("email-error").innerHTML =
            "Email address is required.";

        valid = false;

    } else {

        var atPosition = email.indexOf("@");
        var dotPosition = email.lastIndexOf(".");

        if (atPosition < 1 || dotPosition < atPosition + 2 ||
            dotPosition === email.length - 1) {

            document.getElementById("email-error").innerHTML =
                "Please enter a valid email address.";

            valid = false;
        }
    }

    // Validate phone number
    if (phone === "") {

        document.getElementById("phone-error").innerHTML =
            "Phone number is required.";

        valid = false;

    } else {

        var digitCount = 0;
        var onlyDigits = true;

        for (var i = 0; i < phone.length; i++) {

            if (phone[i] >= "0" && phone[i] <= "9") {

                digitCount++;

            } else {

                onlyDigits = false;
            }
        }

        if (!onlyDigits || digitCount !== 11 || phone.indexOf("01") !== 0) {

            document.getElementById("phone-error").innerHTML =
                "Enter a valid 11-digit phone number.";

            valid = false;
        }
    }

    // Validate gender
    if (gender === "") {

        document.getElementById("gender-error").innerHTML =
            "Please select your gender.";

        valid = false;
    }

    // Validate date of birth
    if (dob !== "") {

        var selectedDate = new Date(dob);
        var today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {

            document.getElementById("dob-error").innerHTML =
                "Date of birth cannot be in the future.";

            valid = false;
        }
    }

    return valid;
}


// This function saves the updated profile information
function saveProfile() {

    if (validateProfile() === false) {

        document.getElementById("form-message").innerHTML =
            "Please correct the errors before saving.";

        document.getElementById("form-message").style.color = "red";

        return false;
    }

    // Update profile data
    profileData.fullname =
        document.getElementById("fullname").value.trim();

    profileData.email =
        document.getElementById("email").value.trim();

    profileData.phone =
        document.getElementById("phone").value.trim();

    profileData.gender =
        document.getElementById("gender").value;

    profileData.dob =
        document.getElementById("dob").value;

    profileData.address =
        document.getElementById("address").value.trim();

    // Update profile information on the page
    updateProfileHeader();

    document.getElementById("form-message").innerHTML =
        "Profile information updated successfully!";

    document.getElementById("form-message").style.color = "green";

    console.log("Updated Profile:", profileData);

    return false;
}


// This function cancels changes and restores the saved profile data
function cancelProfile() {

    loadProfile();

    clearErrors();

    document.getElementById("form-message").innerHTML =
        "Changes have been cancelled.";

    document.getElementById("form-message").style.color = "blue";

    console.log("Profile changes cancelled.");
}


// This function initializes the profile page
function initializeProfile() {

    loadProfile();

    console.log("Profile page initialized.");
}


// Load profile when the page opens
window.onload = initializeProfile;