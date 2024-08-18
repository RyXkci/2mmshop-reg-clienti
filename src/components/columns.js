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
        "s",
        "m",
        "l",
        "xl"
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
        "32",
        "33",
        "34"
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
        "32",
        "33",
        "34"
      ]
    },
  },
];
