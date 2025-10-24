const axios = require("axios");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;

const baseSender = process.env.TWILIO_WAPP_NUMBER;

const client = twilio(accountSid, authToken);

console.log(client)

//  MESSAGE SENDERS


//    PROMO MESSAGE
async function createMessage(data) {
  if (!data) return;

  const message = await client.messages.create({
    contentSid: "HX7b64d9d545cab3cb58d0c0c81b76b4e3",

    contentVariables: JSON.stringify({
      1: data?.firstName,
      2: data?.messageLink,
    }),

    from: `whatsapp:${baseSender}`,

    to: `whatsapp:${data?.recipient}`,
  });

  console.log(message.body);

  createMessage();
  console.log("DATA IN NEW FUNCTION IS:", data);
}

//   FLYER MESSAGE

async function sendFlyerMessage(data) {
  if (!data) return;
console.log('DATA IN MESSAGE IS:', data)
  const message = await client.messages.create({
    contentSid: "HX3f574e14508375187b0c6721e240f1ff",

    contentVariables: JSON.stringify({ 1: data?.firstName, 2: data?.url }),

    from: `whatsapp:${baseSender}`,

    to: `whatsapp:${data?.recipient}`,
  });

  console.log(message.body);
  sendFlyerMessage();
}

//   CARD MESSAGE FOR AUTOMATIC SENDING ON SUBSCRIPTION

async function sendCardMessage(data) {
  if (!data) return;
console.log("DATA IN MESSAGE:", data)
  const message = await client.messages.create({
    contentSid: "HX830de6dac0dccbd73e3b62825582faef",

    contentVariables: JSON.stringify({ 1: data?.firstName }),

    from: `whatsapp:${baseSender}`,

    to: `whatsapp:${data?.recipient}`,
  });

  console.log(message.body);
  // sendCardMessage()
}

//   PRE BIRTHDAY MESSAGE

async function sendPreBirthdayMessage(data) {
  if (!data) return;
console.log("DATA IN MESSAGE:", data)
  const message = await client.messages.create({
    contentSid: "HXe8a0997f3ebb5832f3da50a3467b76a9",

    contentVariables: JSON.stringify({ 1: data?.firstName }),

    from: `whatsapp:${baseSender}`,

    to: `whatsapp:${data?.recipient}`,
  });

  console.log(message.body);
  sendPreBirthdayMessage()
}

//   BIRTHDAY MESSAGE
async function sendBirthdayMessage(data) {
  if (!data) return;
console.log("DATA IN MESSAGE:", data)
  const message = await client.messages.create({
    contentSid: "HX25690fa9f6cc886fbf967378b7b7ed36",

    contentVariables: JSON.stringify({ 1: data?.firstName }),

    from: `whatsapp:${baseSender}`,

    to: `whatsapp:${data?.recipient}`,
  });

  console.log(message.body);
  sendPreBirthdayMessage()
}
//  MESSAGE DATA CONSTRUCTORS

const makeLink = (obj) => {
  const baseLink = "https://2mmshop.it/club";
  const searchParams = new URLSearchParams(obj).toString();
  const link = `${baseLink}?${searchParams}`;
  console.log(`LINK IS ${link}`);
  return link;
};

const makePromoData = (messageVariables) => {
  return {
    firstName: messageVariables.firstName,
    messageLink: makeLink(messageVariables.params),
    recipient: messageVariables.phoneNumber,
  };
};


// const makeFakeText = (parsedClient) => {
//   const name = parsedClient.firstName;
//   const link = makeLink(parsedClient.params);
//   console.log(`Ciao, {name}! Ecco la tua selezone di capi su misura, con un prezzo riservato solo per te. Scoprila ora!
//  ${link}`);
// };

// const getTextMessageInput = (messageVariables) => {
//   // console.log(messageVariables);
//   return JSON.stringify({
//     messaging_product: "whatsapp",
//     preview_url: false,
//     recipient_type: "individual",
//     to: messageVariables.phoneNumber,
//     type: "template",
//     template: {
//       name: "mystylebox",
//       language: {
//         code: "it",
//       },
//       components: [
//         {
//           type: "header",
//           parameters: [
//             {
//               type: "text",
//               text: messageVariables.firstName,
//             },
//           ],
//         },
//         {
//           type: "body",
//           parameters: [
//             {
//               type: "text",
//               text: makeLink(messageVariables.params),
//             },
//           ],
//         },
//       ],
//     },
//   });
// };

// const sendMessage = (data) => {
//   const config = {
//     method: "post",
//     url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
//     headers: {
//       Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//       "Content-Type": "application/json",
//     },
//     data: data,
//   };
//   console.log(config);
//   return axios(config);
// };

const makeReminderText = (messageVariables) => {
  console.log(messageVariables);
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: messageVariables.phoneNumber,
    type: "template",
    template: {
      name: "mystylebox_reminder",
      language: {
        code: "it",
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: messageVariables.firstName,
            },

            {
              type: "text",
              text: makeLink(messageVariables.params),
            },
          ],
        },
      ],
    },
  });
};

const makeBirthdayText = (client) => {
  console.log(client);
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: client.phoneNumber,
    type: "template",
    template: {
      name: "birthday",
      language: {
        code: "it",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "text",
              text: client.firstName,
            },
          ],
        },
      ],
    },
  });
};

module.exports = {
  createMessage,
  sendFlyerMessage,
  sendCardMessage,
  sendPreBirthdayMessage,
  sendBirthdayMessage,
  makePromoData,
  makeReminderText,
  makeBirthdayText,
};
