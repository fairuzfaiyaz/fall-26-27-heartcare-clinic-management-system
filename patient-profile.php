<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="My Profile - HeartCare patient portal." />

    <title>My Profile | HeartCare Clinic</title>

    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/patient-dashboard.css" />
    <link rel="stylesheet" href="assets/css/patient-pages.css" />
  </head>

  <body class="patient-dashboard">
    <div class="dashboard-layout">
      <!-- SIDEBAR -->
      <aside class="dashboard-sidebar">
        <a href="index.php" class="dashboard-brand">
          <span class="dashboard-brand__icon" aria-hidden="true">♥</span>
          <span>HeartCare</span>
        </a>

        <div class="sidebar-profile">
          <div class="avatar" id="sidebar-avatar">NT</div>

          <div>
            <strong id="sidebar-name">Nazibha Tabassum</strong>
            <span>Patient Account</span>
          </div>
        </div>

        <nav class="sidebar-nav" aria-label="Patient navigation">
          <p class="sidebar-label">MENU</p>

          <a href="patient-dashboard.php" class="sidebar-link">
            <span class="nav-icon" aria-hidden="true">▦</span>
            Dashboard
          </a>

          <a href="appointments.php" class="sidebar-link">
            <span class="nav-icon" aria-hidden="true">▣</span>
            My Appointments
          </a>

          <a href="health-tracker.php" class="sidebar-link">
            <span class="nav-icon" aria-hidden="true">♡</span>
            Health Tracker
          </a>

          <a href="medical-records.php" class="sidebar-link">
            <span class="nav-icon" aria-hidden="true">▤</span>
            Medical Records
          </a>

          <a href="prescriptions.php" class="sidebar-link">
            <span class="nav-icon" aria-hidden="true">✚</span>
            Prescriptions
          </a>

          <a href="invoices.php" class="sidebar-link">
            <span class="nav-icon" aria-hidden="true">৳</span>
            Billing &amp; Invoices
          </a>

          <p class="sidebar-label sidebar-label--spaced">ACCOUNT</p>

          <a
            href="patient-profile.php"
            class="sidebar-link is-active"
            aria-current="page"
          >
            <span class="nav-icon" aria-hidden="true">♙</span>
            My Profile
          </a>

          <a href="payment-methods.php" class="sidebar-link">
            <span class="nav-icon" aria-hidden="true">▰</span>
            Payment Methods
          </a>

          <a href="login.php" class="sidebar-link sidebar-link--logout">
            <span class="nav-icon" aria-hidden="true">↪</span>
            Sign Out
          </a>
        </nav>

        <div class="sidebar-help">
          <div class="help-icon" aria-hidden="true">?</div>

          <strong>Need assistance?</strong>

          <p>Contact the clinic team for help with your account.</p>

          <a href="index.php#contact">Contact Clinic →</a>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main class="dashboard-main">
        <!-- TOPBAR -->
        <header class="dashboard-topbar">
          <div class="breadcrumb">
            <span>Patient Portal</span>
            <span aria-hidden="true">/</span>
            <strong>My Profile</strong>
          </div>

          <div class="topbar-actions">
            <span class="portal-status">
              <span class="status-dot"></span>
              Patient Portal
            </span>

            <a
              href="patient-profile.php"
              class="topbar-avatar"
              aria-label="Open profile"
              id="topbar-avatar"
            >
              NT
            </a>
          </div>
        </header>

        <!-- DASHBOARD CONTENT -->
        <div class="dashboard-content">
          <!-- PAGE INTRODUCTION -->
          <section class="welcome-section">
            <div>
              <p class="section-eyebrow">ACCOUNT</p>

              <h1>My Profile</h1>

              <p class="welcome-description">
                Keep your personal and contact details up to date.
              </p>
            </div>
          </section>

          <div class="dashboard-columns">
            <!-- PERSONAL INFORMATION -->
            <section class="panel">
              <div class="panel-header">
                <div>
                  <p class="section-eyebrow">EDIT DETAILS</p>
                  <h2>Personal Information</h2>
                </div>
              </div>

              <form
                class="pp-form"
                id="profile-form"
                method="post"
                action="#"
                novalidate
                onsubmit="return validateProfileForm();"
              >
                <!-- FULL NAME AND DATE OF BIRTH -->
                <div class="pp-row2">
                  <div class="pp-field">
                    <label for="p_name">Full name</label>

                    <input
                      class="pp-input"
                      id="p_name"
                      name="p_name"
                      type="text"
                      placeholder="Full name"
                      required
                    />

                    <span id="p_name-error"></span>
                  </div>

                  <div class="pp-field">
                    <label for="p_dob">Date of birth</label>

                    <input
                      class="pp-input"
                      id="p_dob"
                      name="p_dob"
                      type="date"
                      required
                    />

                    <span id="p_dob-error"></span>
                  </div>
                </div>

                <!-- EMAIL AND PHONE -->
                <div class="pp-row2">
                  <div class="pp-field">
                    <label for="p_email">Email address</label>

                    <input
                      class="pp-input"
                      id="p_email"
                      name="p_email"
                      type="email"
                      placeholder="Email address"
                      required
                    />

                    <span id="p_email-error"></span>
                  </div>

                  <div class="pp-field">
                    <label for="p_phone">Phone number</label>

                    <input
                      class="pp-input"
                      id="p_phone"
                      name="p_phone"
                      type="tel"
                      placeholder="017XXXXXXXX"
                      required
                    />

                    <span id="p_phone-error"></span>
                  </div>
                </div>

                <!-- GENDER -->
                <div class="pp-field">
                  <label for="p_gender">Gender</label>

                  <select class="pp-input" id="p_gender" name="p_gender">
                    <option>Prefer not to say</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>

                <!-- ADDRESS -->
                <div class="pp-field">
                  <label for="p_addr">Address</label>

                  <input
                    class="pp-input"
                    id="p_addr"
                    name="p_addr"
                    type="text"
                    placeholder="House, road, area, city"
                  />
                </div>

                <!-- EMERGENCY CONTACT -->
                <div class="pp-row2">
                  <div class="pp-field">
                    <label for="p_ec">Emergency contact name</label>

                    <input
                      class="pp-input"
                      id="p_ec"
                      name="p_ec"
                      type="text"
                      placeholder="Emergency contact name"
                    />
                  </div>

                  <div class="pp-field">
                    <label for="p_ecp">Emergency contact phone</label>

                    <input
                      class="pp-input"
                      id="p_ecp"
                      name="p_ecp"
                      type="tel"
                      placeholder="017XXXXXXXX"
                    />

                    <span id="p_ecp-error"></span>
                  </div>
                </div>

                <!-- FORM BUTTONS -->
                <button
                  type="submit"
                  class="primary-button pp-submit"
                  id="save-profile-button"
                >
                  Save Changes
                </button>

                <button type="button" class="pp-act" id="cancel-edit">
                  Reset Changes
                </button>

                <p id="profile-message"></p>
              </form>
            </section>

            <!-- ACCOUNT OVERVIEW -->
            <section class="panel">
              <div class="panel-header">
                <div>
                  <p class="section-eyebrow">SUMMARY</p>
                  <h2>Account Overview</h2>
                </div>
              </div>

              <div class="profile-summary">
                <div class="profile-avatar" id="profile-avatar">NT</div>

                <div>
                  <h3 id="summary-name">Nazibha Tabassum</h3>

                  <p>
                    Patient ID:
                    <span id="summary-id">HC-P-00125</span>
                  </p>
                </div>
              </div>

              <div class="profile-info">
                <div>
                  <span>Email Address</span>
                  <strong id="summary-email">nazibha@example.com</strong>
                </div>

                <div>
                  <span>Date of Birth</span>
                  <strong id="summary-dob">2003-03-15</strong>
                </div>

                <div>
                  <span>Account Status</span>

                  <strong class="account-active" id="summary-status">
                    <span class="status-dot"></span>
                    Active
                  </strong>
                </div>
              </div>
            </section>

            <!-- DEACTIVATE ACCOUNT -->
            <section class="panel pp-danger">
              <div class="panel-header">
                <div>
                  <p class="section-eyebrow">ACCOUNT</p>
                  <h2>Deactivate Account</h2>
                </div>
              </div>

              <p class="pp-hint">
                Deactivating hides your profile and stops new bookings. Your
                medical history is kept by the clinic.
              </p>

              <button type="button" class="pp-act pp-act--danger" id="deact">
                Deactivate my account
              </button>

              <p id="deactivate-message"></p>
            </section>
          </div>

          <!-- FOOTER -->
          <footer class="dashboard-footer">
            <p>
              © 2026 HeartCare Clinic Management System. Academic project
              demonstration.
            </p>

            <p>For emergencies, contact local emergency services.</p>
          </footer>
        </div>
      </main>
    </div>

    <!-- JAVASCRIPT FILES -->
    <script src="js/patient-account-data.js"></script>
    <script src="js/common.js"></script>
    <script src="js/patient-profile.js"></script>
  </body>
</html>
