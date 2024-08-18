export const COLUMNS = [
  {
    header: "Nome",
    accessorKey: "name",
    meta: {
      className: "th-dark",
    },
  },
  {
    header: "Telefono",
    accessorKey: "number",
    meta: {
      className: "th-dark",
    },
  },
  {
    id: "sex",
    header: "Sesso",
    accessorKey: "sex",
    meta: {
      className: "th-light"
    }
  },
  {
    id: "tshirt",
    header: "Maglietta",
    accessorKey: "sizes.tShirt",
    meta: {
      className: "th-light",
      hasFilter: true,
      sizeOptions: [
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
    meta: {
      className: "th-light",
    },
  },
  {
    id: "shoes",
    header: "Scarpe",
    accessorFn: row => `${row.sizes.shoes.toString()}`,
    meta: {
      className: "th-light",
    },
  },
];
