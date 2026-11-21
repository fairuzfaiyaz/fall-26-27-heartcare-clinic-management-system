/*
    File: doctor-dashboard-data.js
    Purpose: Store temporary Doctor Dashboard data.
*/

// Dashboard summary information
const doctorDashboardStats = {
  totalAppointments: 8,
  pendingPatients: 3,
  completedConsultations: 42,
  prescriptionsIssued: 36,
};

// Doctor appointment records
const doctorAppointments = [
  {
    patientName: "Fairuz Ahmed",
    patientId: "HC-P-00125",
    appointmentType: "Follow-up",
    date: "TODAY",
    startTime: "09:00 AM",
    endTime: "09:20 AM",
    status: "Confirmed",
  },

  {
    patientName: "Nusrat Jahan",
    patientId: "HC-P-00131",
    appointmentType: "General checkup",
    date: "TODAY",
    startTime: "09:30 AM",
    endTime: "09:50 AM",
    status: "Waiting",
  },

  {
    patientName: "Mahmud Hasan",
    patientId: "HC-P-00142",
    appointmentType: "Heart checkup",
    date: "TODAY",
    startTime: "10:00 AM",
    endTime: "10:20 AM",
    status: "Waiting",
  },
];
