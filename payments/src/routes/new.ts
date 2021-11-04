import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  Orderstatus,
} from '@senefreelance/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import cookieSession from 'cookie-session';
import { Order } from '../models/order';
import { stripe } from '../stripe';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').notEmpty(), body('orderId').notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === Orderstatus.Cancelled) {
      throw new BadRequestError('Cannot pay for a cancelled order');
    }

    await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token,
    });
    return res.status(201).send({ success: true });
  }
);

export { router as createChargeRouter };
