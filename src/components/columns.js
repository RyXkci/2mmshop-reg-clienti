export const COLUMNS = [
  {
    header: "Nome",
    accessorKey: "name",
    meta: {
      className: "th-dark",
      hasFilter: false
    },
  },
  {
    header: "Telefono",
    accessorKey: "number",
    meta: {
      className: "th-dark",
      hasFilter: false
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
      ]
    }
  },
  {
    id: "tshirt",
    header: "Maglietta",
    accessorKey: "sizes.tShirt",
    filterFn: "equalsString",
    meta: {
      className: "th-light",
      hasFilter: true,
      selectOptions: [
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
    accessorFn: row => `${row.sizes.trousers.toString()}`,
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
    accessorFn: row => `${row.sizes.shoes.toString()}`,
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
