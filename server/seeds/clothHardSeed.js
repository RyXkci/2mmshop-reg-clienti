const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Clothing = require("../models/clothing");

const { sexes, sizesOptions, types } = require("./seedHelper");

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

mongoose
  .connect("mongodb://localhost:27017/2mmShop")
  .then(() => {
    console.log("MONGO CONNECTION OPENED!!!");
  })
  .catch((err) => {
    console.log("MONGO OH NO; ERROR", err);
  });

const seedClothing = async () => {
  for (let i = 0; i < 5; i++) {
    const clothing = new Clothing({
      id: uuidv4(),
      type: "top",
      size: "xs",
      sex: "f",
      price: 50,
      discountedPrice: 45,
    });

    await clothing.save();
    console.log(clothing);
  }
  for (let i = 0; i < 5; i++) {
    const clothing = new Clothing({
      id: uuidv4(),
      type: "trousers",
      size: 38,
      sex: "f",
      price: 50,
      discountedPrice: 45,
    });

    await clothing.save();
    console.log(clothing);
  }
  for (let i = 0; i < 5; i++) {
    const clothing = new Clothing({
      id: uuidv4(),
      type: "shoes",
      size: 37,
      sex: "f",
      price: 50,
      discountedPrice: 45,
    });

    await clothing.save();
    console.log(clothing);
  }
  for (let i = 0; i < 5; i++) {
    const clothing = new Clothing({
      id: uuidv4(),
      type: "top",
      size: 'l',
      sex: "m",
      price: 50,
      discountedPrice: 45,
    });

    await clothing.save();
    console.log(clothing);
  }
  for (let i = 0; i < 5; i++) {
    const clothing = new Clothing({
      id: uuidv4(),
      type: "trousers",
      size: 48,
      sex: "m",
      price: 50,
      discountedPrice: 45,
    });

    await clothing.save();
    console.log(clothing);
  }
  for (let i = 0; i < 5; i++) {
    const clothing = new Clothing({
      id: uuidv4(),
      type: "shoes",
      size: 42,
      sex: "m",
      price: 50,
      discountedPrice: 45,
    });

    await clothing.save();
    console.log(clothing);
  }
};

seedClothing().then(() => {
  mongoose.connection.close();
});
