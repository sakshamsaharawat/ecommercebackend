const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    review: {
        type: String,
        required: true
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
}, { timestamps: true })
const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;