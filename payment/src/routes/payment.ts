import express from 'express';
import { orderPayloadValidators } from '../middleware/payloadValidator';
const router = express.Router();

router.get(
  '/current',
  (req ,res) => {
    res.send('Hi there !!!!');
  }
);

export default router;
