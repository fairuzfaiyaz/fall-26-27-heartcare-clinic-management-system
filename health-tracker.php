<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Health Tracker - HeartCare patient portal."
    />
    <title>Health Tracker | HeartCare Clinic</title>
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/patient-dashboard.css" />
    <link rel="stylesheet" href="css/health-tracker.css" />
  </head>

  <body class="patient-dashboard">
    <div class="dashboard-layout">
      <aside class="dashboard-sidebar">
        <a href="index.php" class="dashboard-brand">
          <span class="dashboard-brand__icon" aria-hidden="true">♥</span>
          <span>HeartCare</span>
        </a>

        <div class="sidebar-profile">
          <div class="avatar">FA</div>
          <div>
            <strong>Fairuz Ahmed</strong>
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

          <a
            href="health-tracker.php"
            class="sidebar-link is-active"
            aria-current="page"
          >
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
            <strong>Health Tracker</strong>
          </div>
          <div class="topbar-actions">
            <span class="portal-status"
              ><span class="status-dot"></span>Patient Portal</span
            >
            <a
              href="patient-profile.php"
              class="topbar-avatar"
              aria-label="Open profile"
              >FA</a
            >
          </div>
        </header>

        <div class="dashboard-content">
          <section class="welcome-section">
            <div>
              <p class="section-eyebrow">PERSONAL HEALTH TRACKER</p>
              <h1>Health Tracker</h1>
              <p class="welcome-description">
                Record your own measurements and keep a log of them over time.
              </p>
            </div>
            <!-- opens the Add Measurement pop-up (js/health-tracker.js) -->
            <button type="button" class="primary-button" id="add-btn">
              <span aria-hidden="true">+</span>
              Add Measurement
            </button>
          </section>

          <div class="health-notice">
            <span aria-hidden="true">ⓘ</span>
            <p>
              Highlighting is informational and is not a diagnosis. Reference
              values depend on the measurement context and on the individual, so
              a single range does not suit everyone. Discuss any concern with
              your doctor.
            </p>
          </div>

          <!-- Latest readings (filled by js/health-tracker.js) -->
          <section class="panel latest-panel">
            <div class="panel-header">
              <div>
                <p class="section-eyebrow">AT A GLANCE</p>
                <h2>Latest Readings</h2>
              </div>
            </div>
            <div class="measurement-grid">
              <div class="measurement-card">
                <div class="measurement-heading">
                  <span
                    class="measurement-icon measurement-icon--red"
                    aria-hidden="true"
                    >♥</span
                  >
                  Blood pressure
                </div>
                <p class="measurement-value" id="latest-bp">—</p>
                <p class="measurement-date" id="latest-bp-date">
                  No readings yet
                </p>
              </div>
              <div class="measurement-card">
                <div class="measurement-heading">
                  <span
                    class="measurement-icon measurement-icon--blue"
                    aria-hidden="true"
                    >◐</span
                  >
                  Blood glucose
                </div>
                <p class="measurement-value" id="latest-glu">—</p>
                <p class="measurement-date" id="latest-glu-date">
                  No readings yet
                </p>
              </div>
              <div class="measurement-card">
                <div class="measurement-heading">
                  <span
                    class="measurement-icon measurement-icon--green"
                    aria-hidden="true"
                    >⚖</span
                  >
                  Weight
                </div>
                <p class="measurement-value" id="latest-wt">—</p>
                <p class="measurement-date" id="latest-wt-date">
                  No readings yet
                </p>
              </div>
            </div>
          </section>

          <!-- Measurement log: Read + Search + Edit + Delete -->
          <section class="panel">
            <div class="panel-header">
              <div>
                <p class="section-eyebrow">MEASUREMENT LOG</p>
                <h2>Your Entries</h2>
              </div>
              <a href="#add" class="text-link" id="add-link">Add new</a>
            </div>

            <div id="page-msg" role="status" hidden></div>

            <div class="log-toolbar">
              <input
                class="pp-input"
                type="search"
                id="log-search"
                placeholder="Search date, type, value or notes..."
                aria-label="Search measurements"
              />
              <select
                class="pp-input"
                id="log-type"
                aria-label="Filter by type"
              >
                <option value="all">All types</option>
                <option value="bp">Blood pressure</option>
                <option value="glucose">Blood glucose</option>
                <option value="weight">Weight</option>
              </select>
            </div>
            <p class="pp-hint" id="log-count"></p>

            <div class="table-wrapper">
              <table class="invoice-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>Context / notes</th>
                    <th>Reference check</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="log-body">
                  <!-- rows are drawn by js/health-tracker.js -->
                </tbody>
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

    <!-- Add / Edit pop-up: Create + Update -->
    <div class="modal" id="modal" hidden>
      <div
        class="modal__box panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
      >
        <div class="panel-header">
          <div>
            <p class="section-eyebrow" id="form-eyebrow">ADD ENTRY</p>
            <h2 id="form-title">Record a Measurement</h2>
          </div>
          <button
            type="button"
            class="pp-act"
            id="close-btn"
            aria-label="Close form"
          >
            ✕ Close
          </button>
        </div>

        <form
          class="pp-form"
          id="measure-form"
          method="post"
          action="#"
          novalidate
        >
          <div class="pp-field">
            <label for="m_date">Measurement date</label>
            <input class="pp-input" id="m_date" name="m_date" type="date" />
          </div>

          <div class="pp-row2">
            <div class="pp-field">
              <label for="m_sys">Systolic (mmHg)</label>
              <input
                class="pp-input"
                id="m_sys"
                name="m_sys"
                type="number"
                placeholder="118"
                min="50"
                max="260"
              />
            </div>
            <div class="pp-field">
              <label for="m_dia">Diastolic (mmHg)</label>
              <input
                class="pp-input"
                id="m_dia"
                name="m_dia"
                type="number"
                placeholder="78"
                min="30"
                max="160"
              />
            </div>
          </div>

          <div class="pp-row2">
            <div class="pp-field">
              <label for="m_glu">Blood glucose (mg/dL)</label>
              <input
                class="pp-input"
                id="m_glu"
                name="m_glu"
                type="number"
                placeholder="95"
                min="20"
                max="600"
                step="any"
              />
            </div>
            <div class="pp-field">
              <label for="m_ctx">Glucose context</label>
              <select class="pp-input" id="m_ctx" name="m_ctx">
                <option>Fasting</option>
                <option>Before meal</option>
                <option>After meal</option>
                <option>Random</option>
              </select>
            </div>
          </div>

          <div class="pp-field">
            <label for="m_wt">Weight (kg)</label>
            <input
              class="pp-input"
              id="m_wt"
              name="m_wt"
              type="number"
              placeholder="71.0"
              min="1"
              max="400"
              step="0.1"
            />
          </div>

          <div class="pp-field">
            <label for="m_note">Notes (optional)</label>
            <textarea
              class="pp-input"
              id="m_note"
              name="m_note"
              rows="2"
              placeholder="e.g. after exercise"
            ></textarea>
          </div>

          <p class="pp-hint" id="form-hint">
            Fill in one or more measurements. Empty groups are skipped.
          </p>

          <div id="form-msg" role="status" hidden></div>

          <button type="submit" class="primary-button pp-submit" id="save-btn">
            Save Measurement
          </button>
          <button type="button" class="secondary-button" id="cancel-btn">
            Cancel
          </button>
        </form>
      </div>
    </div>

    <script src="js/patient-health-tracker.js"></script>
  </body>
</html>
