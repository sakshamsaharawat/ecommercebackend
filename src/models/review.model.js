const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({

    review: {
        type: String,
        required: true
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
}, { timestamps: true })
const Rating = mongoose.model("ratings", ratingSchema);
module.exports = Rating;