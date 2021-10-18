import { app } from '../../app';
import request from 'supertest';

describe('POST /api/users/signin', () => {
  it('returns a 400 on fail signin', async () => {
    return request(app)
      .post('/api/users/signin')
      .send({
        emai: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 400 on a missing password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: '',
      })
      .expect(400);
  });

  it('returns a 400 on a missing email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({
        email: '',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 200 on a successful login', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
