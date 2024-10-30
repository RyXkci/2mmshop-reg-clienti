export const COLUMNS = [
  {
    header: "Nome",
    accessorKey: "firstName",
    meta: {
      className: "th-dark",
      hasFilter: false
    },
  },
  {
    header: "Cognome",
    accessorKey: "lastName",
    meta: {
      className: "th-dark",
      hasFilter: false
    },
  },
  {
    header: "Telefono",
    accessorKey: "phoneNumber",
    meta: {
      className: "th-dark", //dynamic classnames
      hasFilter: false //metadata for filtering.
    },
  },
  {
    id: "sex",
    header: "Sesso",
    accessorKey: "sex",
    filterFn: "equalsString",
    meta: {
      className: "th-light",
      hasFilter: true,
      selectOptions: [
        "m",
        "f"
      ] //metadata for te dropdown options for filterable columns
    }
  },
  {
    id: "tshirt",
    header: "Maglietta",
    accessorKey: "sizes.tshirtSize",
    filterFn: "equalsString",
    meta: {
      className: "th-light",
      hasFilter: true,
      selectOptions: [
        "xxs",
        "xs",
        "s",
        "m",
        "l",
        "xl",
        "xxl"
      ]
    },
  },
  {
    id: "trousers",
    header: "Pantaloni",
    accessorFn: row => `${row.sizes.trouserSize.toString()}`,
    filterFn: "equalsString",
    meta: {
      className: "th-light",
      hasFilter: true,
      selectOptions: [
      "38",
      "40",
      "42",
      "44",
      "46",
      "48",
      "50",
      "52",
      "54",
      "56",
      "58"
      ]
    },
  },
  {
    id: "shoes",
    header: "Scarpe",
    accessorFn: row => `${row.sizes.shoeSize.toString()}`,
    filterFn: "equalsString",
    meta: {
      className: "th-light",
      hasFilter: true,
      selectOptions: [
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46"

      ]
    },
  },
];
