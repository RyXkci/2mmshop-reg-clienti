const mongoose = require("mongoose");
const Client = require('../models/clients')

// Get all clients
const getClients = async(req, res) => {
    const clients = await Client.find({}).sort({createdAt: -1});
    res.status(200).json(clients)
}


// Post new client


module.exports = {getClients}