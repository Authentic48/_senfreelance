import express, { Request, Response } from 'express';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@senefreelance/common';
import { body } from 'express-validator';
import { Order } from '../models/order';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  [
    body('orderId')
      .notEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('OrderId must be valid'),
  ],
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate(
      'freelancer'
    );

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    return res.send(order);
  }
);

export { router as showOrderRoute };
