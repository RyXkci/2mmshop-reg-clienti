const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Clothing = require("../models/clothing");

const {
  sexes,
  sizesOptions,
  types,
  categories,
  clothesNames,
} = require("./seedHelper");

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

const imagesArrays = {
  tops: [
    {
      featured:
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133718/2mmTest/gm-top-1_svf1n4.jpg",
      details: [
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133717/2mmTest/gm-top-1-1_oexjql.jpg",
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133714/2mmTest/gm-top-1-2_ntrant.jpg",
      ],
    },
    {
      featured:
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133712/2mmTest/gm-top-3_qiedu1.jpg",
      details: [
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133705/2mmTest/gm-top-3-1_k3weu5.jpg",
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133701/2mmTest/gm-top-3-2_mpzbgz.jpg",
      ],
    },
    {
      featured:
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133718/2mmTest/gm-top-2_swefxf.jpg",
      details: [
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133711/2mmTest/gm-top-2-1_spgubr.jpg",
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133709/2mmTest/gm-top-2-2_jcfipq.jpg",
      ],
    },
  ],
  jeans: [
    {
      featured:
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133723/2mmTest/gm-jeans-1_bdv2v7.jpg",
      details: [
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133731/2mmTest/gm-jeans-1-1_yziokm.jpg",
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133720/2mmTest/gm-jeans-1-2_fueb3w.jpg",
      ],
    },
  ],
  accessories: [
    {
      featured:
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133734/2mmTest/hat-1_ysobry.jpg",
      details: [
        "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1737133731/2mmTest/hat-2_jttbid.jpg",
      ],
    },
  ],
};

const selectClothesImages = (arr) => {
  const randomIdx = () => Math.floor(Math.random() * arr.length);
  console.log(randomIdx);
  // console.log(arr[randomIdx()]);
  return arr[randomIdx()];
};
// const imagesArrays = {
//   top1: {
//     featured: "",
//     details: ""
//   },
//   top2: {
//     featured: "",
//     details: ""
//   },
//   top3: {
//     featured: "",
//     details: ""
//   },
//   jeans1: {
//     featured: "",
//     details: ""
//   }
// }

mongoose
  .connect("mongodb://localhost:27017/2mmShop")
  .then(() => {
    console.log("MONGO CONNECTION OPENED!!!");
  })
  .catch((err) => {
    console.log("MONGO OH NO; ERROR", err);
  });

const seedClothing = async () => {
  await Clothing.deleteMany({});

  for (let i = 0; i < 50; i++) {
    // iterate over list of types and pick a random one
    // for each type, iterate over sizesoptions and pick one

    const type = getRandomItem(types);
    let sizes;
    let category;
    let name;

    if (type === "top") {
      sizes = arrPusher(sizesOptions.topSizes);
      category = getRandomItem(categories.top);
      name = getRandomItem(clothesNames.top);
      //Randomly selecting from image types
     const selectedImages = selectClothesImages(imagesArrays.tops)
     images= {
      featured: selectedImages.featured,
      details: selectedImages.details
     }
    }
    if (type === "trousers") {
      sizes = arrPusher(sizesOptions.trousersSizes);
      category = getRandomItem(categories.middle);
      name = getRandomItem(clothesNames.trousers);
      const selectedImages = selectClothesImages(imagesArrays.jeans)
     images= {
      featured: selectedImages.featured,
      details: selectedImages.details
     }
    }
    if (type === "shoes") {
      sizes = arrPusher(sizesOptions.shoeSizes);
      category = getRandomItem(categories.shoe);
      name = getRandomItem(clothesNames.shoes);
      const selectedImages = selectClothesImages(imagesArrays.accessories)
     images= {
      featured: selectedImages.featured,
      details: selectedImages.details
     }
    }
    if (type === "accessory") {
      (sizes = ["all"]),
        (category = getRandomItem(categories.accessory)),
        (name = getRandomItem(clothesNames.accessories));
        const selectedImages = selectClothesImages(imagesArrays.accessories)
     images= {
      featured: selectedImages.featured,
      details: selectedImages.details
     }
    }

    const clothing = new Clothing({
      id: uuidv4(),
      type: type,
      description:
        "Facilisis rutrum purus hendrerit enim phasellus condimentum tempus quis congue varius bibendum leo fusce gravida arcu sollicitudin maecenas fusce nec bibendum bibendum facilisis morbi nisi.",
      category: category,
      name: name,
      sizes: sizes,
      sex: getRandomItem(sexes),
      images: images,
      price: 50,
      discountedPrice: 45,
    });
    await clothing.save();
    console.log(clothing);
  }
};

selectClothesImages(imagesArrays.tops);

seedClothing().then(() => {
  mongoose.connection.close();
});
