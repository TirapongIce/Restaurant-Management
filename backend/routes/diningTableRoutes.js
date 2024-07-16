const express = require('express');
const router = express.Router();
const diningTableController = require('../controllers/diningTableController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/tables', verifyToken, diningTableController.addTable);
router.put('/tables/:id', verifyToken, diningTableController.updateTable);
router.delete('/tables/:id', verifyToken, diningTableController.deleteTable);
router.get('/tables', verifyToken, diningTableController.getTables);

module.exports = router;
