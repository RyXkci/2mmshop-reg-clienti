const mongoose = require("mongoose");
const Client = require("../models/clients");
const Joi = require("joi");


// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({}).sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error) {
    res.sendStatus(500);
  }
};

// Post new client
const createClient = async (req, res) => {
  const clientSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    sex: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    sizes: Joi.object({
      tshirtSize: Joi.string().required(),
      trouserSize: Joi.number().required(),
      shoeSize: Joi.number().required(),
    }).required(),
    givenConsent: Joi.boolean().required(),
  });
  const result = clientSchema.validate(req.body);
  if (result.error) {
    console.log(result.error)
    return res.status(400).json(result.error);
  }
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getClients, createClient };
