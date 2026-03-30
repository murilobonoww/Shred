const request = require('supertest');
const app = require('../src/server');

describe('User Routes', () => {

  let createdUserId;

  it('should create a user', async () => {
    const res = await request(app)
      .post('/user')
      .send({
        name: 'Murilo',
        email: 'murilo@email.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');

    createdUserId = res.body.id;
  });

  // CREATE ERROR
  it('should return 400 if missing fields', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Murilo'
      });

    expect(res.statusCode).toBe(400);
  });

  // GET ALL
  it('should return all users', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // GET BY ID
  it('should return a user by id', async () => {
    const res = await request(app).get(`/users/${createdUserId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
  });

  // GET BY ID NOT FOUND
  it('should return 404 if user not found', async () => {
    const res = await request(app).get('/users/999999');

    expect(res.statusCode).toBe(404);
  });

  // UPDATE
  it('should update a user', async () => {
    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .send({
        name: 'Murilo Updated'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Murilo Updated');
  });

  // UPDATE ERROR
  it('should return 400 if no fields to update', async () => {
    const res = await request(app)
      .put(`/users/${createdUserId}`)
      .send({});

    expect(res.statusCode).toBe(400);
  });

  // DELETE
  it('should delete a user', async () => {
    const res = await request(app)
      .delete(`/users/${createdUserId}`);

    expect(res.statusCode).toBe(200);
  });

});