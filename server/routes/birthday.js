const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Client = require("../models/clients");

const bodyParser = require("body-parser");

const {
  sendMessage,
  getTextMessageInput,
  makeFakeText,
  makeBirthdayText,
  sendPreBirthdayMessage,
  sendBirthdayMessage,
} = require("../utils/messageHelper");
// console.log(getTextMessageInput);
router.use(bodyParser.json());

const runPreBirthday = (client) => {
  const data = {
    firstName: client.firstName,
    recipient: client.phoneNumber
  }

  sendPreBirthdayMessage(data)
};

const runBirthday = (client) => {
  const data = {
    firstName: client.firstName,
    recipient: client.phoneNumber
  }

  sendBirthdayMessage(data)
}

router.get("/", async (req, res, next) => {
  try {
    const clients = await Client.find({});

    const today = new Date();
    console.log("TODAY", today);
    const twoDaysFromNow = new Date(new Date().setDate(new Date().getDate() + 2));
    console.log("Two days from now", twoDaysFromNow);
    // twoDaysFromNow.setDate(today.getDate() + 2);


    clients.forEach((client) => {
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
        console.log(
          `🎉 Birthday in 2 days: ${client.firstName} ${client.lastName}`
        );
        runPreBirthday(client)
      }

      if (
        birthdayThisYear.getDate() === today.getDate() &&
        birthdayThisYear.getMonth() === today.getMonth()
      ) {
        console.log(`Birthday today: ${client.firstName} ${client.lastName}`);
        runBirthday(client)
      }
    });

    res.send("Checked birthdays. See console for results!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error checking birthdays.");
  }
});

module.exports = router;
