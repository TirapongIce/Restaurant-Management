const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const diningTableRoutes = require('./routes/diningTableRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', diningTableRoutes);

module.exports = app;
