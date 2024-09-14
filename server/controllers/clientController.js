const mongoose = require("mongoose");
const Client = require('../models/clients')

// Get all clients
const getClients = async(req, res) => {
    const clients = await Client.find({}).sort({createdAt: -1});
    res.status(200).json(clients)
}


// Post new client
const createClient = async(req, res) => {
    const client = new Client(req.body);
    await client.save();
    res.status(200).json(client)
}

module.exports = {getClients, createClient};