
const groupClothes = (clothes) => {

  const groupOrder = [
    "piumino",
    "cappotto",
    "giacca",
    "maglia",
    "felpa",
    "shirt",
    "tshirt",
    "pantalone",
    "denim",
    "bermuda",
    "sneaker",
    "scarpa elegante",
    "scarpa casual",
    "borsa",
    "cintura",
    "sciarpa",
    "capellino",
    "calze"
  ];

  const groupedClothes = {}; //initiate empty object 

  // iterate over clothes array.

  // check category of object

  // if category of object is equal to first of groupOrder, create key, add product, if not move on.

  // start again.

  //  FINAL OUTPUT EX: {
  //     cappotti: [
  //         {
  //             // each object
  //         }
  //     ]
  //  }

  groupOrder.forEach((el, idx) => {
    clothes.forEach((cloth) => {
      // console.log(cloth.category)
      // console.log(idx)
      if (cloth.category === groupOrder[idx]) {
        // console.log(el);
        if (!groupedClothes[cloth.category]) {
          groupedClothes[cloth.category] = [];
        }
        groupedClothes[cloth.category].push(cloth);
      }
    });
  });
  // console.log("GROUPED CLOTHES:", groupedClothes);
  return groupedClothes
};

export {groupClothes}