const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  car: String,
  amount: Number,
  status: {
    type: String,
    enum: ['pending', 'completed'], 
    default: 'pending'
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
