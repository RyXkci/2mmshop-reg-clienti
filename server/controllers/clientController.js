const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
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
    phoneNumber: Joi.string().required(),
    dateOfBirth: Joi.date()
    .iso() // Validates an ISO 8601 date format (like yyyy-mm-dd)
    .max('now') // Ensures the date is not in the future
    .messages({
      'date.base': 'Date of Birth must be a valid date',
      'date.format': 'Date of Birth must be in yyyy-mm-dd format',
      'date.max': 'Date of Birth cannot be in the future',
    })
    .required(),
    sizes: Joi.object({
      tshirtSize: Joi.string().required(),
      trouserSize: Joi.number().required(),
      shoeSize: Joi.number().required(),
    }).required(),
    givenConsent: Joi.boolean().required(),
  });
  const result = clientSchema.validate(req.body);
  if (result.error) {

    return res.status(400).json(result.error);
    console.log(result.error)
  }
  try {
  
    const client = new Client({
      id: uuidv4(),
      ...req.body
    });
    await client.save();
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
};

module.exports = { getClients, createClient };
