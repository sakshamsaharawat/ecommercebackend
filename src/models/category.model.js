const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        
    },
    parentCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    }],
    level: {
        type:Number,
        required: true,
    },
});
const Category = mongoose.model("categories", categorySchema);
module.exports = Category;


// how above level is defined 
// level 1 = Men/ women
// level 2 = Cloths
// level 3 = kurta