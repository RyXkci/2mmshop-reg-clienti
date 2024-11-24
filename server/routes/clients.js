const express = require("express");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();



const {getClients, getClient, createClient} = require('../controllers/clientController');



// GET ALL CLIENTS
router.get('/', getClients) //requireAuth,

router.get('/:id', getClient)

// POST NEW CLIENT
router.post('/', createClient)

module.exports = router;