const mongoose = require('mongoose');

  require('dotenv').config(); 
  const MONGO_URI = process.env.MONGO_URI;
  
  const connectDb = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB connected successfully!');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      process.exit(1); 
    }
  };
  
  module.exports = connectDb;
  