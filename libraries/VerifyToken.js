const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
    var token = "";
    var authHeader = req.headers['authorization'];
    if (authHeader.startsWith("Bearer ")){
        token = authHeader.substring(7, authHeader.length);
    }
    try {
        jwt.verify(token, 'secret');
        next();
    } catch(err) {
        return res.status(500).json({ error: "Unauthorized!" });
    }
};
module.exports = verifyToken;