import { v4 as uuid } from "uuid";
import fs from "fs";

let rawData = fs.readFileSync("./data/db.json");
let db = JSON.parse(rawData);

// Check if users array exists, if not, create it
if (!db.users) {
  db.users = [];
}
// Function to get a random item from an array
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Clothes sizes options to add to user
const sizesOptions = {
  tShirtSizes: ["xs","s", "m", "l", "xl","xxl"],
  trousersSizes: [38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58],
  shoeSizes: [36, 37, 28, 39, 40, 41, 42, 43, 44, 45, 46],
};

const sexes = ["m", "f"];

const names = [
  "Marco Rossi",
  "Giulia Bianchi",
  "Luca Esposito",
  "Elena Ferrari",
  "Andrea Romano",
  "Sara Galli",
  "Matteo Conti",
  "Francesca Ricci",
  "Alessandro Marino",
  "Chiara Greco",
  "Davide Colombo",
  "Martina De Luca",
  "Federico Rizzo",
  "Laura Fontana",
  "Simone Moretti",
  "Valentina Caruso",
  "Riccardo Barbieri",
  "Silvia Pellegrini",
  "Leonardo Marchetti",
  "Federica Sanna",
  "Antonio Longo",
  "Claudia Fabbri",
  "Gabriele D'Angelo",
  "Anna Parisi",
  "Stefano Cattaneo",
  "Marta Vitale",
  "Giovanni Lombardi",
  "Elisa Santoro",
  "Pietro Bianco",
  "Alice Rinaldi",
  "Francesco Grassi",
  "Rosa Benedetti",
  "Paolo Bellini",
  "Ilaria Negri",
  "Lorenzo Ferrara",
  "Roberta Piras",
  "Nicola Monti",
  "Angela Fiore",
  "Emanuele Mazza",
  "Beatrice Orlando",
  "Giuseppe Leone",
  "Veronica Russo",
  "Salvatore Marchetti",
  "Paola Valentini",
  "Giorgio Guerra",
  "Serena Ruggieri",
  "Alberto Donati",
  "Maria Romano",
  "Filippo Giordano",
  "Sabrina De Santis",
];

for (let i = 0; i < 50; i++) {
  const user = {
    id: uuid(),
    name: getRandomItem(names),
    sex: getRandomItem(sexes),
    number: 1234567,
    sizes: {
      tShirt: getRandomItem(sizesOptions.tShirtSizes),
      trousers: getRandomItem(sizesOptions.trousersSizes),
      shoes: getRandomItem(sizesOptions.shoeSizes),
    },
  };
  db.users.push(user);
}

// Write the updated data back to the db.json file
fs.writeFileSync("db.json", JSON.stringify({}, null, 2));
fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

//
