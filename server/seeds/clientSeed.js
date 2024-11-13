const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Client = require('../models/clients');

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


  const seedClient = async() => {
    await Client.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const client = new Client({
          id: uuidv4(),
            firstName: getRandomItem(names),
            lastName: getRandomItem(surnames),
            sex: getRandomItem(sexes),
            phoneNumber: "+39123456789",
            givenConsent: false,
            sizes: {
                tshirtSize: getRandomItem(sizesOptions.tShirtSizes),
                trouserSize: getRandomItem(sizesOptions.trousersSizes),
                shoeSize: getRandomItem(sizesOptions.shoeSizes)
            },
            date: Date.now(),
        });
        await client.save();
        console.log(client)
    }
  };

  seedClient().then(() => {
    mongoose.connection.close();
  });
  

