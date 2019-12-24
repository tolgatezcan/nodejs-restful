const express = require('express');
const app = express();
const mongosee = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Import Routes
const auth = require("./routes/auth");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route Middlewares
app.use('/api/user', auth);

// 404 Not Found
app.use(function(req, res, next) {
    res.json({message: 'Invalid method'});
});

// Connect To MongoDB
mongosee.connect(process.env.DB_restful, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) 
        console.log(err)
    else
        console.log('Connect to MongoDB');
});

app.listen(process.env.PORT);
console.log('Server is listening on port ' + process.env.PORT);