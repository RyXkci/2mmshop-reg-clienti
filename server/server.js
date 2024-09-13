const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
mongoose
  .connect("mongodb://localhost:27017/2mmShop")
  .then(() => {
    console.log("MONGO CONNECTION OPENED!!!");
  })
  .catch((err) => {
    console.log("MONGO OH NO; ERROR", err);
  });


const clientRoutes = require('./routes/clients');

// MIDDLEWARE
app.use(express.json());
app.use(cors());




// ROUTES
app.use('/api/clients', clientRoutes)


app.listen(4000, () => {
    console.log('listening on port 4000')
})