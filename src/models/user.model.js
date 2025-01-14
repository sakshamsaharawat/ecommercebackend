const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["CUSTOMER", "ADMIN"],  // Defines allowed roles
        default: "CUSTOMER"           // Sets default role to CUSTOMER
    },
    mobile: {
        type: String,
        // required: true
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses"
    }],
    payementInformation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "payment_information"
        }
    ],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }

})
const User = mongoose.model("users", userSchema);
module.exports = User;