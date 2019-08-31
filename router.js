const express = require("express"); 
const router = express.Router();
const VerifyToken = require("./libraries/VerifyToken");
const clients = require("./controller/client");

router.post('/login', clients.login);
router.post('/register', clients.register);
router.get('/hash', [VerifyToken, clients.hash]);

module.exports = router;