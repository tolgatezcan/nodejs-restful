const express = require('express');
const mongosee = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config(); //.env setting
const router = require("./router");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

// 404 Not Found
app.use(function(req, res, next) {
    res.status(404).send({error: 'Not Found'});
    res.end();
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