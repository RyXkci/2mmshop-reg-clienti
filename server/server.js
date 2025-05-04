const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require("dotenv")
dotenv.config()

const Admin = require('./models/admin');

const PORT = process.env.port || 4000;
const dbUrl = process.env.MONGOURL;
const CORSURL = process.env.CORSURL;

const mongoose = require('mongoose');
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MONGO CONNECTION OPENED!!!");
  })
  .catch((err) => {
    console.log("MONGO OH NO; ERROR", err);
  });


const clientRoutes = require('./routes/clients');
const adminRoutes = require('./routes/admin');
const clothingRoutes = require('./routes/clothing');
const pingRoutes = require('./routes/ping');
const matchRoutes = require('./routes/clientMatch');
const birthdayRoute = require('./routes/birthday');

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: CORSURL,
  methods: ['GET', 'POST']
}));

// https://2mmshop.netlify.app


// ROUTES
app.use('/api/clients', clientRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/clothing', clothingRoutes)
app.use('/api/ping', pingRoutes)
app.use('/api/matchclient', matchRoutes)
app.use('/api/birthday', birthdayRoute)

// FIRING UP SERVER
app.listen(PORT, () => {
    console.log('listening on port 4000')
})