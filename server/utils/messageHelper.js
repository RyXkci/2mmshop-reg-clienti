const axios = require("axios");



const sendMessage = (data) => {
  const config = {
    method: "post",
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: data,
  };
  console.log(config)
  return axios(config);
};

const makeLink = (obj) => {
  const baseLink = "https://2mmshop.it/club";
  const searchParams = new URLSearchParams(obj).toString();
  const link = `${baseLink}?${searchParams}`;
  console.log(`LINK IS ${link}`);
  return link;
}

const makeFakeText= (parsedClient) => {
  const name = parsedClient.firstName;
  const link = makeLink(parsedClient.params);
  console.log(`Ciao, {name}! Ecco la tua selezone di capi su misura, con un prezzo riservato solo per te. Scoprila ora!
 ${link}`)
}




const getTextMessageInput = (messageVariables) => {
    console.log(messageVariables)
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: messageVariables.phoneNumber,
    type: "template",
    template: {
      name: "mystylebox",
      language: {
        code: 'it'
      },
      components: [
        {
          type: 'header',
          parameters: [
            {
              type: "text",
              text: messageVariables.firstName
            }
          ]
        },
        {
          type: 'body',
          parameters: [
          
            {
              type: "text",
              text: makeLink(messageVariables.params)
            }
          ]
        },
      ]
    },
  });
};


const makeBirthdayText = (client) => {
  console.log(client)
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: client.phoneNumber,
    type: "template",
    template: {
      name: "birthday",
      language: {
        code: 'it'
      },
      components: [
        {
          type: 'header',
          parameters: [
            {
              type: "text",
              text: client.firstName
            }
          ]
        }
      ]
    },
  });
}



module.exports = {
  sendMessage,
  getTextMessageInput,
  makeFakeText,
  makeBirthdayText
};