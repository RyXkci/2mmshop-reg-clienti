const values = {
    firstName: "",
    lastName: "",
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
    phoneNumber: {
      required: "Questo campo è obbligatorio",
      valueAsNumber: true,
      validate: (value) => !isNaN(value) || "Inserisci un numero valido",
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