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

  const postClothing = async (req, res, next) => {
    
// const clothing = req.body.clothing;
// console.log("CLOTHING IS", clothing)

    try {
      // Parse the nested fields
      const clothing = req.body.clothing; // Parse from FormData JSON
      console.log("CLOTHING IS", typeof(clothing), clothing)
      const files = req.files;
  console.log("IMAGES ARE:", files)
      // Map files to their respective clothing items
      const structuredClothing = clothing.map((item, index) => {
        const itemImages = files.filter(
          (file) => file.fieldname === `clothing[${index}][images]`
        ).map((im) => ({url: im.path, filename: im.filename}))
        // console.log(itemImages)
  
        return {
          ...item,
          images: itemImages,
        };
      });

      // console.log('Structured Clothing:', structuredClothing);
      // structuredClothing.forEach((item, index) => {
      //   console.log("ITEM IMAGES ARE", item.images)
      // })

      structuredClothing.forEach((item, index) => {
             console.log(`CLOTHING ${index + 1} is`, item)
             console.log(`CLOTHING ${index +1} IMAGES ARE`, item.images)
           })
  
      // Respond with success
      res.status(200).json({ message: 'Clothing uploaded successfully', data: structuredClothing });
    } catch (error) {
      console.error('Error processing clothing:', error);
      res.status(500).json({ error: 'Failed to upload clothing' });
    }
  };

  module.exports = {getClothing, postClothing};