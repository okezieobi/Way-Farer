import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoint at "api/v1/trips" to get all trips as an authenticated Client with GET', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  before(async () => {
    await pool.queryAny(Test.buses());
  });

  before(async () => {
    await pool.queryAny(Test.trips());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should get all trips at "api/v1/trips" as an authenticated Client if all input data are valid', async () => {
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).get('/api/v1/trips').set('client-token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('array');
    const { data } = response.body;
    const resData = Math.floor(Math.random() * data.length);
    if (data.length > 0) {
      expect(response.body.data[resData]).to.have.property('id').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('busId').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('tripDate').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('origin').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('destination').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('fare').to.be.a('number');
    }
  });

  it('Should not get all trips at "api/v1/trips" as an authenticated CLient with GET if token is an empty string', async () => {
    const token = '';
    const response = await chai.request(app).get('/api/v1/trips').set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all trips at "api/v1/trips" as an authenticated CLient with GET if token is not sent', async () => {
    const response = await chai.request(app).get('/api/v1/trips');
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all trips at "api/v1/trips" as an authenticated Client with GET if token does not match client', async () => {
    const token = await Test.generateToken('1010101012222');
    const response = await chai.request(app).get('/api/v1/trips').set('client-token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any client');
  });

  it('Should not get all trips at "api/v1/trips" as an authenticated Client with GET if id from token is a negative integer', async () => {
    const token = await Test.generateToken('-1010101010101');
    const response = await chai.request(app).get('/api/v1/trips').set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get all trips at "api/v1/trips" as an authenticated Client with GET if id from token is a floating point number', async () => {
    const token = await Test.generateToken('101010.1010101');
    const response = await chai.request(app).get('/api/v1/trips').set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get all trips at "api/v1/trips" as an authenticated Client with GET if id from token is a negative floating point number', async () => {
    const token = await Test.generateToken('-101010.1010101');
    const response = await chai.request(app).get('/api/v1/trips').set('client-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });
});

describe('Test endpoint at "api/v1/trips/admin" to get all trips as an authenticated Admin with GET', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  before(async () => {
    await pool.queryAny(Test.buses());
  });

  before(async () => {
    await pool.queryAny(Test.trips());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should get all trips at "api/v1/trips/admin" as an authenticated Admin if all input data are valid', async () => {
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).get('/api/v1/trips/admin').set('admin-token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('array');
    const { data } = response.body;
    const resData = Math.floor(Math.random() * data.length);
    if (data.length > 0) {
      expect(response.body.data[resData]).to.have.property('id').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('busId').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('tripDate').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('origin').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('destination').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('fare').to.be.a('number');
    }
  });

  it('Should not get all trips at "api/v1/trips/admin" as an authenticated Admin with GET if token is an empty string', async () => {
    const token = '';
    const response = await chai.request(app).get('/api/v1/trips/admin').set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all trips at "api/v1/trips/admin" as an authenticated Admin with GET if token is not sent', async () => {
    const response = await chai.request(app).get('/api/v1/trips/admin');
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all trips at "api/v1/trips/admin" as an authenticated Admin with GET if token does not match any admin', async () => {
    const token = await Test.generateToken('5050505053249');
    const response = await chai.request(app).get('/api/v1/trips/admin').set('admin-token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any admin');
  });

  it('Should not get all trips at "api/v1/trips/admin" as an authenticated Admin with GET if id from token is a negative integer', async () => {
    const token = await Test.generateToken('-5050505050505');
    const response = await chai.request(app).get('/api/v1/trips/admin').set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get all trips at "api/v1/trips/admin" as an authenticated Admin with GET if id from token is a floating point number', async () => {
    const token = await Test.generateToken('505050.5050505');
    const response = await chai.request(app).get('/api/v1/trips/admin').set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get all trips at "api/v1/trips/admin" as an authenticated Admin with GET if id from token is a floating point number', async () => {
    const token = await Test.generateToken('-505050.5050505');
    const response = await chai.request(app).get('/api/v1/trips/admin').set('admin-token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });
});
