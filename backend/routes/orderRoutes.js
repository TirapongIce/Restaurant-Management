const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/order', verifyToken, orderController.addOrder);
router.put('/order/:id', verifyToken, orderController.updateOrder);
router.delete('/order/:id', verifyToken, orderController.deleteOrder);
router.get('/orders', verifyToken, orderController.getOrders);
router.get('/menu', verifyToken, orderController.getMenu);
router.put('/complete/:id', verifyToken, orderController.completeOrder); 
router.put('/cancel/:id', verifyToken, orderController.cancelOrder); 

module.exports = router;
