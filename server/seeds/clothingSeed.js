const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Clothing = require('../models/clothing');

const { sexes, sizesOptions, types, categories} = require("./seedHelper");

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const arrPusher = (arr) => {
    //random idx
    //random number between 1 and 3
    //loop random number amount of times between 1 and 3 and pick out a random idx from arr
    const numTimes = () => Math.floor(Math.random() * 5) + 1;
    const randomIdx = () => Math.floor(Math.random() * arr.length);
    const newArr = [];
    for (let i = 0; i < numTimes(); i++) {
      newArr.push(arr[randomIdx()]);
    }
    return newArr;
  };
  



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
    let sizes;
    let category;

    if (type === 'top') {
      sizes = arrPusher(sizesOptions.top);
      category = getRandomItem(categories.top)
    }
    if (type === 'trousers') {
      sizes = arrPusher(sizesOptions.trousersSizes);
      category = getRandomItem(categories.middle);
    }
    if (type === 'shoes') {
      sizes = arrPusher(sizesOptions.shoeSizes);
      category = getRandomItem(categories.shoe)
    }

    const clothing = new Clothing({
      id: uuidv4(),
      type: type,
      description: "Facilisis rutrum purus hendrerit enim phasellus condimentum tempus quis congue varius bibendum leo fusce gravida arcu sollicitudin maecenas fusce nec bibendum bibendum facilisis morbi nisi.",
      category: category,
      sizes: sizes,
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
