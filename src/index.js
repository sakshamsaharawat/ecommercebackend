const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db'); 
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// Connect to MongoDB
connectDb();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
