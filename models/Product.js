const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    description: String,
    price: Number,
    img: String,
    tracking_info: Array
})

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;