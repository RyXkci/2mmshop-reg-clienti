const express = require("express");

const router = express.Router();

const {getClothing} = require('../controllers/clothingController');

// get all clothing

router.get('/', getClothing);

module.exports = router;