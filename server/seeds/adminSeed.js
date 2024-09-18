const bcrypt = require('bcrypt');

const mongoose = require("mongoose");
const Admin = require("../models/admin");

mongoose
  .connect("mongodb://localhost:27017/2mmShop")
  .then(() => {
    console.log("MONGO CONNECTION OPENED!!!");
  })
  .catch((err) => {
    console.log("MONGO OH NO; ERROR", err);
  });

  const createAdmin = async (username, password) => {
    const userName = username;
    const initialPassword = password;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(initialPassword, salt);

    const registeredAdmin = new Admin({username, password: hash, role: 'admin'});
    await registeredAdmin.save()
}


const seedAdmin = async () => {
  await Admin.deleteMany({});

await createAdmin("Ricky Bozzi", "praisethesun");
await createAdmin("Giordano Manfredi", "testing");



};

seedAdmin().then(() => {
    mongoose.connection.close();
  });
  
