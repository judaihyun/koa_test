import request from 'supertest'
import app from '../src/app'

describe('Server Availability', () => {
  it('루트 응답', (done) => {
    request(app.callback()).get('/').expect(200, done)
  })
})

afterAll((done) => {
  done()
})
