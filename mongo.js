// mongo.js
const mongoose = require('mongoose');

// MongoDB connection URI
const MONGO_URI = 'mongodb+srv://anujkumar221203:KjAgEMd2wpHX3tm2@hier-major-project.7x8kzsj.mongodb.net/?appName=HIER-Major-Project'; 


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
