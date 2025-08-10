const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const Booking = require('./models/booking');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


app.post('/api/book', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: 'Booking Confirmation - DriveNow',
      text: `Hi ${booking.name}, your booking for a ${booking.car} on ${booking.date} is confirmed.`
    });

    res.status(200).json({ message: 'Booking saved and email sent.' });
  } catch (error) {
    console.error('❌ Booking Error:', error);
    res.status(500).json({ message: 'Booking failed' });
  }
});


app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('❌ Fetch Bookings Error:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

app.post('/api/payment', async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    });

    res.status(200).json(order);
  } catch (error) {
    console.error('❌ Payment Error:', error);
    res.status(500).json({ message: 'Payment initiation failed' });
  }
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
