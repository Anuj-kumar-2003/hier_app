const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, // hashed
  licenseNumber: { type: String, required: true },
  licenseExpiry: { type: Date, required: true },
  experience: { type: Number, min: 1 }, // must have at least 1 year
  idProof: { type: String }, // Aadhaar/PAN etc.
  policeVerification: { type: Boolean, default: false },
  vehicleDocs: {
    rc: String,
    insurance: String,
    puc: String
  },
  verified: { type: Boolean, default: false }, // ✅ admin sets true after checks
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }

});

module.exports = mongoose.model('Driver', driverSchema);
