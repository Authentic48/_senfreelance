import express, { Request, Response } from 'express';
import { requireAuth } from '@senefreelance/common';
import { body } from 'express-validator';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('freelancer');

  return res.send(orders);
});

export { router as indexOrdersRoute };
