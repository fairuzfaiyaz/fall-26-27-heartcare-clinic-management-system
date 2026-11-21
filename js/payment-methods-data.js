// payment-methods-data.js

// Stores the logged-in patient's saved payment methods.
// Later: SELECT from the payment_methods table.

const paymentMethods = [
  {
    id: 1,
    nickname: "Personal Card",
    brand: "Visa",
    last4: "4242",
    isPrimary: true,
  },

  {
    id: 2,
    nickname: "Mastercard",
    brand: "Mastercard",
    last4: "1881",
    isPrimary: false,
  },

  {
    id: 3,
    nickname: "Backup Visa",
    brand: "Visa",
    last4: "7391",
    isPrimary: false,
  },

  {
    id: 4,
    nickname: "Family Card",
    brand: "Mastercard",
    last4: "5628",
    isPrimary: false,
  },

  {
    id: 5,
    nickname: "Travel Card",
    brand: "Visa",
    last4: "9017",
    isPrimary: false,
  },

  {
    id: 6,
    nickname: "Online Payments",
    brand: "Mastercard",
    last4: "3146",
    isPrimary: false,
  },

  {
    id: 7,
    nickname: "Personal Debit",
    brand: "Visa",
    last4: "8273",
    isPrimary: false,
  },

  {
    id: 8,
    nickname: "Savings Card",
    brand: "Mastercard",
    last4: "6509",
    isPrimary: false,
  },

  {
    id: 9,
    nickname: "Backup Mastercard",
    brand: "Mastercard",
    last4: "4925",
    isPrimary: false,
  },

  {
    id: 10,
    nickname: "Emergency Card",
    brand: "Visa",
    last4: "1764",
    isPrimary: false,
  },
];

// Stores the next payment method ID.
let nextPaymentId = 11;
