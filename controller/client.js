const jwt = require('jsonwebtoken');
const moment = require('moment');
const crypto = require('crypto');
const fs = require('fs');
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

exports.hash = function (req, res, next) {
    const current_date = moment().format("YYYY-MM-DD HH:mm:ss");
    const random = Math.random().toString();
    const hash = crypto.createHash('sha1').update(current_date + random).digest('hex');
    const filename = __dirname + "/../" + process.env.LOGFILE;
    const log_file  = fs.createWriteStream(filename, { flags: "a" });
    log_file.write("["+current_date+"]" + " HASH.INFO: " + hash + '\n');
    res.json({ hash: hash });
};