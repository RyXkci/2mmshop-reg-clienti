const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AppSettingSchema = new Schema({
    promoDate: Date
})

module.exports = mongoose.model('AppSetting', AppSettingSchema);