import request from 'supertest';
import { app } from '../../app';
import { Freelancer } from '../../models/freelancer';

const createFreelancer = () => {
  return request(app)
    .post('/api/freelancers')
    .set('Cookie', global.signin())
    .send({
      phone: '125648782',
      profession: 'developer',
      bio: 'this our bio',
    });
};

describe('GET /pai/freelancers', () => {
  it('can fetch all freelancers', async () => {
    await createFreelancer();
    await createFreelancer();
    await createFreelancer();

    const response = await request(app)
      .get('/api/freelancers')
      .send({})
      .expect(200);
    expect(response.body.length).toEqual(3);
  });
});
