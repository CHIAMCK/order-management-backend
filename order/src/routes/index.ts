import { Router } from 'express';
import orderRoutes from './order';

const router = Router();

router.use('/v1/orders', orderRoutes);

export default router;
