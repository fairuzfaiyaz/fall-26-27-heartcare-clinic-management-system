<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>My Appointments | HeartCare</title>

    <link rel="stylesheet" href="css/doctor-dashboard.css" />

    <link rel="stylesheet" href="css/doctorMy-appoinments.css" />
  </head>

  <body class="doctor-dashboard">
    <div class="dashboard-layout">
      <!-- SIDEBAR -->

      <aside class="dashboard-sidebar">
        <a class="dashboard-brand" href="index.php">
          <span class="dashboard-brand__icon">&hearts;</span>

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
            <span class="nav-icon">▦</span> Dashboard
          </a>

          <a class="sidebar-link" href="myProfile.php"> My Profile </a>

          <a class="sidebar-link" href="my_schedule.php"> My Schedule </a>

          <a class="sidebar-link is-active" href="my_appointments.php">
            My Appointments
          </a>

          <a class="sidebar-link" href="consultation.php"> Consultation </a>

          <a class="sidebar-link" href="prescription.php"> Prescriptions </a>

          <a class="sidebar-link" href="order_tests.php"> Laboratory Tests </a>

          <a class="sidebar-link" href="patient_timeline.php">
            Patient Timeline
          </a>
        </nav>

        <a class="sidebar-link sidebar-link--logout" href="login.php">
          Log out
        </a>
      </aside>

      <!-- MAIN CONTENT -->

      <main class="dashboard-main">
        <div class="dashboard-content">
          <!-- PAGE HEADER -->

          <section class="welcome-section">
            <div>
              <p class="section-eyebrow">PATIENT MANAGEMENT</p>

              <h1>My Appointments</h1>

              <p class="welcome-description">
                View and manage your patient appointments.
              </p>
            </div>
          </section>

          <!-- SUMMARY CARDS -->

          <section class="summary-grid">
            <article class="summary-card">
              <div class="summary-card__top">
                <span class="summary-icon summary-icon--blue">▣</span>

                <span class="summary-caption">Today</span>
              </div>

              <p class="summary-value" id="totalAppointments">08</p>

              <h2>Total Appointments</h2>
            </article>

            <article class="summary-card">
              <div class="summary-card__top">
                <span class="summary-icon summary-icon--gold">◷</span>

                <span class="summary-caption">Waiting</span>
              </div>

              <p class="summary-value" id="pendingAppointments">03</p>

              <h2>Pending</h2>
            </article>

            <article class="summary-card">
              <div class="summary-card__top">
                <span class="summary-icon summary-icon--green">✓</span>

                <span class="summary-caption">Completed</span>
              </div>

              <p class="summary-value" id="completedAppointments">05</p>

              <h2>Completed</h2>
            </article>
          </section>

          <!-- APPOINTMENT TABLE -->

          <section class="panel appointment-panel">
            <div class="panel-header">
              <div>
                <p class="section-eyebrow">APPOINTMENT LIST</p>

                <h2>All Appointments</h2>
              </div>
            </div>

            <!-- SEARCH AND FILTER -->

            <div class="appointment-controls">
              <div class="appointment-search">
                <input
                  type="text"
                  id="appointmentSearch"
                  placeholder="Search patient name or ID..."
                />
              </div>

              <div class="appointment-filter">
                <select id="statusFilter">
                  <option value="All">All Status</option>

                  <option value="Confirmed">Confirmed</option>

                  <option value="Pending">Pending</option>

                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <!-- APPOINTMENT TABLE -->

            <div class="table-wrapper">
              <table class="data-table appointment-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>

                    <th>Patient ID</th>

                    <th>Date</th>

                    <th>Time</th>

                    <th>Reason</th>

                    <th>Status</th>

                    <th>Action</th>
                  </tr>
                </thead>

                <!-- Dynamic appointment rows -->

                <tbody id="appointmentTable"></tbody>
              </table>
            </div>
          </section>

          <!-- FOOTER -->

          <footer class="dashboard-footer">
            <p>
              &copy; 2026 HeartCare Clinic Management System. Academic project
              demonstration.
            </p>
          </footer>
        </div>
      </main>
    </div>

    <!-- JAVASCRIPT FILES -->

    <script src="js/doctor-appointments-data.js"></script>

    <script src="js/common.js"></script>

    <script src="js/doctor-appointments.js"></script>
  </body>
</html>
