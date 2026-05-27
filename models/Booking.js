const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email:        { type: String, required: true },
  phone:        { type: String, required: true },
  city:         { type: String, required: true },
  pickupDate:   { type: Date, required: true },
  pickupTime:   { type: String, required: true },
  duration:     { type: Number, required: true },
  vehicleType:  { type: String, required: true },
  requirements: { type: String },
  experience:   { type: String, default: 'Any' },
  status:       { type: String, default: 'Pending' },
  createdAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);