const app = require('../app');
const supertest = require('supertest');

describe('Test Location', function () {
  it('should return Current Location with ip-api on /v1/location GET', async () => {
    const response = await supertest(app).get('/v1/location').expect(200);
    expect(response.body.status).toEqual(200);
    expect(response.body.data.status).toEqual('success');
  });
});
