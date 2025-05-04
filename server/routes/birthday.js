const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Client= require("../models/clients");

const bodyParser = require('body-parser');

const { sendMessage, getTextMessageInput, makeFakeText, makeBirthdayText } = require("../utils/messageHelper");
// console.log(getTextMessageInput);
router.use(bodyParser.json());

const runBirthday = (client) => {
  const data = makeBirthdayText(client);
  sendMessage(data)
}


router.get('/', async (req, res, next) => {
    try {
        const clients = await Client.find({});
    
        const today = new Date();
        const twoDaysFromNow = new Date(today);
        twoDaysFromNow.setDate(today.getDate() + 2);
    
        clients.forEach(client => {
          const birthDate = new Date(client.dateOfBirth);
          const birthdayThisYear = new Date(
            twoDaysFromNow.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
          );
    
          if (
            birthdayThisYear.getDate() === twoDaysFromNow.getDate() &&
            birthdayThisYear.getMonth() === twoDaysFromNow.getMonth()
          ) {
            console.log(`🎉 Birthday in 2 days: ${client.firstName} ${client.lastName}`);
            runBirthday(client)
          }
        });
    
        res.send('Checked birthdays. See console for results!');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error checking birthdays.');
      }

})


module.exports = router;