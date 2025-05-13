const express = require("express");

const router = express.Router();

const {getDate} = require('../controllers/settingsController');

router.get('/', getDate)

module.exports = router;