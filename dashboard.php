<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="HeartCare administrator dashboard: clinic analytics, appointments, revenue and activity."
    />
    <title>Admin Dashboard | HeartCare Clinic</title>

    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/admin-dashboard.css" />
  </head>

  <body class="admin-body">
    <div class="adm-shell">
      <!-- ================= Sidebar ================= -->
      <aside class="adm-sidebar">
        <a href="dashboard.php" class="adm-brand">
          <span class="adm-brand__mark" aria-hidden="true">
            <img src="images/heartcare-logo.png" alt="" />
          </span>
          <span class="adm-brand__text">HeartCare</span>
        </a>

        <div class="adm-role">
          <span class="adm-role__badge">Administrator</span>
          <span class="adm-role__name">Clinic Admin</span>
        </div>

        <nav class="adm-nav" aria-label="Administrator navigation">
          <p class="adm-nav__label">Overview</p>
          <a
            href="dashboard.php"
            class="adm-nav__link is-active"
            aria-current="page"
          >
            <span class="adm-nav__icon" aria-hidden="true">▦</span>
            Dashboard
          </a>

          <p class="adm-nav__label">Clinic setup</p>
          <a href="manage-departments.php" class="adm-nav__link">
            <span class="adm-nav__icon" aria-hidden="true">▤</span>
            Departments
          </a>
          <a href="manage-doctors.php" class="adm-nav__link">
            <span class="adm-nav__icon" aria-hidden="true">✚</span>
            Doctors
          </a>
          <a href="manage-labtechs.php" class="adm-nav__link">
            <span class="adm-nav__icon" aria-hidden="true">⚗</span>
            Lab Technicians
          </a>
          <a href="manage-tests.php" class="adm-nav__link">
            <span class="adm-nav__icon" aria-hidden="true">◉</span>
            Test Catalogue
          </a>

          <p class="adm-nav__label">Operations</p>
          <a href="manage-appointments.php" class="adm-nav__link">
            <span class="adm-nav__icon" aria-hidden="true">▣</span>
            Appointments
          </a>
          <a href="reports.php" class="adm-nav__link">
            <span class="adm-nav__icon" aria-hidden="true">▥</span>
            Monthly Reports
          </a>
          <a href="audit-log.php" class="adm-nav__link">
            <span class="adm-nav__icon" aria-hidden="true">☰</span>
            Audit Log
          </a>

          <a href="login.php" class="adm-nav__link adm-nav__link--out">
            <span class="adm-nav__icon" aria-hidden="true">↪</span>
            Sign Out
          </a>
        </nav>
      </aside>

      <!-- ================= Main ================= -->
      <div class="adm-main">
        <header class="adm-topbar">
          <div class="adm-crumbs">
            <span>Admin</span>
            <span aria-hidden="true">/</span>
            <strong>Dashboard</strong>
          </div>

          <div class="adm-topbar__right">
            <!-- filled by showToday() -->
            <span class="adm-date" id="today-date"></span>
            <span class="adm-avatar" aria-label="Administrator">AD</span>
          </div>
        </header>

        <main class="adm-content">
          <section class="adm-head">
            <div>
              <p class="adm-eyebrow">CLINIC OVERVIEW</p>
              <h1>Administrator Dashboard</h1>
              <p class="adm-lead">
                Monitor clinic activity, revenue and staff at a glance.
              </p>
            </div>

            <div class="adm-head__actions">
              <a href="reports.php" class="adm-btn adm-btn--ghost">
                Generate Report
              </a>
              <a href="manage-doctors.php" class="adm-btn adm-btn--solid">
                + Add Doctor
              </a>
            </div>
          </section>

          <!-- KPI cards: the numbers are filled by renderKpis() -->
          <section class="adm-kpis" aria-label="Key figures">
            <article class="adm-kpi adm-kpi--blue">
              <span class="adm-kpi__icon" aria-hidden="true">♙</span>
              <div>
                <p class="adm-kpi__label">Registered Patients</p>
                <p class="adm-kpi__value" id="kpi-patients"></p>
                <p class="adm-kpi__note" id="kpi-patients-note"></p>
              </div>
            </article>

            <article class="adm-kpi adm-kpi--green">
              <span class="adm-kpi__icon" aria-hidden="true">✚</span>
              <div>
                <p class="adm-kpi__label">Active Doctors</p>
                <p class="adm-kpi__value" id="kpi-doctors"></p>
                <p class="adm-kpi__note" id="kpi-doctors-note"></p>
              </div>
            </article>

            <article class="adm-kpi adm-kpi--red">
              <span class="adm-kpi__icon" aria-hidden="true">▣</span>
              <div>
                <p class="adm-kpi__label">Today's Appointments</p>
                <p class="adm-kpi__value" id="kpi-today"></p>
                <p class="adm-kpi__note" id="kpi-today-note"></p>
              </div>
            </article>

            <article class="adm-kpi adm-kpi--gold">
              <span class="adm-kpi__icon" aria-hidden="true">৳</span>
              <div>
                <p class="adm-kpi__label">Revenue This Month</p>
                <p class="adm-kpi__value" id="kpi-revenue"></p>
                <p class="adm-kpi__note">Paid invoices only</p>
              </div>
            </article>
          </section>

          <div class="adm-grid">
            <section class="adm-card adm-span-7">
              <div class="adm-card__head">
                <div>
                  <h2>Appointments per Month</h2>
                  <p>Shows whether clinic activity is increasing.</p>
                </div>
              </div>
              <div class="adm-bars" id="chart-appointments"></div>
            </section>

            <section class="adm-card adm-span-5">
              <div class="adm-card__head">
                <div>
                  <h2>Appointments by Department</h2>
                  <p>Which departments receive the most visits.</p>
                </div>
              </div>
              <div class="adm-bars" id="chart-departments"></div>
            </section>

            <section class="adm-card adm-span-7">
              <div class="adm-card__head">
                <div>
                  <h2>Monthly Revenue</h2>
                  <p>Collected from paid invoices (unpaid excluded).</p>
                </div>
              </div>
              <div class="adm-bars" id="chart-revenue"></div>
            </section>

            <section class="adm-card adm-span-5">
              <div class="adm-card__head">
                <div>
                  <h2>Quick Actions</h2>
                  <p>Jump to common management tasks.</p>
                </div>
              </div>
              <div class="adm-quick">
                <a href="manage-departments.php" class="adm-quick__item">
                  <span aria-hidden="true">▤</span> Manage Departments
                </a>
                <a href="manage-doctors.php" class="adm-quick__item">
                  <span aria-hidden="true">✚</span> Manage Doctors
                </a>
                <a href="manage-labtechs.php" class="adm-quick__item">
                  <span aria-hidden="true">⚗</span> Manage Technicians
                </a>
                <a href="manage-tests.php" class="adm-quick__item">
                  <span aria-hidden="true">◉</span> Test Catalogue
                </a>
                <a href="reports.php" class="adm-quick__item">
                  <span aria-hidden="true">▥</span> Monthly Report
                </a>
                <a href="audit-log.php" class="adm-quick__item">
                  <span aria-hidden="true">☰</span> Audit Log
                </a>
              </div>
            </section>

            <section class="adm-card adm-span-7">
              <div class="adm-card__head">
                <div>
                  <h2>Today's Appointments</h2>
                  <p>Clinic-wide monitoring.</p>
                </div>
                <!-- onchange runs renderAppointments() again -->
                <select
                  class="adm-input"
                  id="status-filter"
                  onchange="renderAppointments()"
                >
                  <option value="All">All statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div class="adm-table-wrap">
                <table class="adm-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Department</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <!-- rows are built by renderAppointments() -->
                  <tbody id="appointment-rows"></tbody>
                </table>
              </div>
            </section>

            <section class="adm-card adm-span-5">
              <div class="adm-card__head">
                <div>
                  <h2>Recent Activity</h2>
                  <p>Latest audit log entries.</p>
                </div>
                <a href="audit-log.php" class="adm-link">Open log</a>
              </div>

              <!-- items are built by renderActivities() -->
              <ul class="adm-activity" id="activity-list"></ul>
            </section>
          </div>

          <footer class="adm-footer">
            <p>
              © 2026 HeartCare Clinic Management System. Academic project
              demonstration.
            </p>
          </footer>
        </main>
      </div>
    </div>

    <!-- data.js must come first because admin-dashboard.js uses it -->
    <script src="js/data.js"></script>
    <script src="js/admin-dashboard.js"></script>
  </body>
</html>
