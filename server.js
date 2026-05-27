// ======================
// IMPORTS
// ======================
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();

// ======================
// MIDDLEWARE
// ======================

app.use(
cors({
origin: "https://hier-app.vercel.app",
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
credentials: true,
})
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/views',
  express.static(path.join(__dirname, 'views'))
);

app.use('/public',
  express.static(path.join(__dirname, 'public'))
);

// ======================
// MONGODB CONNECTION
// ======================

const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://anujkumar221203:AnujKumar9315266481@hier-major-project.7x8kzsj.mongodb.net/?appName=HIER-Major-Project";

console.log("Testing MongoDB connection...");

mongoose
  .connect(MONGO_URI, {
    connectTimeoutMS: 30000,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("✅ Connection successful!");
  })
  .catch((err) => {
    console.error("❌ Connection failed:", err.message);
  });

// ======================
// EMAIL TRANSPORTER
// ======================


const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 465,

  secure: true,

  auth: {

    user: process.env.SMTP_USER,

    pass: process.env.SMTP_PASS
  }
});

// Verify transporter configuration at startup so mail issues are visible early
transporter.verify().then(() => {
  console.log('✅ Mailer ready to send messages');
}).catch((err) => {
  console.error('❌ Mailer configuration error:', err);
});

// ======================
// CUSTOMER SCHEMA
// ======================

const customerSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  resetPasswordToken: String,

  resetPasswordExpires: Date

}, { timestamps: true });

const Customer =
  mongoose.model('Customer', customerSchema);

// ======================
// DRIVER SCHEMA
// ======================

const driverSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    required: true
  },

  licenseNumber: {
    type: String,
    required: true
  },

  experience: {
    type: Number,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  verified: {
    type: Boolean,
    default: false
  },

  password: {
    type: String,
    required: true
  },

  resetPasswordToken: String,

  resetPasswordExpires: Date

}, { timestamps: true });

const Driver =
  mongoose.model('Driver', driverSchema);

  
// ======================
// TBOOKING SCHEMA
// ======================

const bookingSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  phone: String,
  tripType: String,
  pickupLocation: String,
  dropLocation: String,
  travelDate: String,
  travelTime: String,
  specialInstructions: String
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

// ======================
// TEST ROUTE
// ======================

app.get('/api/test', (req, res) => {

  res.json({
    success: true,
    message: 'API Working'
  });
});

// ======================
// CUSTOMER REGISTER
// ======================

