import express from 'express';
const router = express.Router();

router.get(
  '/current',
  (req ,res) => {
    res.send('Hi there');
  }
);

export default router;
