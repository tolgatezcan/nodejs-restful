const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const User = require('../models/User');
const {loginValidation} = require('../models/Validation');
const {registerValidation} = require('../models/Validation');

exports.login = async function (req, res, next) {
    const {error} = loginValidation(req.body);
    if (error) res.status(400).json({message: error.details[0].message});
    else {
        const post = {
            email: req.body.email,
            password: req.body.password
        };
    
        try {
            const loginUser = await User.findOne(post);
            if (loginUser != null) {
                const token = jwt.sign({ data: loginUser }, 'secret', { expiresIn: '30m' });
                res.status(200).json({id_token: token});
            }
            else {
                res.status(400).json({message: 'User not found'});
            }
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
};

exports.register = async function (req, res, next) {
    const {error} = registerValidation(req.body);
    if (error) res.status(400).json({message: error.details[0].message});
    else {
        const emailCheck = await User.findOne({email: req.body.email});
        if (emailCheck) res.status(400).json({message: 'Email already exists'});
        else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            
            const post = new User({
                email: req.body.email,
                password: hashPassword
            });
        
            try {
                const registerUser = await post.save();
                const token = jwt.sign({ data: registerUser }, 'secret', { expiresIn: '30m' });
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