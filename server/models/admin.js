const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const AdminSchema = new Schema({
    username: String,
    password: String,
  role: {
    type: String,
    required: true,
  },
});

 //Static login method
AdminSchema.statics.login = async function (username, password) {
    if (!username || !password) {
        throw new Error ("missing fields")
    };

     const admin = await this.findOne({username})

     if (!admin) {
        throw new Error ("not found");
     }

     const match = await bcrypt.compare(password, admin.password)

     if(!match) {
        throw new Error('incorrect')
     }

     return admin;
}


module.exports = mongoose.model('Admin', AdminSchema);