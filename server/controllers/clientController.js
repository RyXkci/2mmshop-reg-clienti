const mongoose = require("mongoose");
const Client = require('../models/clients')

// Get all clients
const getClients = async(req, res) => {
    try {
        const clients = await Client.find({}).sort({createdAt: -1});
        res.status(200).json(clients)
    } catch (error) {
        res.sendStatus(500)
    }
  
 
}


// Post new client
const createClient = async(req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
  
}

module.exports = {getClients, createClient};