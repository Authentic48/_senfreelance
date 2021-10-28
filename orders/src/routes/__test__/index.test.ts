import request from 'supertest';
import { app } from '../../app';
import { Orderstatus } from '@senefreelance/common';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { Freelancer } from '../../models/freelancer';

const createFreelancer = async () => {
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

  return freelancer;
};
describe('GET /api/orders', () => {
  it('fetches orders for a particular user', async () => {
    const freelancerOne = await createFreelancer();
    const freelancerTwo = await createFreelancer();
    const freelancerThree = await createFreelancer();

    const userOne = global.signin();
    const userTwo = global.signin();

    // create two orders as User #2
    const { body: orderOne } = await request(app)
      .post('/api/orders')
      .set('Cookie', userTwo)
      .send({
        freelancerId: freelancerTwo.id,
        task: 'this is the first task',
        price: 10,
      })
      .expect(201);
    const { body: orderTwo } = await request(app)
      .post('/api/orders')
      .set('Cookie', userTwo)
      .send({
        freelancerId: freelancerThree.id,
        task: 'this is the second task',
        price: 15,
      })
      .expect(201);

    // Make request to get orders for User #2
    const response = await request(app)
      .get('/api/orders/')
      .set('Cookie', userTwo)
      .expect(200);

    //     console.log(response.body);
    // Make sure we only get the orders for User #2
    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(orderOne.id);
    expect(response.body[1].id).toEqual(orderTwo.id);
    expect(response.body[0].freelancer.id).toEqual(freelancerTwo.id);
    expect(response.body[1].freelancer.id).toEqual(freelancerThree.id);
  });
});
