const request = require('supertest');
const app = require('../src/server');

describe('User Routes', () => {

  let createdUserId;

  it('should create a user', async () => {
    const uniqueEmail = `teste${Date.now()}@gmail.com`
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Murilo',
        email: uniqueEmail,
        password: '123456'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');

    createdUserId = res.body.id;
  });

  it('should return all users', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a user by id', async () => {
    const res = await request(app).get(`/users/${createdUserId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should return 404 if user not found', async () => {
    const res = await request(app).get('/users/999999');

    expect(res.statusCode).toBe(404);
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .send({
        name: 'Murilo Updated'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Murilo Updated');
  });

  it('should return 400 if no fields to update', async () => {
    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .send({});

    expect(res.statusCode).toBe(400);
  });

  it('should delete a user', async () => {
    const res = await request(app)
      .delete(`/users/${createdUserId}`);

    expect(res.statusCode).toBe(200);
  });

});