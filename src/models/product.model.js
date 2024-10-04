const mongoose = require("mongoose");
const Category = require("./category.model");

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    discountedPercent: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sizes: [{
        name: { type: String },
        quantity: { type: Number }
    }],
    imageUrl:{
        type:String,
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
    }],
    numRatings:{
        type:String,
        default:0
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories'
    },
    
},{timestamps:true})
const Product = mongoose.model("product", productSchema);
module.exports = Product;