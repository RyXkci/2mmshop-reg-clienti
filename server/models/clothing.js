const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClothingSchema = new Schema({
    id: String,
    type: String,
    category: String,
    name: String,
    description: String,
    sizes: Array,
    sex: String,
    images: Object,
    price: Number,
    discountedPrice: Number
})

module.exports = mongoose.model('Clothing', ClothingSchema);