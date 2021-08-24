import request from 'supertest'
import app from '../src/app'

describe('Test enviornment', () => {
    test('db connect', async (done) => {
      const response = await request(app.callback()).get('/db');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({status:'connected'});
      done();
    });
});