import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  Orderstatus,
} from '@senefreelance/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Order } from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.put(
  '/api/orders/:orderId',
  requireAuth,
  body('orderId')
    .notEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('OrderId must be valid'),
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

    order.set({
      status: Orderstatus.Cancelled,
    });

    await order.save();

    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      freelancer: {
        id: order.freelancer.id,
      },
    });

    return res.status(204).send(order);
  }
);

export { router as updateOrderRoute };
