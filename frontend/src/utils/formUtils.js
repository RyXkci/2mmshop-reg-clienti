const values = {
    firstName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
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
    dobDay: {
      required: "Inserire un giorno valido",
      min: {
        value: 1,
        message: "Inserire un giorno valido"
      },
      max: {
        value: 31,
        message: "Inserire un giorno valido"
      }
    },
    dobMonth: {
      required: "Inserire un mese valido",
      min: {
        value: 1,
        message: "Inserire un mese valido"
      },
      max: {
        value: 12,
        message: "Inserire un mese valido"
      }
    },
    dobYear: {
      required: "Inserire un anno valido",
      min: {
        value: 1900,
        message: "Inserire un anno valido"
      },
      max: {
        value: new Date().getFullYear(),
        message: "Inserire un anno valido"
      }
    },
    phoneNumber: {
      required: "Questo campo è obbligatorio",
      pattern: {
        // regex to limit number to 10 digits but allow different formats, such as xxx xxx xxxx
        value: /^(?=(?:[^0-9]*[0-9]){10}[^0-9]*$)(?:\d{1,4} ?){2,4}\d{1,4}$/,
        message: 'Inserisci un numero valido',
      }
     
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