const express = require("express");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();



const {getClients, createClient} = require('../controllers/clientController');



// GET ALL CLIENTS
router.get('/', getClients) //requireAuth,

// POST NEW CLIENT
router.post('/', createClient)

module.exports = router;