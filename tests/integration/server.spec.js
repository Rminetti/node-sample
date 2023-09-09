const request = require('supertest');
const server = require('../../server.js');

describe('Test server', () => {
  it('Should return pong to /ping', async () => {
    const response = await request(server).get('/ping').expect(200);
    expect(response.text).toBe('pong');
  })
})
