import request from 'supertest'
import app from '../src/app'

describe('Test the root path', () => {
  test('It should response the GET method', async (done) => {
    const response = await request(app.callback()).get('/');
    expect(response.statusCode).toBe(200);
    done();
  });
});