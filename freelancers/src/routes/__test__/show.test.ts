import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

describe('GET /api/freelancers/:id', () => {
  it('return a 404 if an influencer is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).get(`/api/freelancers/${id}`).send().expect(404);
  });

  it("it return a freelancer if it's found", async () => {
    const phone = '12548635';
    const profession = 'developer';
    const bio = 'this is my bio';

    const response = await request(app)
      .post('/api/freelancers')
      .set('Cookie', global.signin())
      .send({
        phone,
        bio,
        profession,
      })
      .expect(201);

    const freelancerResponse = await request(app)
      .get(`/api/freelancers/${response.body.id}`)
      .send()
      .expect(200);

    expect(freelancerResponse.body.bio).toEqual(bio);
    expect(freelancerResponse.body.phone).toEqual(phone);
    expect(freelancerResponse.body.profession).toEqual(profession);
  });
});
