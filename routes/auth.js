const express = require("express"); 
const router = express.Router();
const VerifyToken = require("../models/VerifyToken");
const post = require("../controller/post");

router.post('/login', post.login);
router.post('/register', post.register);
router.get('/hash', [VerifyToken, post.hash]);

module.exports = router;