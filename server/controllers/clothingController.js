const mongoose = require("mongoose");
const Clothing = require("../models/clothing");

const {cloudinary, storage} = require('../cloudinary');

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

const deleteClothing = async (req, res, next) => {

  try {
    // Fetch all clothing items from the database
    const allClothingItems = await Clothing.find({});

    if (allClothingItems.length === 0) {
      return res.status(404).json({ message: 'No clothing items found to delete.' });
    }

    // Iterate through each clothing item and delete the associated images from Cloudinary
    for (const clothingItem of allClothingItems) {
      const { featured, details } = clothingItem.images || {};

      // Delete featured image if it exists
      if (featured && featured.filename) {
        await cloudinary.uploader.destroy(featured.filename); // Delete the featured image from Cloudinary
        console.log(`Deleted featured image: ${featured.filename}`);
      }

      // Delete all detail images if they exist
      if (details && Array.isArray(details)) {
        for (const detail of details) {
          if (detail.filename) {
            await cloudinary.uploader.destroy(detail.filename); // Delete each detail image from Cloudinary
            console.log(`Deleted detail image: ${detail.filename}`);
          }
        }
      }

      // Delete the clothing item from MongoDB after deleting images
      await Clothing.findByIdAndDelete(clothingItem._id);
      console.log(`Deleted clothing item with ID: ${clothingItem._id}`);
    }

    // Respond with a success message
    return res.status(200).json({ message: 'All clothing items and their images have been deleted successfully.' });

  } catch (err) {
    console.error('Error deleting clothing items and images:', err);
    return res.status(500).json({ message: 'Error deleting clothing items and images', error: err.message });
  }
}


  


module.exports = { getClothing, getSingleClothing, postClothing, deleteClothing };
