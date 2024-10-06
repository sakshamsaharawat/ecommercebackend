const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    }],
    rating: {
        type: Number,
        required: true,
    },

}, { timestamps: true })
const Rating = mongoose.model("ratings", ratingSchema);
module.exports = Rating;