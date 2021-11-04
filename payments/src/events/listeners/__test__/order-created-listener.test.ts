import { OrderCreatedEvent, Orderstatus } from '@senefreelance/common';
import { natsWrapper } from '../../../natsWrapper';
import { OrderCreatedListener } from '../order-created-listener';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/order';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: 'bya24187dhsa',
    status: Orderstatus.Created,
    price: 150,
    task: 'this your task',
    freelancer: {
      id: new mongoose.Types.ObjectId().toHexString(),
      phone: '125648782',
      profession: 'developer',
      bio: 'this our bio',
      name: 'test',
      email: 'test@test.com',
      userId: new mongoose.Types.ObjectId().toHexString(),
    },
  };

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('replicates the order info', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
