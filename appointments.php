<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="My Appointments - HeartCare patient portal."
    />
    <title>My Appointments | HeartCare Clinic</title>
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/patient-dashboard.css" />
    <link rel="stylesheet" href="assets/css/patient-pages.css" />
  </head>

  <body class="patient-dashboard">
    <div class="dashboard-layout">
      <aside class="dashboard-sidebar">
        <a href="index.php" class="dashboard-brand">
          <span class="dashboard-brand__icon" aria-hidden="true">♥</span>
          <span>HeartCare</span>
        </a>

        <div class="sidebar-profile">
          <!-- filled by showPatientHeader() -->
          <div class="avatar" id="sidebar-initials"></div>
          <div>
            <strong id="sidebar-name"></strong>
            <span>Patient Account</span>
          </div>
        </div>

        <nav class="sidebar-nav" aria-label="Patient navigation">
          <p class="sidebar-label">MENU</p>

          <a href="patient-dashboard.php" class="sidebar-link">
            <span class="nav-icon" aria-hidden="true">▦</span>
            Dashboard
          </a>

          <a
            href="appointments.php"
            class="sidebar-link is-active"
            aria-current="page"
          >
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

          <a href="patient-profile.php" class="sidebar-link">
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

      <main class="dashboard-main">
        <header class="dashboard-topbar">
          <div class="breadcrumb">
            <span>Patient Portal</span>
            <span aria-hidden="true">/</span>
            <strong>My Appointments</strong>
          </div>
          <div class="topbar-actions">
            <span class="portal-status"
              ><span class="status-dot"></span>Patient Portal</span
            >
            <a
              href="patient-profile.php"
              class="topbar-avatar"
              id="topbar-initials"
              aria-label="Open profile"
            ></a>
          </div>
        </header>

        <div class="dashboard-content">
          <section class="welcome-section">
            <div>
              <p class="section-eyebrow">PATIENT SCHEDULE</p>
              <h1>My Appointments</h1>
              <p class="welcome-description">
                View, reschedule or cancel your appointments.
              </p>
            </div>
            <a href="book-appointment.php" class="primary-button">
              <span aria-hidden="true">+</span>
              Book Appointment
            </a>
          </section>

          <!-- ========== Update: reschedule form (hidden until Reschedule is clicked).
               It sits ABOVE the list so it is visible without scrolling. ========== -->
          <section class="panel" id="reschedule-panel" style="display: none">
            <div class="panel-header">
              <div>
                <p class="section-eyebrow">RESCHEDULE</p>
                <h2>Choose a new date and time</h2>
              </div>
            </div>

            <p class="pp-hint" id="rs_info"></p>

            <form
              class="pp-form"
              method="post"
              action="#"
              onsubmit="return saveReschedule();"
              novalidate
            >
              <div class="pp-row2">
                <div class="pp-field">
                  <label for="rs_date">New date</label>
                  <input
                    class="pp-input"
                    type="date"
                    id="rs_date"
                    name="rs_date"
                  />
                  <span id="rs_date-error"></span>
                </div>
                <div class="pp-field">
                  <label for="rs_time">New time</label>
                  <!-- options are added by fillTimes() -->
                  <select class="pp-input" id="rs_time" name="rs_time">
                    <option value="">Select time</option>
                  </select>
                  <span id="rs_time-error"></span>
                </div>
              </div>
              <button type="submit" class="primary-button pp-submit">
                Save New Time
              </button>
              <button
                type="button"
                class="secondary-button"
                onclick="hideReschedule()"
              >
                Keep Current Time
              </button>
            </form>
          </section>

          <!-- ========== Read: tabs + list ========== -->
          <section class="panel">
            <div class="panel-header">
              <div>
                <p class="section-eyebrow">YOUR SCHEDULE</p>
                <h2>All Appointments</h2>
              </div>
            </div>

            <!-- tab buttons are built by renderTabs() -->
            <div class="pp-tabs" id="tab-bar" role="tablist"></div>

            <!-- appointments are built by renderAppointments() -->
            <div id="appt-list"></div>
            <p class="pp-empty" id="appt-empty" style="display: none">
              No appointments in this list.
            </p>
          </section>

          <div class="health-notice">
            <span aria-hidden="true">ⓘ</span>
            <p>
              Rescheduling and cancelling are checked again on the server. Past
              and completed appointments cannot be changed.
            </p>
          </div>

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

    <!-- order matters: account data, page data, helpers, then this page's code -->
    <script src="js/patient-account-data.js"></script>
    <script src="js/patient-appointments-data.js"></script>
    <script src="js/patient-common.js"></script>
    <script src="js/patient-appointments.js"></script>
  </body>
</html>
