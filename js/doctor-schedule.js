/*
    File: doctor-schedule.js
    Purpose: Handle weekly schedule rendering,
    summary calculation and daily schedule.
*/

// Function to get today's day name
function getTodayName() {
  const today = new Date();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return dayNames[today.getDay()];
}

// Function to calculate and display schedule statistics
function renderScheduleStats() {
  let workingDays = 0;
  let availableDaysOff = 0;
  let totalWorkingHours = 0;

  for (let i = 0; i < doctorWeeklySchedule.length; i++) {
    const schedule = doctorWeeklySchedule[i];

    if (schedule.status === "Available") {
      workingDays++;

      totalWorkingHours = totalWorkingHours + schedule.workingHours;
    } else {
      availableDaysOff++;
    }
  }

  // Display working days
  document.getElementById("workingDays").innerHTML = workingDays
    .toString()
    .padStart(2, "0");

  // Display standard daily working hours
  document.getElementById("workingHours").innerHTML = "06";

  // Display today's appointments
  document.getElementById("totalAppointments").innerHTML = todayAppointmentCount
    .toString()
    .padStart(2, "0");

  // Display available days off
  document.getElementById("availableDaysOff").innerHTML = availableDaysOff
    .toString()
    .padStart(2, "0");

  console.log("Total Working Days:", workingDays);
  console.log("Total Weekly Working Hours:", totalWorkingHours);
  console.log("Available Days Off:", availableDaysOff);
}

// Function to display weekly schedule in the table
function renderWeeklySchedule() {
  console.log("Weekly Schedule:", doctorWeeklySchedule);

  const tableBody = document.getElementById("weeklyScheduleTable");

  let output = "";

  for (let i = 0; i < doctorWeeklySchedule.length; i++) {
    const schedule = doctorWeeklySchedule[i];

    let statusClass = "";

    if (schedule.status === "Available") {
      statusClass = "available";
    } else {
      statusClass = "unavailable";
    }

    let workingTime = "--";

    if (schedule.status === "Available") {
      workingTime = schedule.startTime + " - " + schedule.endTime;
    }

    output +=
      "<tr>" +
      "<td><strong>" +
      schedule.day +
      "</strong></td>" +
      "<td>" +
      workingTime +
      "</td>" +
      "<td>" +
      schedule.breakTime +
      "</td>" +
      "<td>" +
      '<span class="schedule-status ' +
      statusClass +
      '">' +
      schedule.status +
      "</span>" +
      "</td>" +
      "</tr>";
  }

  tableBody.innerHTML = output;
}

// Function to display today's daily schedule
function renderTodaySchedule() {
  console.log("Daily Activities:", doctorDailyActivities);

  const today = getTodayName();

  const todayLabel = document.getElementById("todayDayLabel");

  const timeline = document.getElementById("todayTimeline");

  let selectedSchedule = null;

  // Find today's schedule
  for (let i = 0; i < doctorWeeklySchedule.length; i++) {
    if (doctorWeeklySchedule[i].day === today) {
      selectedSchedule = doctorWeeklySchedule[i];

      break;
    }
  }

  todayLabel.innerHTML = today;

  // Check whether today is a day off
  if (selectedSchedule === null || selectedSchedule.status === "Day Off") {
    timeline.innerHTML =
      '<div class="timeline-item">' +
      '<div class="timeline-time">Today</div>' +
      '<div class="timeline-content">' +
      "<h3>Day Off</h3>" +
      "<p>You do not have any scheduled working hours today.</p>" +
      '<span class="timeline-tag end-tag">Day Off</span>' +
      "</div>" +
      "</div>";

    return;
  }

  let activities = doctorDailyActivities;

  // Thursday has a different schedule
  if (today === "Thursday") {
    activities = thursdayActivities;
  }

  let output = "";

  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];

    output +=
      '<div class="timeline-item">' +
      '<div class="timeline-time">' +
      activity.time +
      "</div>" +
      '<div class="timeline-content">' +
      "<h3>" +
      activity.title +
      "</h3>" +
      "<p>" +
      activity.description +
      "</p>" +
      '<span class="timeline-tag ' +
      activity.className +
      '">' +
      activity.type +
      "</span>" +
      "</div>" +
      "</div>";
  }

  timeline.innerHTML = output;
}

// Function to initialize schedule page
function initializeDoctorSchedule() {
  renderScheduleStats();

  renderWeeklySchedule();

  renderTodaySchedule();
}

// Load schedule when page opens
initializeDoctorSchedule();
