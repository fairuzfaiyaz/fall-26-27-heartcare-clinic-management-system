/*
    File: doctor-schedule-data.js
    Purpose: Store doctor weekly schedule and daily activities.
*/

// Weekly schedule information
const doctorWeeklySchedule = [
  {
    day: "Saturday",
    startTime: "09:00 AM",
    endTime: "03:00 PM",
    breakTime: "12:00 PM - 12:30 PM",
    status: "Available",
    workingHours: 6,
  },

  {
    day: "Sunday",
    startTime: "09:00 AM",
    endTime: "03:00 PM",
    breakTime: "12:00 PM - 12:30 PM",
    status: "Available",
    workingHours: 6,
  },

  {
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "03:00 PM",
    breakTime: "12:00 PM - 12:30 PM",
    status: "Available",
    workingHours: 6,
  },

  {
    day: "Tuesday",
    startTime: "09:00 AM",
    endTime: "03:00 PM",
    breakTime: "12:00 PM - 12:30 PM",
    status: "Available",
    workingHours: 6,
  },

  {
    day: "Wednesday",
    startTime: "09:00 AM",
    endTime: "03:00 PM",
    breakTime: "12:00 PM - 12:30 PM",
    status: "Available",
    workingHours: 6,
  },

  {
    day: "Thursday",
    startTime: "09:00 AM",
    endTime: "01:00 PM",
    breakTime: "Not Scheduled",
    status: "Available",
    workingHours: 4,
  },

  {
    day: "Friday",
    startTime: "--",
    endTime: "--",
    breakTime: "--",
    status: "Day Off",
    workingHours: 0,
  },
];

// Daily schedule activities
const doctorDailyActivities = [
  {
    time: "09:00 AM",
    title: "Morning Consultation",
    description: "Patient appointments and general checkups.",
    type: "Consultation",
    className: "consultation-tag",
  },

  {
    time: "12:00 PM",
    title: "Lunch Break",
    description: "30 minutes break time.",
    type: "Break",
    className: "break-tag",
  },

  {
    time: "12:30 PM",
    title: "Afternoon Consultation",
    description: "Follow-up appointments and patient checkups.",
    type: "Consultation",
    className: "consultation-tag",
  },

  {
    time: "03:00 PM",
    title: "Working Hours End",
    description: "Today's scheduled working hours are completed.",
    type: "End Time",
    className: "end-tag",
  },
];

// Thursday schedule activities
const thursdayActivities = [
  {
    time: "09:00 AM",
    title: "Consultation Session",
    description: "Patient appointments and general checkups.",
    type: "Consultation",
    className: "consultation-tag",
  },

  {
    time: "01:00 PM",
    title: "Working Hours End",
    description: "Today's scheduled working hours are completed.",
    type: "End Time",
    className: "end-tag",
  },
];

// Today's appointment count
const todayAppointmentCount = 8;
