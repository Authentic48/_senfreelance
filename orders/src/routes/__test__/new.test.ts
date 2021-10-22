import request from 'supertest';
import { app } from '../../app';
import { Orderstatus } from '@senefreelance/common';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { Freelancer } from '../../models/freelancer';

describe('POST /api/orders', () => {
  it('return an error if the freelancer does not exist', async () => {
    const freelancerId = new mongoose.Types.ObjectId();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({
        freelancerId,
        task: 'this is my task',
        price: 15,
      })
      .expect(404);
  });

  it('returns an error if the freelancer is busy', async () => {
    const freelancer = Freelancer.build({
      phone: '125648782',
      profession: 'developer',
      bio: 'this our bio',
      name: 'test',
      email: 'test@test.com',
      userId: 'vtd4sdzahg',
    });
    await freelancer.save();

    const order = Order.build({
      freelancer: freelancer,
      userId: 'sygfgahsdfctfge',
      status: Orderstatus.Created,
      expiresAt: new Date(),
      task: 'this is my task',
      price: 15,
    });

    await order.save();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({
        freelancer: freelancer.id,
      })
      .expect(400);
  });

  it('creates an order', async () => {
    const freelancer = Freelancer.build({
      phone: '125648782',
      profession: 'developer',
      bio: 'this our bio',
      name: 'test',
      email: 'test@test.com',
      userId: 'vtd4sdzahg',
    });
    await freelancer.save();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signin())
      .send({ freelancerId: freelancer.id, task: 'this is my task', price: 15 })
      .expect(201);
  });
  // it.todo('emits an order created event');
});
