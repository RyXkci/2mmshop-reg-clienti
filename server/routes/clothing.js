const express = require("express");

const router = express.Router();
const multer = require('multer');
const upload = multer();
const {getClothing, postClothing} = require('../controllers/clothingController');

// get all clothing

router.get('/', getClothing);

router.post('/', upload.any(), postClothing);

module.exports = router;