const express = require("express");

const router = express.Router();

const multer = require('multer');
const {cloudinary, storage} = require('../cloudinary');
const upload = multer({storage});
const {getClothing, getSingleClothing, postClothing, deleteClothing, deleteSingleClothing} = require('../controllers/clothingController');

// get all clothing

router.get('/', getClothing);

// get single clothing
router.get('/:id', getSingleClothing)


//  post clothing

router.post('/', upload.any(), postClothing);


//delete clothing
router.post('/delete', upload.any(), deleteClothing);

//delete single clothing
router.post('/delete/:id', deleteSingleClothing);

module.exports = router;