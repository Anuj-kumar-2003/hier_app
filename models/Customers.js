const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // always store hashed
  phone: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },

  // 🔑 Forgot Password fields
  resetPasswordToken: { type: String },       // random string
  resetPasswordExpires: { type: Date }        // expiry time (e.g. 15 min)
});

module.exports = mongoose.model('Customer', customerSchema);
