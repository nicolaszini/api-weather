const app = require('../app');
const supertest = require('supertest');

describe('Test Forecast', function () {
  it('should return Current Location and 5 days Weather on /v1/forecast GET', async () => {
    const response = await supertest(app).get('/v1/current').expect(200);
    expect(response.body.status).toEqual(200);
    expect(response.body.location.status).toEqual('success');
  });

  const citySuccess = 'London';
  const cityFailed = 'zzz';
    
  it('SUCCESS - should return Current Location or Location Data City and 5 days Weather with City Parameter on /v1/forecast/{city} GET', async () => {
    const response = await supertest(app).get('/v1/current/' + citySuccess).expect(200);
    expect(response.body.status).toEqual(200);
    expect(response.body.location.status).toEqual('success');
  });

  it('FAILED - should return Current Location or Location Data City and 5 days Weather with City Parameter on /v1/forecast/{city} GET', async () => {
    const response = await supertest(app).get('/v1/current/' + cityFailed).expect(400);
    expect(response.body.status).toEqual(400);
  });
});
