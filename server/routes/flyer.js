const express = require("express");

const router = express.Router();

const multer = require('multer');
const {cloudinary, flyerStorage} = require('../cloudinary');
const upload = multer({storage: flyerStorage});

const {postFlyer} = require('../controllers/flyerController');

// post flyer

router.post('/', upload.single('flyerImage'), postFlyer);

module.exports = router;
