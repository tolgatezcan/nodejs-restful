const express = require("express"); 
const router = express.Router();

// Import Controller UserAuth
const userAuth = require("../controller/UserAuth");

// Import VerifyToken Model
const verifyToken = require("../models/VerifyToken");

router.post('/login', userAuth.login);
router.post('/register', userAuth.register);
router.get('/hash', [verifyToken, userAuth.hash]);

module.exports = router;