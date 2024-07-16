const db = require('../config/db');

exports.addOrder = (req, res) => {
    const { items, table } = req.body;
    const itemsJson = JSON.stringify(items); // Convert items to JSON string
    const query = 'INSERT INTO orders (items, `table_id`) VALUES (?, ?)';
    db.query(query, [itemsJson, table], (err, result) => {
        if (err) throw err;
        res.status(201).send('Order added');
    });
};

exports.updateOrder = (req, res) => {
    const { id } = req.params;
    const updatedOrder = req.body;
    const query = 'UPDATE orders SET ? WHERE id = ?';
    db.query(query, [updatedOrder, id], (err, result) => {
        if (err) throw err;
        res.send('Order updated');
    });
};

exports.deleteOrder = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM orders WHERE id = ?';
    db.query(query, id, (err, result) => {
        if (err) throw err;
        res.send('Order removed');
    });
};

exports.getOrders = (req, res) => {
    const query = "SELECT * FROM orders  ";
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};
exports.getMenu = (req, res) => {
    const query = 'SELECT * FROM menu_items';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.completeOrder = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    db.query(query, ["1", id], (err, result) => {
        if (err) throw err;
        res.status(200).send('Order completed');
    });
};


exports.cancelOrder = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    db.query(query, ["2", id], (err, result) => {
        if (err) throw err;
        res.status(200).send('Order canceled');
    });
};