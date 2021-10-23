import express, { Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  Orderstatus,
  requireAuth,
  validateRequest,
} from '@senefreelance/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Freelancer } from '../models/freelancer';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/order-created-publisher';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;
router.post(
  '/api/orders',
  requireAuth,
  [
    body('task').notEmpty().withMessage('Task is required'),
    body('price').notEmpty().withMessage('Price is required'),
    body('freelancerId')
      .notEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Freelancer must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { freelancerId, task, price } = req.body;
    //  find the freelancer the user is trying to make the order for
    const freelancer = await Freelancer.findById(freelancerId);

    if (!freelancer) {
      throw new NotFoundError();
    }

    //Make sure the freelancer is avaible on the current time
    const isBusy = await freelancer.isBusy();

    if (isBusy) {
      throw new BadRequestError('Freelancer is busy, Please try later');
    }

    //calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // create the order and save it in DB
    const order = Order.build({
      userId: req.currentUser!.id,
      status: Orderstatus.Created,
      expiresAt: expiration,
      freelancer,
      task,
      price,
    });

    await order.save();

    // Publish an event saying that an order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      task: order.task,
      freelancer: {
        id: freelancer.id,
        bio: freelancer.bio,
        name: freelancer.name,
        email: freelancer.email,
        userId: freelancer.userId,
        phone: freelancer.phone,
        profession: freelancer.profession,
      },
      expiresAt: order.expiresAt.toString(),
      price: order.price,
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRoute };
