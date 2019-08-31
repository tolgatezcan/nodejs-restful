const client = require('../models/client');

exports.login = function (request, response, next) {
    client.login(request, response, next).then(function (data) {
        response.status(200).json(data);
    })
    .catch(function (err) {
        response.status(200).json(err);
    });
};

exports.register = function (request, response, next) {
    client.register(request, response, next).then(function (data) {
        response.status(200).json(data);
    })
    .catch(function (err) {
        response.status(200).json(err);
    });
};