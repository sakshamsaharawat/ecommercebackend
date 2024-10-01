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

const authRouters = require("./routes/authRoute");
const userRouters = require("./routes/userRoute");
app.use("/auth", authRouters);
app.use("/user", userRouters);



module.exports = app;
