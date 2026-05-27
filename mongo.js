// mongo.js
const mongoose = require('mongoose');

// MongoDB connection URI
const MONGO_URI = 'mongodb://127.0.0.1:27017/hierDB'; 


// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit process if connection fails
  }
};



module.exports = connectDB;
