import request from 'supertest';
import { app } from '../../app';
import { Orderstatus } from '@senefreelance/common';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { Freelancer } from '../../models/freelancer';
import { natsWrapper } from '../../natsWrapper';

describe('PUT /api/orders/:orderId', () => {
  it('mars an order as cancelled', async () => {
    const freelancer = Freelancer.build({
      phone: '125648782',
      profession: 'developer',
      bio: 'this our bio',
      name: 'test',
      email: 'test@test.com',
      userId: 'vtd4sdzahg',
      id: new mongoose.Types.ObjectId().toHexString(),
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

    await request(app)
      .put(`/api/orders/${order.id}/`)
      .set('Cookie', user)
      .send()
      .expect(204);

    // expectation to make sure the thing is cancelled
    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(Orderstatus.Cancelled);
  });
  it('emits an  order cancelled event', async () => {
    const freelancer = Freelancer.build({
      phone: '125648782',
      profession: 'developer',
      bio: 'this our bio',
      name: 'test',
      email: 'test@test.com',
      userId: 'vtd4sdzahg',
      id: new mongoose.Types.ObjectId().toHexString(),
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

    await request(app)
      .put(`/api/orders/${order.id}/`)
      .set('Cookie', user)
      .send()
      .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
