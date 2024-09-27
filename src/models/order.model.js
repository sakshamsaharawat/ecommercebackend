const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems",
    }],
    orderDate: {
        type: String,
        required: true,
        default: Date.now()
    },
    deliveryDate: {
        type: Date
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses",
    },
    paymentDetails: {

        paymentMethod: {
            type: String
        },
        transactionId: {
            type: Number,
        },
        paymentId: {
            type: Number,
        },
        paymentStatus: {
            type: String,
        },
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    totalDiscountedPrice: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,

    },
    orderStatus: {
        type: String,
        required: true,
        default: "PENDING"
    },
    totaltem: {
        type: String,
        required: true,
    },
}, { timestamps: true })
const Order = mongoose.model("orders", orderSchema);
module.exports = Order;