const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'restaurant-management-tirapong-3bee.i.aivencloud.com',
    port: 24392,
    user: 'avnadmin',
    password: 'AVNS_N466IXDGTxT-nqfwAlm',
    database: 'DB-restaurant-menagement'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db;
