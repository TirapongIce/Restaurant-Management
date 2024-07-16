const db = require('../config/db');

exports.addTable = (req, res) => {
    const table = req.body;
    const query = 'INSERT INTO tables SET ?';
    db.query(query, table, (err, result) => {
        if (err) throw err;
        res.status(201).send('Table added');
    });
};

exports.updateTable = (req, res) => {
    const { id } = req.params;
    const updatedTable = req.body;
    const query = 'UPDATE tables SET ? WHERE id = ?';
    db.query(query, [updatedTable, id], (err, result) => {
        if (err) throw err;
        res.send('Table updated');
    });
};

exports.deleteTable = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tables WHERE id = ?';
    db.query(query, id, (err, result) => {
        if (err) throw err;
        res.send('Table removed');
    });
};

exports.getTables = (req, res) => {
    const query = 'SELECT * FROM tables';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};
