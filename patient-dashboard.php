<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <meta name="description"
    content="HeartCare patient dashboard for appointments, invoices, health tracking and medical records." />

  <title>Patient Dashboard | HeartCare Clinic</title>

  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/patient-dashboard.css" />
</head>

<body class="patient-dashboard">
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="dashboard-sidebar">
      <a href="index.php" class="dashboard-brand">
        <span class="dashboard-brand__icon" aria-hidden="true">♥</span>
        <span>HeartCare</span>
      </a>

      <div class="sidebar-profile">
        <!-- filled by showGreeting() -->
        <div class="avatar" id="sidebar-initials"></div>
        <div>
          <strong id="sidebar-name"></strong>
          <span>Patient Account</span>
        </div>
      </div>

      <nav class="sidebar-nav" aria-label="Patient navigation">
        <p class="sidebar-label">MENU</p>

        <a href="patient-dashboard.php" class="sidebar-link is-active" aria-current="page">
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

    <!-- Main content -->
    <main class="dashboard-main">
      <!-- Top bar -->
      <header class="dashboard-topbar">
        <div class="breadcrumb">
          <span>Patient Portal</span>
          <span aria-hidden="true">/</span>
          <strong>Dashboard</strong>
        </div>

        <div class="topbar-actions">
          <span class="portal-status">
            <span class="status-dot"></span>
            Patient Portal
          </span>

          <a href="patient-profile.php" class="topbar-avatar" id="topbar-initials" aria-label="Open profile"></a>
        </div>
      </header>

      <div class="dashboard-content">
        <!-- Welcome section -->
        <section class="welcome-section">
          <div>
            <p class="section-eyebrow">PATIENT OVERVIEW</p>
            <!-- greeting and first name are filled by showGreeting() -->
            <h1 id="greeting"></h1>
            <p class="welcome-description">
              Here's an overview of your appointments and healthcare activity.
            </p>
          </div>

          <a href="book-appointment.php" class="primary-button">
            <span aria-hidden="true">+</span>
            Book Appointment
          </a>
        </section>

        <!-- Summary cards: the numbers are filled by renderSummary() -->
        <section class="summary-grid" aria-label="Account summary">
          <article class="summary-card">
            <div class="summary-card__top">
              <span class="summary-icon summary-icon--blue" aria-hidden="true">▣</span>
              <span class="summary-caption">Upcoming</span>
            </div>
            <p class="summary-value" id="sum-upcoming"></p>
            <h2>Appointments</h2>
            <a href="appointments.php">View schedule →</a>
          </article>

          <article class="summary-card">
            <div class="summary-card__top">
              <span class="summary-icon summary-icon--red" aria-hidden="true">♡</span>
              <span class="summary-caption">Personal records</span>
            </div>
            <p class="summary-value" id="sum-health"></p>
            <h2>Health Entries</h2>
            <a href="health-tracker.php">Track your health →</a>
          </article>

          <article class="summary-card">
            <div class="summary-card__top">
              <span class="summary-icon summary-icon--gold" aria-hidden="true">৳</span>
              <span class="summary-caption">Awaiting payment</span>
            </div>
            <p class="summary-value" id="sum-balance"></p>
            <h2>Outstanding Balance</h2>
            <a href="invoices.php">View invoices →</a>
          </article>

          <article class="summary-card">
            <div class="summary-card__top">
              <span class="summary-icon summary-icon--green" aria-hidden="true">✓</span>
              <span class="summary-caption">Latest visit</span>
            </div>
            <p class="summary-value summary-value--date" id="sum-last"></p>
            <h2>Last Consultation</h2>
            <a href="medical-records.php">View records →</a>
          </article>
        </section>

        <!-- Appointment and profile panels -->
        <div class="dashboard-columns">
          <section class="panel appointments-panel">
            <div class="panel-header">
              <div>
                <p class="section-eyebrow">YOUR SCHEDULE</p>
                <h2>Upcoming Appointments</h2>
              </div>
              <a href="appointments.php" class="text-link">View all</a>
            </div>

            <!-- items are built by renderAppointments() -->
            <div id="appointment-list"></div>

            <a href="book-appointment.php" class="secondary-button">
              + Schedule Another Appointment
            </a>
          </section>

          <section class="panel profile-panel">
            <div class="panel-header">
              <div>
                <p class="section-eyebrow">YOUR INFORMATION</p>
                <h2>Patient Profile</h2>
              </div>
              <a href="patient-profile.php" class="text-link">Edit</a>
            </div>

            <!-- filled by renderProfile() -->
            <div class="profile-summary">
              <div class="profile-avatar" id="profile-initials"></div>
              <div>
                <h3 id="profile-name"></h3>
                <p id="profile-id"></p>
              </div>
            </div>

            <div class="profile-info">
              <div>
                <span>Email Address</span>
                <strong id="profile-email"></strong>
              </div>

              <div>
                <span>Phone Number</span>
                <strong id="profile-phone"></strong>
              </div>

              <div>
                <span>Date of Birth</span>
                <strong id="profile-dob"></strong>
              </div>

              <div>
                <span>Account Status</span>
                <strong class="account-active" id="profile-status"></strong>
              </div>
            </div>

            <a href="patient-profile.php" class="secondary-button">
              Manage My Profile
            </a>
          </section>
        </div>

        <!-- Health tracker and latest records -->
        <div class="dashboard-columns dashboard-columns--bottom">
          <section class="panel health-panel">
            <div class="panel-header">
              <div>
                <p class="section-eyebrow">PERSONAL HEALTH TRACKER</p>
                <h2>Recent Measurements</h2>
              </div>
              <a href="health-tracker.php" class="text-link">View trends</a>
            </div>

            <!-- cards are built by renderMeasurements() -->
            <div class="measurement-grid" id="measurement-grid"></div>

            <div class="health-notice">
              <span aria-hidden="true">ⓘ</span>
              <p>
                These entries are for personal tracking only. Measurement
                interpretation depends on individual circumstances and
                clinical context. They are not a diagnosis.
              </p>
            </div>

            <a href="health-tracker.php" class="secondary-button">
              + Add Measurement
            </a>
          </section>

          <section class="panel records-panel">
            <div class="panel-header">
              <div>
                <p class="section-eyebrow">RECENT ACTIVITY</p>
                <h2>Medical Records</h2>
              </div>
              <a href="medical-records.php" class="text-link">View all</a>
            </div>

            <!-- links are built by renderRecords() -->
            <div id="record-list"></div>
          </section>
        </div>

        <!-- Billing -->
        <section class="panel billing-panel">
          <div class="panel-header">
            <div>
              <p class="section-eyebrow">PAYMENTS &amp; BILLING</p>
              <h2>Recent Invoices</h2>
            </div>
            <a href="invoices.php" class="text-link">View all invoices</a>
          </div>

          <div class="table-wrapper">
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Description</th>
                  <th>Issue Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <!-- rows are built by renderInvoices() -->
              <tbody id="invoice-rows"></tbody>
            </table>
          </div>
        </section>

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
  <script src="js/patient-dashboard-data.js"></script>
  <script src="js/patient-common.js"></script>
  <script src="js/patient-dashboard.js"></script>
</body>

</html>
