<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Prescription | HeartCare Clinic</title>

    <!-- Common Dashboard CSS -->
    <link rel="stylesheet" href="css/doctor-dashboard.css" />

    <!-- Prescription Page CSS -->
    <link rel="stylesheet" href="css/doctor-prescription.css" />
  </head>

  <body class="doctor-dashboard">
    <div class="dashboard-layout">
      <!-- SIDEBAR -->

      <aside class="dashboard-sidebar">
        <a class="dashboard-brand" href="doctor/doctor-dashboard.php">
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

          <a href="doctor-dashboard.php" class="sidebar-link">
            <span class="nav-icon">▦</span>

            Dashboard
          </a>

          <a href="myProfile.php" class="sidebar-link">
            <span class="nav-icon">♙</span>

            My Profile
          </a>

          <a href="my_schedule.php" class="sidebar-link">
            <span class="nav-icon">▣</span>

            My Schedule
          </a>

          <a href="my_appointments.php" class="sidebar-link">
            <span class="nav-icon">☷</span>

            My Appointments
          </a>

          <a href="consultation.php" class="sidebar-link">
            <span class="nav-icon">✚</span>

            Consultation
          </a>

          <a href="prescription.php" class="sidebar-link is-active">
            <span class="nav-icon">▤</span>

            Prescriptions
          </a>

          <a href="order_tests.php" class="sidebar-link">
            <span class="nav-icon">⚕</span>

            Laboratory Tests
          </a>

          <a href="patient_timeline.php" class="sidebar-link">
            <span class="nav-icon">◷</span>

            Patient Timeline
          </a>

          <a class="sidebar-link sidebar-link--logout" href="login.php">
            Log out
          </a>
        </nav>
      </aside>

      <!-- MAIN CONTENT -->

      <main class="dashboard-main">
        <div class="dashboard-content">
          <!-- PAGE HEADING -->

          <header class="welcome-section">
            <div>
              <p class="section-eyebrow">DOCTOR PANEL</p>

              <h1>Prescription</h1>

              <p class="welcome-description">
                Create and manage patient prescriptions.
              </p>
            </div>
          </header>

          <!-- PRESCRIPTION FORM -->

          <section class="panel prescription-panel">
            <form id="prescriptionForm" novalidate>
              <!-- HOSPITAL INFORMATION -->

              <div class="hospital-header">
                <div class="hospital-logo">HC</div>

                <div class="hospital-info">
                  <h1>HEARTCARE CLINIC</h1>

                  <p>Advanced Cardiac & General Healthcare</p>

                  <span>123 Medical Road, Dhaka, Bangladesh</span>

                  <span>Phone: +880 1712-345678</span>
                </div>
              </div>

              <!-- DOCTOR INFORMATION -->

              <div class="doctor-info">
                <div>
                  <h3>Dr. Badhon Pal</h3>

                  <p>MBBS, MD (Cardiology)</p>

                  <p>Cardiology Specialist</p>
                </div>

                <div class="doctor-contact">
                  <p>Department: Cardiology</p>

                  <p>BMDC Reg. No: BMDC-123456</p>

                  <p>Consultant Doctor</p>
                </div>
              </div>

              <!-- PRESCRIPTION DATE -->

              <div class="prescription-meta">
                <div class="meta-field">
                  <label>Prescription ID</label>

                  <input type="text" id="prescriptionId" value="" readonly />
                </div>

                <div class="meta-field">
                  <label>Prescription Date</label>

                  <input
                    type="date"
                    id="prescriptionDate"
                    name="prescription_date"
                  />

                  <span id="prescriptionDate-error" class="field-error"></span>
                </div>

                <div class="meta-field">
                  <label>Next Follow-up</label>

                  <input type="date" id="followupDate" name="followup_date" />

                  <span id="followupDate-error" class="field-error"></span>
                </div>
              </div>

              <!-- PATIENT INFORMATION -->

              <div class="prescription-section">
                <h3 class="prescription-heading">Patient Information</h3>

                <div class="patient-prescription-grid">
                  <div class="prescription-field">
                    <label>Patient Name</label>

                    <input
                      type="text"
                      id="patientName"
                      name="patient_name"
                      placeholder="Enter patient name"
                    />

                    <span id="patientName-error" class="field-error"></span>
                  </div>

                  <div class="prescription-field">
                    <label>Patient ID</label>

                    <input
                      type="text"
                      id="patientId"
                      name="patient_id"
                      placeholder="Enter patient ID"
                    />

                    <span id="patientId-error" class="field-error"></span>
                  </div>

                  <div class="prescription-field">
                    <label>Age</label>

                    <input
                      type="number"
                      id="age"
                      name="age"
                      placeholder="Age"
                      min="1"
                      max="120"
                    />

                    <span id="age-error" class="field-error"></span>
                  </div>

                  <div class="prescription-field">
                    <label>Gender</label>

                    <select id="gender" name="gender">
                      <option value="">Select Gender</option>

                      <option value="Male">Male</option>

                      <option value="Female">Female</option>

                      <option value="Other">Other</option>
                    </select>

                    <span id="gender-error" class="field-error"></span>
                  </div>

                  <div class="prescription-field">
                    <label>Blood Group</label>

                    <select id="bloodGroup" name="blood_group">
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

                  <div class="prescription-field">
                    <label>Phone Number</label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Patient phone number"
                    />

                    <span id="phone-error" class="field-error"></span>
                  </div>
                </div>
              </div>

              <!-- DIAGNOSIS -->

              <div class="prescription-section">
                <h3 class="prescription-heading">Diagnosis</h3>

                <textarea
                  id="diagnosis"
                  name="diagnosis"
                  class="prescription-textarea"
                  placeholder="Enter patient diagnosis..."
                ></textarea>

                <span id="diagnosis-error" class="field-error"></span>
              </div>

              <!-- MEDICINE DETAILS -->

              <div class="prescription-section">
                <h3 class="prescription-heading">Rx - Medicine Details</h3>

                <div class="medicine-table-container">
                  <table class="medicine-table">
                    <thead>
                      <tr>
                        <th>#</th>

                        <th>Medicine Name</th>

                        <th>Dosage</th>

                        <th>Frequency</th>

                        <th>Duration</th>

                        <th>Instructions</th>
                      </tr>
                    </thead>

                    <tbody>
                      <!-- MEDICINE 1 -->

                      <tr>
                        <td>1</td>

                        <td>
                          <input
                            type="text"
                            id="medicine1"
                            name="medicine1"
                            placeholder="Medicine name"
                          />

                          <span id="medicine1-error" class="field-error"></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="dosage1"
                            name="dosage1"
                            placeholder="500 mg"
                          />

                          <span id="dosage1-error" class="field-error"></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="frequency1"
                            name="frequency1"
                            placeholder="1+0+1"
                          />

                          <span
                            id="frequency1-error"
                            class="field-error"
                          ></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="duration1"
                            name="duration1"
                            placeholder="7 days"
                          />

                          <span id="duration1-error" class="field-error"></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="instruction1"
                            name="instruction1"
                            placeholder="After meal"
                          />

                          <span
                            id="instruction1-error"
                            class="field-error"
                          ></span>
                        </td>
                      </tr>

                      <!-- MEDICINE 2 -->

                      <tr>
                        <td>2</td>

                        <td>
                          <input
                            type="text"
                            id="medicine2"
                            name="medicine2"
                            placeholder="Medicine name"
                          />

                          <span id="medicine2-error" class="field-error"></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="dosage2"
                            name="dosage2"
                            placeholder="250 mg"
                          />

                          <span id="dosage2-error" class="field-error"></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="frequency2"
                            name="frequency2"
                            placeholder="1+0+0"
                          />

                          <span
                            id="frequency2-error"
                            class="field-error"
                          ></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="duration2"
                            name="duration2"
                            placeholder="5 days"
                          />

                          <span id="duration2-error" class="field-error"></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="instruction2"
                            name="instruction2"
                            placeholder="Before meal"
                          />

                          <span
                            id="instruction2-error"
                            class="field-error"
                          ></span>
                        </td>
                      </tr>

                      <!-- MEDICINE 3 -->

                      <tr>
                        <td>3</td>

                        <td>
                          <input
                            type="text"
                            id="medicine3"
                            name="medicine3"
                            placeholder="Medicine name"
                          />

                          <span id="medicine3-error" class="field-error"></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="dosage3"
                            name="dosage3"
                            placeholder="100 mg"
                          />

                          <span id="dosage3-error" class="field-error"></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="frequency3"
                            name="frequency3"
                            placeholder="0+0+1"
                          />

                          <span
                            id="frequency3-error"
                            class="field-error"
                          ></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="duration3"
                            name="duration3"
                            placeholder="10 days"
                          />

                          <span id="duration3-error" class="field-error"></span>
                        </td>

                        <td>
                          <input
                            type="text"
                            id="instruction3"
                            name="instruction3"
                            placeholder="After meal"
                          />

                          <span
                            id="instruction3-error"
                            class="field-error"
                          ></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- DOCTOR'S ADVICE -->

              <div class="prescription-section">
                <h3 class="prescription-heading">Doctor's Advice</h3>

                <textarea
                  id="advice"
                  name="advice"
                  class="prescription-textarea"
                  placeholder="Enter doctor's advice and recommendations..."
                ></textarea>
              </div>

              <!-- FOLLOW-UP INSTRUCTIONS -->

              <div class="prescription-section">
                <h3 class="prescription-heading">Follow-up Instructions</h3>

                <textarea
                  id="followupInstructions"
                  name="followup_instructions"
                  class="prescription-textarea"
                  placeholder="Enter follow-up instructions..."
                ></textarea>
              </div>

              <!-- DOCTOR SIGNATURE -->

              <div class="prescription-signature">
                <div class="signature-box">
                  <div class="signature-line"></div>

                  <h4>Dr. Badhon Pal</h4>

                  <p>Doctor's Signature</p>

                  <small>Cardiology Specialist</small>
                </div>
              </div>

              <!-- FORM MESSAGE -->

              <p id="prescriptionMessage" class="prescription-message"></p>

              <!-- ACTION BUTTONS -->

              <div class="prescription-actions">
                <button
                  type="button"
                  id="prescriptionClear"
                  class="prescription-clear"
                >
                  Clear Form
                </button>

                <button type="submit" class="prescription-save">
                  Save Prescription
                </button>
              </div>
            </form>
          </section>

          <!-- SAVED PRESCRIPTIONS -->

          <section class="panel saved-prescriptions">
            <div class="panel-header">
              <div>
                <p class="section-eyebrow">PRESCRIPTION MANAGEMENT</p>

                <h2>Saved Prescriptions</h2>
              </div>
            </div>

            <!-- SEARCH -->

            <div class="prescription-search">
              <input
                type="text"
                id="prescriptionSearch"
                placeholder="Search by patient name or ID..."
              />
            </div>

            <!-- SAVED PRESCRIPTION TABLE -->

            <div class="medicine-table-container">
              <table class="saved-prescription-table">
                <thead>
                  <tr>
                    <th>Prescription ID</th>

                    <th>Patient Name</th>

                    <th>Patient ID</th>

                    <th>Date</th>

                    <th>Medicines</th>

                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody id="prescriptionList"></tbody>
              </table>
            </div>
          </section>

          <!-- FOOTER -->

          <footer class="dashboard-footer">
            <p>© 2026 HeartCare Clinic. All Rights Reserved.</p>
          </footer>
        </div>
      </main>
    </div>

    <!-- JAVASCRIPT FILES -->

    <script src="js/doctor-prescription-data.js"></script>

    <script src="js/common.js"></script>

    <script src="js/doctor-prescription.js"></script>
  </body>
</html>
