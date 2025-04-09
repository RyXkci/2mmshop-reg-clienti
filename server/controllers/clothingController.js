const mongoose = require("mongoose");
const Clothing = require("../models/clothing");

const { v4: uuidv4 } = require('uuid');

// get all clothing

const getClothing = async (req, res) => {
  try {
    const clothing = await Clothing.find({});
    res.status(200).json(clothing);
  } catch (error) {
    res.sendStatus(500);
  }
};

// get single clothing

const getSingleClothing = async(req, res) => {
  const {id} = req.params
  try {
    const cloth = await Clothing.findById(id)
    console.log(cloth)
    res.status(200).json(cloth)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

// post clothing

const postClothing = async (req, res, next) => {

  const clothes = req.body;
  const clothesImages = req.files
  console.log("BEGINNING OF CONTROLLER", clothes);
  console.log("BEGINNING OF CONTROLLER FILES:", clothesImages);

  const featuredImage = clothesImages.find(
    (file) => file.fieldname === 'featured'
  );

  console.log("FEATURED IMAGE IS:", featuredImage);

  const detailsImages = clothesImages
  .filter((file) => file.fieldname === 'details');

  console.log("DETAILS IMAGES ARE", detailsImages);

   try {
    
      const newClothes = new Clothing({
        id: uuidv4(),
        images: {
          featured: featuredImage ? { url: featuredImage.path, filename: featuredImage.filename } : null,
          details: detailsImages.map((im) => ({ url: im.path, filename: im.filename }))
        },
        ...req.body
      });
      await newClothes.save();
      res.status(200).json(newClothes);
      console.log(newClothes)
    } catch (error) {
      console.log({error})
      res.status(500).json({ error: error.message });
      console.log(error)
    }

 

};

module.exports = { getClothing, getSingleClothing, postClothing };
