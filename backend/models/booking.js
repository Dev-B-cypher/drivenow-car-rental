const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  car: { type: String, required: true }
}, { timestamps: true });
paymentStatus: {
  type: String,
  enum: ['pending', 'completed'],
  default: 'pending'
}


module.exports = mongoose.model('Booking', bookingSchema);


