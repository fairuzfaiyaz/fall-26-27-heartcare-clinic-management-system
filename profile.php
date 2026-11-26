<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>My Profile | HeartCare</title>

    <link rel="stylesheet" href="css/lab-profile.css">
</head>

<body>

    <div class="dashboard">

        <!-- SIDEBAR -->
        <aside class="sidebar">

            <div class="logo">
                <span>♥</span> HeartCare
            </div>

            <div class="profile">
                <div class="avatar">LT</div>

                <div>
                    <h3 id="sidebar-name">Aurpita Roy</h3>
                    <p>Laboratory Department</p>
                </div>
            </div>

            <p class="menu-title">MAIN MENU</p>

            <nav>
                <a class="sidebar-link" href="lab-dashboard.php">▦ Dashboard</a>
                <a class="sidebar-link" href="lab-queue.php">☷ Lab Queue</a>
                <a class="sidebar-link" href="add-labresult.php">✚ Add Test Result</a>
                <a class="sidebar-link" href="manage-labresult.php">▤ Manage Results</a>
                <a class="sidebar-link" href="test-catalogue.php">♧ Test Catalogue</a>
                <a class="sidebar-link" href="lab-reports.php">▣ Lab Reports</a>

                <p class="menu-title">ACCOUNT</p>

                <a class="sidebar-link is-active" href="profile.php">♙ My Profile</a>
                <a class="sidebar-link sidebar-link--logout" href="login.php">Log out</a>
            </nav>

            <div class="sidebar-footer">
                HeartCare Hospital
                <small>Laboratory Management System</small>
            </div>

        </aside>

        <!-- MAIN CONTENT -->
        <main class="main-content">

            <!-- TOPBAR -->
            <header class="topbar">

                <div>
                    <h2 id="welcome-name">Hello, Aurpita Roy..</h2>
                    <p>Manage your personal account information</p>
                </div>

                <div class="header-right">



                    <div class="user-info">
                        <div class="small-avatar">LT</div>
                        <span>Lab Technician</span>
                    </div>

                </div>

            </header>

            <!-- PROFILE CONTENT -->
            <section class="content">

                <div class="page-heading">

                    <div>
                        <h1>Profile Settings</h1>
                    </div>


                </div>

                <!-- PROFILE CARD -->
                <div class="profile-container">

                    <!-- PROFILE HEADER -->
                    <div class="profile-header">

                        <div class="profile-avatar">LT</div>

                        <div class="profile-header-info">

                            <h2 id="profile-display-name">Aurpita Roy</h2>

                            <p>Laboratory Department</p>

                            <span class="account-status">
                                <i></i>
                                Active Account
                            </span>

                        </div>

                    </div>

                    <!-- PROFILE FORM -->
                    <form class="profile-form" id="profile-form" novalidate onsubmit="return saveProfile()">

                        <!-- PERSONAL INFORMATION -->
                        <div class="section-heading">

                            <div>
                                <h3>Personal Information</h3>
                                <p>Update your personal details below</p>
                            </div>

                        </div>

                        <div class="form-grid">

                            <div class="form-group">

                                <label for="fullname">Full Name</label>

                                <input type="text" id="fullname" name="fullname" required>

                                <small class="error" id="fullname-error"></small>

                            </div>

                            <div class="form-group">

                                <label for="employeeid">Employee ID</label>

                                <input type="text" id="employeeid" name="employeeid" readonly>

                            </div>

                            <div class="form-group">

                                <label for="email">Email Address</label>

                                <input type="email" id="email" name="email" required>

                                <small class="error" id="email-error"></small>

                            </div>

                            <div class="form-group">

                                <label for="phone">Phone Number</label>

                                <input type="tel" id="phone" name="phone" placeholder="Enter phone number" required>

                                <small class="error" id="phone-error"></small>

                            </div>

                            <div class="form-group">

                                <label for="gender">Gender</label>

                                <select id="gender" name="gender" required>
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>

                                <small class="error" id="gender-error"></small>

                            </div>

                            <div class="form-group">

                                <label for="dob">Date of Birth</label>

                                <input type="date" id="dob" name="dob">

                                <small class="error" id="dob-error"></small>

                            </div>

                            <div class="form-group full-width">

                                <label for="address">Address</label>

                                <textarea id="address" name="address" rows="3"
                                    placeholder="Enter your address"></textarea>

                            </div>

                        </div>

                        <!-- PROFESSIONAL INFORMATION -->
                        <div class="section-heading professional-heading">

                            <div>
                                <h3>Professional Information</h3>
                                <p>Your hospital employment details</p>
                            </div>

                        </div>

                        <div class="form-grid">

                            <div class="form-group">

                                <label for="designation">Designation</label>

                                <input type="text" id="designation" name="designation" readonly>

                            </div>

                            <div class="form-group">

                                <label for="department">Department</label>

                                <input type="text" id="department" name="department" readonly>

                            </div>

                        </div>

                        <!-- FORM MESSAGE -->
                        <p id="form-message"></p>

                        <!-- SAVE BUTTONS -->
                        <div class="form-actions">

                            <button type="button" class="cancel-btn" onclick="cancelProfile()">
                                Cancel
                            </button>

                            <button type="submit" class="save-btn">
                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </section>

            <!-- FOOTER -->
            <footer>
                © 2026 HeartCare Hospital. All rights reserved.
            </footer>

        </main>

    </div>

    <!-- JAVASCRIPT FILES -->
    <script src="js/lab-profile-data.js"></script>
    <script src="js/common.js"></script>
    <script src="js/lab-profile.js"></script>

</body>

</html>