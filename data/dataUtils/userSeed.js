import { v4 as uuid } from 'uuid';
import fs from "fs";

let rawData = fs.readFileSync('./data/db.json');
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
  tShirtSizes: ["s", "m", "l", "xl"],
  trousersSizes: [32, 34, 36, 38],
  shoeSizes: [39, 40, 41, 42, 43, 44, 45, 46],
};

const sexes = ["m", "f"]

const names = [
  "Marco Ferrari",
  "Mario Rossi",
  "Luca Rossi",
  "Giulia Bianchi",
  "Marco Esposito",
  "Francesca Ricci",
  "Alessandro Romano",
  "Sara Conti",
  "Matteo Ferrari",
  "Elena Greco",
  "Davide Galli",
  "Martina Costa",
  "Simone Rizzo",
  "Chiara Marino",
  "Federico De Luca",
  "Laura Lombardi",
  "Andrea Fontana",
  "Valentina Moretti",
  "Lorenzo Guerra",
  "Alice Neri",
  "Tommaso Santoro",
  "Giorgia Puglisi",
];



    for (let i = 0; i < 20; i++) {
    const user = {
        "id": uuid(),
        "name": getRandomItem(names),
        "sex": getRandomItem(sexes),
        "number": 1234567,
        sizes: {
            "tShirt": getRandomItem(sizesOptions.tShirtSizes),
            "trousers": getRandomItem(sizesOptions.trousersSizes),
            "shoes": getRandomItem(sizesOptions.shoeSizes)
        }
    }
    db.users.push(user)


}

// Write the updated data back to the db.json file
fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
