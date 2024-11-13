const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Clothing = require('../models/Clothing');

const { sexes, sizesOptions, types} = require("./seedHelper");

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

const seedClothing = async() => {
  await Clothing.deleteMany({})

    for (let i = 0; i<30; i++) {
    // iterate over list of types and pick a random one
    // for each type, iterate over sizesoptions and pick one

    const type = getRandomItem(types);
    let size;

    if (type === 'top') {
      size = getRandomItem(sizesOptions.tShirtSizes)
    }
    if (type === 'trousers') {
      size = getRandomItem(sizesOptions.trousersSizes)
    }
    if (type === 'shoes') {
      size = getRandomItem(sizesOptions.shoeSizes)
    }

    const clothing = new Clothing({
      id: uuidv4(),
      type: type,
      size: size,
      sex: getRandomItem(sexes),
      price: 50,
      discountedPrice: 45
    })
    await clothing.save()
    console.log(clothing)
}
}

seedClothing().then(() => {
  mongoose.connection.close();
});
