const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader.startsWith("Bearer ")){
        var token = authHeader.substring(7, authHeader.length);
    }
    try {
        jwt.verify(token, process.env.SECRET);
        next();
    } catch(err) {
        return res.json({ message: "Unauthorized!" });
    }
};
module.exports = verifyToken;