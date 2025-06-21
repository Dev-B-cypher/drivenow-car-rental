const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  car: String,
  amount: Number,
  status: {
    type: String,
    enum: ['pending', 'completed'], // ✅ enum must be inside an object with 'type'
    default: 'pending'
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