app.post('/register-customer', async (req, res) => {

  try {

    const {
      fullName,
      email,
      phone,
      password
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        error: 'All fields required'
      });
    }

    const existingCustomer =
      await Customer.findOne({ email });

    if (existingCustomer) {

      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const customer = new Customer({

      fullName,
      email,
      phone,
      password: hashedPassword
    });

    await customer.save();

    // Email
    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Welcome to HIER',
        text: `Hello ${fullName},

Your customer account was created successfully.

- HIER Team`
      });
      console.log('Email sent:', info.response);
    } catch (emailErr) {
      console.error('Email send error (customer):', emailErr);
    }

    res.status(201).json({
      success: true,
      message: 'Customer Registered'
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// ======================
// CUSTOMER LOGIN
// ======================

app.post('/login-customer', async (req, res) => {

  try {

    const { email, password } = req.body;

    const customer =
      await Customer.findOne({ email });

    if (!customer) {

      return res.status(401).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        customer.password
      );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    res.json({

      success: true,

      customer: {

        fullName: customer.fullName,

        email: customer.email,

        phone: customer.phone
      }
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// ======================
// DRIVER REGISTER
// ======================

app.post('/register-driver', async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      licenseNumber,
      experience,
      city,
      password
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !licenseNumber ||
      !experience ||
      !city ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        error: 'All fields required'
      });
    }

    const existingDriver =
      await Driver.findOne({ email });

    if (existingDriver) {

      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const driver = new Driver({

      name,
      email,
      phone,
      licenseNumber,
      experience,
      city,
      password: hashedPassword
    });

    await driver.save();

    // Email
    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Driver Registration Successful',
        text: `Hello ${name},

Your driver account was created successfully.

- HIER Team`
      });
      console.log('Email sent:', info.response);
    } catch (emailErr) {
      console.error('Email send error (driver):', emailErr);
    }

    res.status(201).json({
      success: true,
      message: 'Driver Registered'
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// ======================
// DRIVER LOGIN
// ======================

app.post('/login-driver', async (req, res) => {

  try {

    const { email, password } = req.body;

    const driver =
      await Driver.findOne({ email });

    if (!driver) {

      return res.status(401).json({
        success: false,
        message: 'Driver not found'
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        driver.password
      );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    res.json({

      success: true,

      driver: {

        name: driver.name,

        email: driver.email,

        phone: driver.phone,

        city: driver.city,

        verified: driver.verified
      }
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// ======================
// BOOK DRIVER
// ======================

app.post('/book-driver', async (req, res) => {

  try {

    const payload = req.body || {};

    const requiredFields = [
      'customerName',
      'customerEmail',
      'phone',
      'tripType',
      'pickupLocation',
      'dropLocation',
      'travelDate',
      'travelTime'
    ];

    const missingFields = requiredFields.filter(field => !payload[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const booking = {
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      phone: payload.phone,
      tripType: payload.tripType,
      pickupLocation: payload.pickupLocation,
      dropLocation: payload.dropLocation,
      travelDate: payload.travelDate,
      travelTime: payload.travelTime,
      specialInstructions: payload.specialInstructions || '',
      createdAt: new Date()
    };

    const db = mongoose.connection.client.db('hierDB');
    const result = await db.collection('bookings').insertOne(booking);

    res.json({
      success: true,
      message: 'Booking Successful',
      booking: {
        ...booking,
        _id: result.insertedId
      }
    });

  } catch (err) {

    console.error('BOOKING ERROR:', err);

    res.status(500).json({
      success: false,
      message: 'Booking Failed'
    });
  }
});

// ======================
// FORGOT PASSWORD
// CUSTOMER
// ======================

app.post('/forgot-password-customer',
async (req, res) => {

  try {

    const { email } = req.body;

    const customer =
      await Customer.findOne({ email });

    if (!customer) {

      return res.json({
        success: true,
        message:
        'If email exists, reset link sent'
      });
    }

    const token =
      crypto.randomBytes(32).toString('hex');

    customer.resetPasswordToken = token;

    customer.resetPasswordExpires =
      Date.now() + 15 * 60 * 1000;

    await customer.save();

    const resetLink =
      `http://localhost:3000/reset-password-customer/${token}`;

    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Reset Password',
        text: `Reset your password:

${resetLink}`
      });
      console.log('Email sent (reset):', info.response);
    } catch (emailErr) {
      console.error('Email send error (reset):', emailErr);
    }

    res.json({
      success: true,
      message: 'Reset link sent'
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// Get recent bookings (for drivers)
app.get('/recent-bookings', async (req, res) => {
  try {
    const db = mongoose.connection.client.db('hierDB');
    const bookings = await db
      .collection('bookings')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    res.json({
      success: true,
      bookings: bookings.map(booking => ({
        ...booking,
        _id: booking._id.toString()
      }))
    });
  } catch (err) {
    console.error('RECENT BOOKINGS ERROR:', err);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
});


// ======================
// ROOT ROUTE
// ======================

app.get('/', (req, res) => {

  res.sendFile(
    path.join(__dirname, 'views', 'index.html')
  );
});

// ======================
// GLOBAL ERROR HANDLER
// ======================

process.on('uncaughtException', (err) => {

  console.log(
    'UNCAUGHT EXCEPTION:',
    err
  );
});

process.on('unhandledRejection', (err) => {

  console.log(
    'UNHANDLED REJECTION:',
    err
  );
});

// ======================
// SERVER START
// ======================

const PORT = 3000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});
