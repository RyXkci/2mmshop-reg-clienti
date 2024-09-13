const express = require("express");
const router = express.Router();


// GET ALL CLIENTS
router.get('/', (req, res) => {
    res.json({mssg: "this is where the clients will come from"})
})

// POST NEW CLIENT
router.post('/', (req, res) => {
    res.json({mssg: "Post new client"})
})

module.exports = router