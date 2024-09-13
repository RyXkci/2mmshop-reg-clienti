const express = require('express');
const app = express();

const clientRoutes = require('./routes/clients');

// MIDDLEWARE
app.use(express.json());




// ROUTES
app.use('/api/clients', clientRoutes)


app.listen(4000, () => {
    console.log('listening on port 4000')
})