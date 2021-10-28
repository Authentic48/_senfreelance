import { FreelancerUpdatedEvent, Listener } from '@senefreelance/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Freelancer } from '../../../models/freelancer';
import { natsWrapper } from '../../../natsWrapper';
import { FreelancerUpdatedListener } from '../freelancer-updated-listener';

const setup = async () => {
  const listener = new FreelancerUpdatedListener(natsWrapper.client);
  const freelancer = Freelancer.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    phone: '125648782',
    profession: 'developer',
    bio: 'this our bio',
    name: 'test',
    email: 'test@test.com',
    userId: new mongoose.Types.ObjectId().toHexString(),
  });

  await freelancer.save();

  const data: FreelancerUpdatedEvent['data'] = {
    version: freelancer.version + 1,
    id: freelancer.id,
    phone: '825648782',
    profession: 'developer',
    bio: 'this our updated bio',
    name: 'test updated',
    email: 'test@test.com',
    userId: '234hg1687nmbg',
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, freelancer };
};

it('finds, updates and saves a freelancer', async () => {
  const { listener, data, msg, freelancer } = await setup();

  await listener.onMessage(data, msg);

  const updatedfreelancer = await Freelancer.findById(freelancer.id);

  expect(updatedfreelancer!.name).toEqual(data.name);
  expect(updatedfreelancer!.email).toEqual(data.email);
  expect(updatedfreelancer!.version).toEqual(data.version);
});
