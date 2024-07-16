const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
    const { username, password, email ,  phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password ,email , phone , create_by , create_date, update_by , update_date) VALUES (?,?,?,?,?,NOW(),?,NOW())';
    db.query(query, [username, hashedPassword , email ,  phone,username,username], (err, result) => {
        if (err) throw err;
        res.status(201).send('User registered');
    });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) throw err;
        const user = results[0];
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(400).send('Invalid credentials');
        }
    });
};
