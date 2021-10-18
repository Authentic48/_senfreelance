import request from 'supertest';
import { app } from '../../app';
import { Freelancer } from '../../models/freelancer';
import { natsWrapper } from '../../natsWrapper';

describe('POST /api/freelancers/', () => {
  const cookie = global.signin();

  it('can only be accessed if the user is signedin', async () => {
    return request(app).post('/api/freelancers').send({}).expect(401);
  });

  it('returns a status other than 401 if a user is signedin', async () => {
    const response = await request(app)
      .post('/api/freelancers')
      .set('Cookie', cookie)
      .send({});
    expect(response.status).not.toEqual(401);
  });

  it('returns an error if invalid inputs are provided', async () => {
    await request(app)
      .post('/api/freelancers')
      .set('Cookie', cookie)
      .send({
        phone: '1548812659814',
        profession: '',
        bio: 'this is our bio',
      })
      .expect(400);

    await request(app)
      .post('/api/freelancers')
      .set('Cookie', cookie)
      .send({
        phone: '',
        profession: 'developer',
        bio: 'this is our bio',
      })
      .expect(400);
  });

  it('creates a freelancer with inputs', async () => {
    let freelancers = await Freelancer.find({});
    expect(freelancers.length).toEqual(0);
    const response = await request(app)
      .post('/api/freelancers')
      .set('Cookie', cookie)
      .send({
        phone: '125648782',
        profession: 'developer',
        bio: 'this our bio',
      })
      .expect(201);

    freelancers = await Freelancer.find({});
    expect(freelancers.length).toEqual(1);
    expect(freelancers[0].phone).toEqual('125648782');
  });

  it('publishes an event', async () => {
    await request(app)
      .post('/api/freelancers/')
      .set('Cookie', global.signin())
      .send({
        phone: '125648782',
        profession: 'developer',
        bio: 'this our bio',
      })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
