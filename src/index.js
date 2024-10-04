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
const adminOrderRouters = require("./routes/adminOrderRoute");
const adminProductRouters = require("../src/routes/adminProductionRoutes");
const cartItemRouters = require("../src/routes/cartItemRoutes");
const cartRouters = require("../src/routes/cartRoute");
const orderRouters = require("../src/routes/orderRoute");
const productRouters = require("../src/routes/productRoute");
const ratingRouters = require("../src/routes/ratingRoute");
const reviewRouters = require("../src/routes/reviewRoute");

app.use("/auth", authRouters);
app.use("/user", userRouters);
app.use("/admin/orders", adminOrderRouters);
app.use("/admin/products", adminProductRouters);
app.use("/cartitem", cartItemRouters);
app.use("/order", orderRouters);
app.use("/products", productRouters);
app.use("/ratings", ratingRouters);
app.use("/review", reviewRouters);
app.use("/cart", cartRouters);

module.exports = app;
