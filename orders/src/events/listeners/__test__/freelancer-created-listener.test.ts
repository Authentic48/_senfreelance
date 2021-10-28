import { FreelancerCreatedEvent, Listener } from '@senefreelance/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Freelancer } from '../../../models/freelancer';
import { natsWrapper } from '../../../natsWrapper';
import { FreelancerCreatedListener } from '../freelancer-created-listener';

const setup = async () => {
  const listener = new FreelancerCreatedListener(natsWrapper.client);
  const data: FreelancerCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    phone: '125648782',
    profession: 'developer',
    bio: 'this our bio',
    name: 'test',
    email: 'test@test.com',
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates and saves a freelancer', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const freelancer = await Freelancer.findById(data.id);

  expect(freelancer).toBeDefined();
  expect(freelancer!.name).toEqual(data.name);
  expect(freelancer!.email).toEqual(data.email);
});

it('acks the message', async () => {
  const { data, msg, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
