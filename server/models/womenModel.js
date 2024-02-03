const mongoose = require("mongoose");

const womenSchema = mongoose.Schema({
    brand: {type: String, required: true},
    category: {type: String, required: true},
    discount: {type: String, required: true},
    discounted_price: {type: String, required: true},
    id: {type: String, required: true},
    images: {type: Array, required: true},
    rating: {type: String, required: true},
    rating_count: {type: String, required: true},
    size: {type: Array, required: true},
    strike_price: {type: String, required: true},
    title: {type: String, required: true},  
},{
    versionKey: false
});

const WomenModel = mongoose.model("women", womenSchema);

module.exports = {
    WomenModel
};