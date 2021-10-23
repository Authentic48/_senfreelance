import request from 'supertest';
import { app } from '../../app';
import { Orderstatus } from '@senefreelance/common';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { Freelancer } from '../../models/freelancer';

describe('GET /api/orders/:orderId', () => {
  it('fetches the order', async () => {
    const freelancer = Freelancer.build({
      phone: '125648782',
      profession: 'developer',
      bio: 'this our bio',
      name: 'test',
      email: 'test@test.com',
      userId: 'vtd4sdzahg',
    });
    await freelancer.save();

    const user = global.signin();
    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({
        freelancerId: freelancer.id,
        task: 'this is my task',
        price: 15,
      })
      .expect(201);

    const { body: fetchedOrder } = await request(app)
      .get(`/api/orders/${order.id}`)
      .set('Cookie', user)
      .send({})
      .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);
  });

  it("returns an error if user try another user's order", async () => {
    const freelancer = Freelancer.build({
      phone: '125648782',
      profession: 'developer',
      bio: 'this our bio',
      name: 'test',
      email: 'test@test.com',
      userId: 'vtd4sdzahg',
    });
    await freelancer.save();

    const user = global.signin();
    const { body: order } = await request(app)
      .post('/api/orders')
      .set('Cookie', user)
      .send({
        freelancerId: freelancer.id,
        task: 'this is my task',
        price: 15,
      })
      .expect(201);

    const { body: fetchedOrder } = await request(app)
      .get(`/api/orders/${order.id}`)
      .set('Cookie', global.signin())
      .send({})
      .expect(401);
  });
});
