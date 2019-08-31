const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'restful';

exports.login = function (req, res, next) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
            if (err) 
                reject(err)
            else {
                const db = client.db(dbName);
                var query = { email: req.body.email, password: req.body.password };
                db.collection("users").findOne( query, function(err, result) {
                    if (!err && result != null) {
                        var token = jwt.sign({ data: result }, 'secret', { expiresIn: '1m' });
                        resolve({ token: token });
                    }
                    else 
                        reject({ error: 'User not found' });
                    client.close();
                });
            }       
        });
    });
};

exports.register = function (req, res, next) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
            if (err) 
                reject(err)
            else {
                const db = client.db(dbName);
                var query = { email: req.body.email, password: req.body.password };
                db.collection("users").insertOne( query, function(err, result) {
                    if (!err) {
                        var token = jwt.sign({ data: result.ops }, 'secret', { expiresIn: '1m' });
                        resolve({ token: token });
                    }
                    else 
                        reject({ error: err.errmsg });
                    client.close();
                });
            }       
        });
    });
};

exports.hash = function (req, res, next) {
    return new Promise(function (resolve) {
        resolve({ status: "OK" });
    });
};