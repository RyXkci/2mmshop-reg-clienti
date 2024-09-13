const express = require("express");
const router = express.Router();

const {getClients} = require('../controllers/clientController')

// GET ALL CLIENTS
router.get('/', getClients)

// POST NEW CLIENT
router.post('/', (req, res) => {
    res.json({mssg: "Post new client"})
})

module.exports = router