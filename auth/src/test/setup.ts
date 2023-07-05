import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
  let signin: () => Promise<string[]>;
}
let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'thisourjwtsecretitcouldbeanything';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();

  await mongoose.connection.close();
});

global.signin = async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      name: 'test',
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
