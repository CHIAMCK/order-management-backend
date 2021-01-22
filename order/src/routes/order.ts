import express from 'express';
import { addOrder, getOrderStatus, cancelOrder } from '../controllers/order';
import { orderPayloadValidators } from '../middleware/payloadValidator';
const router = express.Router();

router.post(
  '',
  orderPayloadValidators,
  addOrder
);
router.get('/:orderId', getOrderStatus);
router.post('/cancel/:orderId', cancelOrder);

export default router;
