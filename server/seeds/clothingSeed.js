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
      featured: {
        url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598905/2mmTest/gm-top-1_jewmjp.jpg",
        filename: "gm-top-1_jewmjp",
      },
      details: [
        {
          url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598904/2mmTest/gm-top-1-1_zsgg0z.jpg",
          filename: "test2",
        },
        {
          url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598901/2mmTest/gm-top-1-2_xvhx8m.jpg",
          filename: "test3",
        },
      ],
    },
    {
      featured: {
        url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598901/2mmTest/gm-top-3_wztkeb.jpg",
        filename: "test4",
      },
      details: [
        {
          url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598899/2mmTest/gm-top-3-1_rpa2le.jpg",
          filename: "test5",
        },
        {
          url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598898/2mmTest/gm-top-3-2_m0te3z.jpg",
          filename: "test6",
        },
      ],
    },
    {
      featured: {
        url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598901/2mmTest/gm-top-2_smup8v.jpg",
        filename: "test7",
      },
      details: [
        {
          url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598902/2mmTest/gm-top-2-2_hh7mil.jpg",
          filename: "test8",
        },
        {
          url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598901/2mmTest/gm-top-2-1_dript0.jpg",
          filename: "test8"
        },
      ],
    },
  ],
  jeans: [
    {
      featured: {
        url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598906/2mmTest/gm-jeans-1_axtcxt.jpg",
        filename: "test9"
      },
      details: [
        {
          url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598908/2mmTest/gm-jeans-1-2_meauqc.jpg",
          filename: "test10"
        },
        {
          url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738598907/2mmTest/gm-jeans-1-1_whi9xv.jpg",
          filename: "test10"
        }
      ],
    },
  ],
  accessories: [
    {
      featured: {
        url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738599788/2mmTest/hat-1_fr2cn5.jpg",
        filename: "test11"
      },
      details: [{
        url: "https://res.cloudinary.com/dkhzi5hj9/image/upload/v1738599784/2mmTest/hat-2_indazc.jpg",
        filename: "test12"
      }],
    },
  ],
};

const selectClothesImages = (arr) => {
  const randomIdx = () => Math.floor(Math.random() * arr.length);
  console.log(randomIdx);
  // console.log(arr[randomIdx()]);
  return arr[randomIdx()];
};


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
      const selectedImages = selectClothesImages(imagesArrays.tops);
      console.log(selectedImages)
      images = {
        featured: selectedImages.featured,
        details: selectedImages.details,
      };
    }
    if (type === "trousers") {
      sizes = arrPusher(sizesOptions.trousersSizes);
      category = getRandomItem(categories.middle);
      name = getRandomItem(clothesNames.trousers);
      const selectedImages = selectClothesImages(imagesArrays.jeans);
      images = {
        featured: selectedImages.featured,
        details: selectedImages.details,
      };
    }
    if (type === "shoes") {
      sizes = arrPusher(sizesOptions.shoeSizes);
      category = getRandomItem(categories.shoe);
      name = getRandomItem(clothesNames.shoes);
      const selectedImages = selectClothesImages(imagesArrays.accessories);
      images = {
        featured: selectedImages.featured,
        details: selectedImages.details,
      };
    }
    if (type === "accessory") {
      (sizes = ["all"]),
        (category = getRandomItem(categories.accessory)),
        (name = getRandomItem(clothesNames.accessories));
      const selectedImages = selectClothesImages(imagesArrays.accessories);
      images = {
        featured: selectedImages.featured,
        details: selectedImages.details,
      };
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
