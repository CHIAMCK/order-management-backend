import { Router } from 'express';
import paymentRoutes from './payment';

const router = Router();

router.use('/v1/payments', paymentRoutes)

export default router;
