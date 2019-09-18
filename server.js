const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

// create express app
const app = express();
app.set('secretKey' , 'nodeRestApi');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());



// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to CMS360 application. Take cms quickly. Organize and keep track of all your cms."});
});
require('./app/routes/category.route.js')(app);
require('./app/routes/product.route.js')(app);
// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});