const jwt = require('jsonwebtoken');
const client = require('../models/client');
const User = require('../models/User');

exports.login = async function (req, res, next) {
    const post = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        const loginUser = await User.findOne(post);
        if (loginUser != null) {
            const token = jwt.sign({ data: loginUser }, 'secret', { expiresIn: '30m' });
            res.json({id_token: token});
        }
        else {
            res.json({message: 'User not found'});
        }
    }
    catch (err) {
        res.json(err);
    }
};

exports.register = async function (req, res, next) {
    const post = new User({
        email: req.body.email,
        password: req.body.password
    });

    try {
        const registerUser = await post.save();
        const token = jwt.sign({ data: registerUser }, 'secret', { expiresIn: '30m' });
        res.json({id_token: token});
    }
    catch (err) {
        res.json(err);
    }
};

exports.hash = function (request, response, next) {
    client.hash(request, response, next).then(function (data) {
        response.status(200).json(data);
    })
    .catch(function (err) {
        response.status(500).json(err);
    });
};