const request = require('supertest');
const app = require('../index');

describe('GET /api/users', () => {
  it('returns all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/users/:id', () => {
  it('returns a single user', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('returns 404 for unknown user', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /api/users', () => {
  it('creates a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'test@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Test User');
  });

  it('returns 400 when fields are missing', async () => {
    const res = await request(app).post('/api/users').send({ name: 'No Email' });
    expect(res.statusCode).toBe(400);
  });
});
