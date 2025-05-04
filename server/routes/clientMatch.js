const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Client= require("../models/clients");
const Clothing= require("../models/clothing");


// const {findMatch} = require('../utils/findMatch');

// messaging stuff


const bodyParser = require('body-parser');
// const dotenv = require("dotenv");
// dotenv.config();

const { sendMessage, getTextMessageInput, makeFakeText } = require("../utils/messageHelper");
// console.log(getTextMessageInput);
router.use(bodyParser.json());



const messageClient = (parsedClient) => {
    const data = getTextMessageInput(parsedClient);
    // makeFakeText(parsedClient)
    console.log("DATA", data)
    console.log(data)
    sendMessage(data)
  .then((response) => {
    // console.log('API Response:', response.data); // Log the full API response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
      response: response.data,
    });
  })
  .catch((error) => {
    console.error('Error:', error.message);
    if (error.response?.data) {
      console.error('API Error Response:', error.response.data); // Log API error details
    }
    // res.status(500).json({
    //   success: false,
    //   error: error.response?.data || error.message,
    // });
  });
}



router.get('/', async (req, res) => {
    try {
        // Fetch all clients and clothing from the database
        const clients = await Client.find({});
        const clothing = await Clothing.find({});
        // console.log(`CLIENTS ARE ${clients}`)
        // console.log(`CLOTHING ARE ${clothing}`)

        const matchedClients = [];

        clients.forEach(client => {
            // console.log("CLIENT IS:", client)
            // console.log(typeof(client))
            const parsedClient = client.toObject();
            // console.log("PARSED CLIENT IS:", client)
            // console.log(typeof(parsedClient))
            const parsedClientSex = client.sex;
            const parsedClientSizes = client.sizes;
            console.log("CLIENT SIZES IS", parsedClientSizes)
        
            // Initialize an empty matches object on the client
            parsedClient.params = {};
            
        
            clothing.forEach(item => {

                if (item.sex === parsedClientSex) {
                    // Check for matches based on item type
                    // console.log(item.sizes, parsedClientSizes)
                    if (item.type === "shoes" && item.sizes.includes(parsedClientSizes.shoeSize)) {

                        parsedClient.params.ts = parsedClientSizes.shoeSize;
                        parsedClient.params.s = parsedClient.sex;
                        parsedClient.params.id = parsedClient.id;
                    }
                    if (item.type === "trousers" && item.sizes.includes(parsedClientSizes.trouserSize)) {
                        parsedClient.params.tp = parsedClientSizes.trouserSize;
                        parsedClient.params.s = parsedClient.sex;
                        parsedClient.params.id = parsedClient.id;
                    }
                    if (item.type === "top" && item.sizes.includes(parsedClientSizes.tshirtSize)) {
                        parsedClient.params.top = parsedClientSizes.tshirtSize;
                        parsedClient.params.s = parsedClient.sex;
                        parsedClient.params.id = parsedClient.id;
                    }
                }
            });
    
            if (Object.keys(parsedClient.params).length > 0) {
                
                matchedClients.push(parsedClient);
                messageClient(parsedClient)
                // doSomething(parsedClient);
            }
        });
        res.status(200).json({
            success: true,
            message: `${matchedClients.length} clients found with matching clothing.`,
            messaggio: `Sono stati inviati ${matchedClients.length} messaggi!`,
            matchedClients,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;



