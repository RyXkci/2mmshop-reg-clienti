const mongoose = require("mongoose");
const Clothing = require("../models/clothing");

// get all clothing

const getClothing = async (req, res) => {
  try {
    const clothing = await Clothing.find({});
    res.status(200).json(clothing);
  } catch (error) {
    res.sendStatus(500);
  }
};

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

const postClothing = async (req, res, next) => {
  console.log("BEGINNING OF CONTROLLER", req.body.clothing);

  try {
    // Parse the nested fields
    const clothing = req.body.clothing; // Parse from FormData JSON
    console.log("CLOTHING IS", typeof(clothing), clothing)
    const files = req.files;
    console.log("IMAGES ARE:", files)

    // Map files to their respective clothing items

   

    const structuredClothing = clothing.map((item, index) => {

      const featuredImage = files.find(
        (file) => file.fieldname === `clothing[${index}][images][featured]`
      );
      const detailsImages = files
        .filter((file) => file.fieldname === `clothing[${index}][images][details]`)
        .map((im) => ({ url: im.path, filename: im.filename }));
      // console.log(itemImages)

      return {
        ...item,
        images: {
          featured: featuredImage ? { url: featuredImage.path, filename: featuredImage.filename } : null,
          details: detailsImages,
        },
      };
    });

    // console.log('Structured Clothing:', structuredClothing);
    // structuredClothing.forEach((item, index) => {
    //   console.log("ITEM IMAGES ARE", item.images)
    // })

    structuredClothing.forEach((item, index) => {
      console.log(`CLOTHING ${index + 1} is`, item);
      console.log(`CLOTHING ${index + 1} IMAGES ARE`, item.images);
    });

    const savedClothing = await Clothing.insertMany(structuredClothing);

    res
      .status(200)
      .json({
        message: "Clothing uploaded successfully",
        data: savedClothing
      });
  } catch (error) {
    console.error("Error processing clothing:", error);
    res.status(500).json({ error: "Failed to upload clothing" });
  }
};

module.exports = { getClothing, getSingleClothing, postClothing };
