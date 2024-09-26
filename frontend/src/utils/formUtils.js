const values = {
    firstName: "",
    lastName: "",
    phonePrefix: "+39",
    phoneNumber: "",
    sex: "",
    tshirtSize: "",
    trouserSize: "",
    shoeSize: "",
    givenConsent: false,
  };

  const registerOptions = {
    firstName: {
      required: "Questo campo è obbligatorio",
    },
    lastName: {
      required: "Questo campo è obbligatorio",
    },
    phonePrefix: {
      required: "Questo campo è obbligatorio",

    },
    phoneNumber: {
      required: "Questo campo è obbligatorio",
      pattern: {
        value: /^(?=(?:[^0-9]*[0-9]){10}[^0-9]*$)(?:\d{1,4} ?){2,4}\d{1,4}$/,
        message: 'Inserisci un numero valido',
      }
      // valueAsNumber: true,
      // validate: (value) => !isNaN(value) || "Inserisci un numero valido",
    },
    sex: {
      required: "Seleziona un'opzione",
    },
    tshirtSize: {
      required: "Seleziona un'opzione",
    },
    trouserSize: {
      required: "Seleziona un'opzione",
    },
    shoeSize: {
      required: "Seleziona un'opzione",
    },
    givenConsent: {
      required: "Devi permetterci di utilizzare i tuoi dati",
    },
  };

  export {values, registerOptions}