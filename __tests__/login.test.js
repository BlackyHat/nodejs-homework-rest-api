const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
require('dotenv').config();

describe('Test login authentication', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_HOST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Should login user and return token and user data', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'anonymous3000@ddos.com', password: 'Pass%^&44' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email');
    expect(typeof res.body.user.email).toBe('string');
    expect(res.body.user).toHaveProperty('subscription');
    expect(typeof res.body.user.subscription).toBe('string');
  });
});
