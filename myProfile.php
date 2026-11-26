<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Doctor Profile | HeartCare</title>

    <link rel="stylesheet" href="css/doctorProfile.css" />
  </head>

  <body>
    <div class="dashboard-layout">
      <!-- SIDEBAR -->

      <aside class="dashboard-sidebar">
        <a class="dashboard-brand" href="doctor-dashboard.php">
          <span class="brand-icon">♥</span>

          <span>HeartCare</span>
        </a>

        <div class="sidebar-profile">
          <div class="avatar">BP</div>

          <div>
            <strong>Dr. Badhon Pal</strong>

            <span>Cardiology Department</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <p class="sidebar-label">WORKSPACE</p>

          <a class="sidebar-link" href="doctor-dashboard.php">
            <span class="nav-icon">▦</span>

            Dashboard
          </a>

          <a class="sidebar-link is-active" href="myProfile.php">
            <span class="nav-icon">♙</span>

            My Profile
          </a>

          <a class="sidebar-link" href="my_schedule.php">
            <span class="nav-icon">▣</span>

            My Schedule
          </a>

          <a class="sidebar-link" href="my_appointments.php">
            <span class="nav-icon">☷</span>

            My Appointments
          </a>

          <a class="sidebar-link" href="consultation.php">
            <span class="nav-icon">✚</span>

            Consultation
          </a>

          <a class="sidebar-link" href="prescription.php">
            <span class="nav-icon">▤</span>

            Prescriptions
          </a>

          <a class="sidebar-link" href="order_tests.php">
            <span class="nav-icon">⚕</span>

            Laboratory Tests
          </a>

          <a class="sidebar-link" href="patient_timeline.php">
            <span class="nav-icon">◷</span>

            Patient Timeline
          </a>
        </nav>

        <a class="sidebar-link sidebar-link--logout" href="login.php">
          Log out
        </a>
      </aside>

      <!-- MAIN CONTENT -->

      <main class="dashboard-main">
        <div class="profile-content">
          <!-- PAGE HEADING -->

          <section class="page-heading">
            <div>
              <p class="section-eyebrow">ACCOUNT MANAGEMENT</p>

              <h1>My Profile</h1>

              <p>Manage your personal and professional information.</p>
            </div>

            <a href="doctor-dashboard.php" class="back-button">
              ← Back to Dashboard
            </a>
          </section>

          <!-- PROFILE HEADER CARD -->

          <section class="profile-header-card">
            <div class="profile-avatar" id="profileAvatar">AR</div>

            <div class="profile-header-info">
              <span class="verified-badge"> ● Verified Doctor </span>

              <h2 id="profileName">Dr. Ahmed Rahman</h2>

              <p>
                <span id="profileSpecialization"> Cardiology </span>

                | HeartCare Clinic
              </p>

              <div class="profile-meta">
                <span>
                  ✉

                  <span id="profileEmail"> ahmed.rahman@email.com </span>
                </span>

                <span>
                  ☎

                  <span id="profilePhone"> +880 1712-345678 </span>
                </span>
              </div>
            </div>

            <a href="#edit-profile" class="edit-button"> ✎ Edit Profile </a>
          </section>

          <!-- PROFILE FORM -->

          <form id="profileForm" novalidate>
            <!-- PERSONAL INFORMATION -->

            <section class="profile-card" id="edit-profile">
              <div class="card-heading">
                <div>
                  <h2>Personal Information</h2>

                  <p>Your basic personal details</p>
                </div>

                <span class="card-icon">♙</span>
              </div>

              <div class="profile-form">
                <div class="form-group">
                  <label for="fullName">Full Name</label>

                  <input type="text" id="fullName" name="fullName" required />

                  <span id="fullName-error" class="field-error"></span>
                </div>

                <div class="form-group">
                  <label for="gender">Gender</label>

                  <select id="gender" name="gender" required>
                    <option value="">Select Gender</option>

                    <option value="Male">Male</option>

                    <option value="Female">Female</option>

                    <option value="Other">Other</option>
                  </select>

                  <span id="gender-error" class="field-error"></span>
                </div>

                <div class="form-group">
                  <label for="dateOfBirth">Date of Birth</label>

                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                  />

                  <span id="dateOfBirth-error" class="field-error"></span>
                </div>

                <div class="form-group">
                  <label for="bloodGroup">Blood Group</label>

                  <select id="bloodGroup" name="bloodGroup" required>
                    <option value="">Select Blood Group</option>

                    <option value="A+">A+</option>

                    <option value="A-">A-</option>

                    <option value="B+">B+</option>

                    <option value="B-">B-</option>

                    <option value="AB+">AB+</option>

                    <option value="AB-">AB-</option>

                    <option value="O+">O+</option>

                    <option value="O-">O-</option>
                  </select>

                  <span id="bloodGroup-error" class="field-error"></span>
                </div>
              </div>
            </section>

            <!-- CONTACT INFORMATION -->

            <section class="profile-card">
              <div class="card-heading">
                <div>
                  <h2>Contact Information</h2>

                  <p>Your contact and communication details</p>
                </div>

                <span class="card-icon">✉</span>
              </div>

              <div class="profile-form">
                <div class="form-group">
                  <label for="email">Email Address</label>

                  <input type="email" id="email" name="email" required />

                  <span id="email-error" class="field-error"></span>
                </div>

                <div class="form-group">
                  <label for="phone">Phone Number</label>

                  <input type="tel" id="phone" name="phone" required />

                  <span id="phone-error" class="field-error"></span>
                </div>

                <div class="form-group full-width">
                  <label for="address">Address</label>

                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    required
                  ></textarea>

                  <span id="address-error" class="field-error"></span>
                </div>
              </div>
            </section>

            <!-- PROFESSIONAL INFORMATION -->

            <section class="profile-card">
              <div class="card-heading">
                <div>
                  <h2>Professional Information</h2>

                  <p>Your medical career and qualifications</p>
                </div>

                <span class="card-icon">✚</span>
              </div>

              <div class="profile-form">
                <div class="form-group">
                  <label for="doctorId">Doctor ID</label>

                  <input type="text" id="doctorId" name="doctorId" readonly />
                </div>

                <div class="form-group">
                  <label for="specialization">Specialization</label>

                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    required
                  />

                  <span id="specialization-error" class="field-error"></span>
                </div>

                <div class="form-group">
                  <label for="qualification">Qualification</label>

                  <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    required
                  />

                  <span id="qualification-error" class="field-error"></span>
                </div>

                <div class="form-group">
                  <label for="experience">Experience</label>

                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    required
                  />

                  <span id="experience-error" class="field-error"></span>
                </div>

                <div class="form-group">
                  <label for="department">Department</label>

                  <input
                    type="text"
                    id="department"
                    name="department"
                    required
                  />

                  <span id="department-error" class="field-error"></span>
                </div>

                <div class="form-group">
                  <label for="hospital">Hospital</label>

                  <input type="text" id="hospital" name="hospital" required />

                  <span id="hospital-error" class="field-error"></span>
                </div>

                <div class="form-group full-width">
                  <label for="biography"> Professional Biography </label>

                  <textarea
                    id="biography"
                    name="biography"
                    rows="4"
                    required
                  ></textarea>

                  <span id="biography-error" class="field-error"></span>
                </div>
              </div>
            </section>

            <!-- PROFILE ACTIONS -->

            <div class="profile-actions">
              <button type="button" class="cancel-button" id="cancelChanges">
                Cancel
              </button>

              <button type="submit" class="save-button">✓ Save Changes</button>
            </div>

            <!-- SUCCESS OR ERROR MESSAGE -->

            <p id="profileMessage"></p>
          </form>

          <!-- FOOTER -->

          <footer class="dashboard-footer">
            <p>© 2026 HeartCare Clinic Management System.</p>

            <p>Doctor Portal</p>
          </footer>
        </div>
      </main>
    </div>

    <!-- JAVASCRIPT FILES -->

    <script src="js/doctor-profile-data.js"></script>

    <script src="js/common.js"></script>

    <script src="js/doctor-profile.js"></script>
  </body>
</html>
