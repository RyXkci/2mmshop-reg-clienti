const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require("dotenv")
dotenv.config()

const Admin = require('./models/admin');


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
const adminRoutes = require('./routes/admin');

// MIDDLEWARE
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));



// ROUTES
app.use('/api/clients', clientRoutes)
app.use('/api/admin', adminRoutes)


// FIRING UP SERVER
app.listen(4000, () => {
    console.log('listening on port 4000')
})