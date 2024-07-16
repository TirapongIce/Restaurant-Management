const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) return res.status(403).send('Token required');

    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    if (!token) return res.status(403).send('Token required');

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(500).send('Invalid token');
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
