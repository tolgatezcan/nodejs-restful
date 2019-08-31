function verifyToken(req, res, next) {
    const token = req.headers['x-api-key'];
    if (!token)
        return res.status(403).send({status: false, message: 'No token provided.'});

    const db = new pg.Client(database.db_rotaboo);
    db.connect();
    const qSql = "SELECT * FROM keys WHERE key = '" + token + "' LIMIT 1";
    db.query(qSql, function(err, result) {
        if (!err && typeof result.rows == "object" && result.rows.length > 0)
            next();
        else
            return res.status(500).send({ status: false, message: 'Failed to authenticate token.' });
        db.end();
    });
}

module.exports = verifyToken;