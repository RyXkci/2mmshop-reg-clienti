const mongoose = require("mongoose");
const Client = require('../models/clients')
mongoose
  .connect("mongodb://localhost:27017/2mmShop")
  .then(() => {
    console.log("MONGO CONNECTION OPENED!!!");
  })
  .catch((err) => {
    console.log("MONGO OH NO; ERROR", err);
  });

const {names, surnames, sexes, sizesOptions} = require('./seedHelper');

// console.log(names, surnames, sexes, sizesOptions)


// Function to get a random item from an array
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }


  const seedDB = async() => {
    await Client.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const client = new Client({
            name: getRandomItem(names),
            surname: getRandomItem(surnames),
            sex: getRandomItem(sexes),
            number: 123456789,
            givenConsent: false,
            sizes: {
                tshirtSizes: getRandomItem(sizesOptions.tShirtSizes),
                trousersSizes: getRandomItem(sizesOptions.tShirtSizes),
                shoeSizes: getRandomItem(sizesOptions.tShirtSizes)
            },
            date: Date.now(),
        });
        await client.save();
        console.log(client)
    }
  };

  seedDB().then(() => {
    mongoose.connection.close();
  });
  
