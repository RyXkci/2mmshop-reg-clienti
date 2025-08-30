const { cloudinary, flyerStorage } = require("../cloudinary");

const Client = require("../models/clients");

const { sendFlyerMessage } = require("../utils/messageHelper");

const messageClient = (name, phoneNumber, url) => {
  const data = {
    firstName: name,
    recipient: phoneNumber,
    url: url,
  };
  sendFlyerMessage(data);
  console.log("DATA FOR MESSAGE IS:", data);
};

const postFlyer = async (req, res, next) => {
  console.log(flyerStorage);
  const body = req.body;
  const img = req.file;

  console.log("BODY IS:", body);
  console.log("IMAGE IS:", img);

  const fullUrl = img.path;
  const baseUrl = "https://res.cloudinary.com/";

  console.log("FULLURL IS:", fullUrl);
  console.log("BASEURL IS:", baseUrl);

  const urlVar = fullUrl.replace(baseUrl, "");
  const sex = body.sex;

  console.log("URLVAR IS:", urlVar);
  console.log("SEX IS:", sex);

  try {
    const clients = await Client.find({});
    const matchedClients = [];

    clients.forEach((client) => {
      if (sex === "all") {
        messageClient(client.firstName, client.phoneNumber, urlVar);
        matchedClients.push(client)
      }
      if (sex === client.sex) {
        messageClient(client.firstName, client.phoneNumber, urlVar);
        matchedClients.push(client)
      }
      console.log("MATCHED CLIENTS:", matchedClients)
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
};

module.exports = { postFlyer };
