import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

describe('PUT /api/freelancers/:id', () => {
  it('returns a 404 if the provide id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).get(`/api/freelancers/${id}`).send().expect(404);
  });

  it('returns a 401 if the user is not authenticated', async () => {
    const response = await request(app)
      .post('/api/freelancers')
      .set('Cookie', global.signin())
      .send({
        phone: '125648782',
        profession: 'developer',
        bio: 'this our bio',
      })
      .expect(201);

    await request(app)
      .put(`/api/freelancers/${response.body.id}`)
      .send({
        phone: '125648782',
        profession: 'backend developer',
        bio: 'this our updated bio',
      })
      .expect(401);
  });

  it("returns a 401 if the freelancer profile doesn't belong to the signin user", async () => {
    const response = await request(app)
      .post('/api/freelancers')
      .set('Cookie', global.signin())
      .send({
        phone: '125648782',
        profession: 'developer',
        bio: 'this our bio',
      })
      .expect(201);

    await request(app)
      .put(`/api/freelancers/${response.body.id}`)
      .set('Cookie', global.signin())
      .send({
        phone: '125648782',
        profession: 'backend developer',
        bio: 'this our updated bio',
      })
      .expect(401);
  });

  it('returns a 400 if the autheticate user provide some invalid input', async () => {
    const cookie = global.signin();

    const response = await request(app)
      .post('/api/freelancers')
      .set('Cookie', global.signin())
      .send({
        phone: '125648782',
        profession: 'developer',
        bio: 'this our bio',
      })
      .expect(201);

    await request(app)
      .put(`/api/freelancers/${response.body.id}`)
      .set('Cookie', global.signin())
      .send({
        phone: '125648782',
        profession: '',
        bio: 'this our updated bio',
      })
      .expect(400);
  });

  it('returns a 400 if the autheticate user provide some valid input', async () => {
    const cookie = global.signin();

    const response = await request(app)
      .post('/api/freelancers')
      .set('Cookie', cookie)
      .send({
        phone: '125648782',
        profession: 'developer',
        bio: 'this our bio',
      })
      .expect(201);

    await request(app)
      .put(`/api/freelancers/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        phone: '125648782',
        profession: 'backend developer',
        bio: 'this our updated bio',
      })
      .expect(200);

    const updatedresponse = await request(app)
      .get(`/api/freelancers/${response.body.id}`)
      .send();

    expect(updatedresponse.body.profession).toEqual('backend developer');
  });
});
