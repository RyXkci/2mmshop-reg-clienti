const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClothingSchema = new Schema({
    id: String,
    type: String,
    size: mongoose.Schema.Types.Mixed,
    sex: String,
    price: Number,
    discountedPrice: Number
})

module.exports = mongoose.model('Clothing', ClothingSchema);