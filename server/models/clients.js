const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    sex: String,
    phoneNumber: String,
    dateOfBirth: Date,
    sizes: {
        tshirtSize: String,
        trouserSize: Number,
        shoeSize: Number,
    },
    givenConsent: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

module.exports = mongoose.model('Client', ClientSchema);