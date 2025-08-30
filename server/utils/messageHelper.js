const axios = require("axios");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;

const baseSender = process.env.TWILIO_WAPP_NUMBER;

const client = twilio(accountSid, authToken);

//  MESSAGE SENDERS

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

async function sendFlyerMessage(data) {
  if (!data) return;

  const message = await client.messages.create({
    contentSid: "HX3f574e14508375187b0c6721e240f1ff",

    contentVariables: JSON.stringify({ 1: data?.firstName, 2: data?.url }),

    from: `whatsapp:${baseSender}`,

    to: `whatsapp:${data?.recipient}`,
  });

  console.log(message.body);
  sendFlyerMessage();
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
  makePromoData,
  makeReminderText,
  makeBirthdayText,
};
