import { app } from '../../app';
import request from 'supertest';

describe('POST /api/users/signup', () => {
  it('returns a 201 ', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });

  it('returns a 400 with some missing inputs', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        name: 'test',
        email: '',
        password: '',
      })
      .expect(400);
  });
});
