const express = require("express");
const router = express.Router();

const {getClients, createClient} = require('../controllers/clientController')

// GET ALL CLIENTS
router.get('/', getClients)

// POST NEW CLIENT
router.post('/', createClient)

module.exports = router;