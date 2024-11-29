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

  const postClothing = async(req, res) => {
    res.status(200)
    console.log(req.body, req.files)
  }

  module.exports = {getClothing, postClothing};