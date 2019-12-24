const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fs = require('fs');
const User = require('../models/User');
const {loginValidation} = require('../models/Validation');
const {registerValidation} = require('../models/Validation');

exports.login = async function (req, res, next) {

    // Login validate
    const {error} = loginValidation(req.body);
    if (error) res.status(400).json({message: error.details[0].message});
    else {

        // Email checking
        const user = await User.findOne({email: req.body.email});
        if (!user) res.status(400).json({message: 'Email or password is wrong'});
        else {

            // Validate password
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) res.status(400).json({message: 'Email or password is wrong'});
            else {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '30m' });
                res.status(200).json({id_token: token});
            }
        }
    }
};

exports.register = async function (req, res, next) {

    // Register validate
    const {error} = registerValidation(req.body);
    if (error) res.status(400).json({message: error.details[0].message});
    else {

        // Email checking
        const emailCheck = await User.findOne({email: req.body.email});
        if (emailCheck) res.status(400).json({message: 'Email already exists'});
        else {

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            
            //Create a new user
            const post = new User({
                email: req.body.email,
                password: hashPassword
            });
        
            try {
                const user = await post.save();
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '30m' });
                res.status(200).json({id_token: token});
            }
            catch (err) {
                res.status(400).json(err);
            }
        }
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