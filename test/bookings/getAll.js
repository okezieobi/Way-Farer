import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoint with "/api/v1/bookings" to get all bookings by user id if user is an authenticated Client with GET', () => {
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


  before(async () => {
    await pool.queryAny(Test.bookings());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should get all bookings at "/api/v1/bookings" by user id as an authenticated Client if all input data are valid', async () => {
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).get('/api/v1/bookings').set('token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('array');
    const { data } = response.body;
    const resData = Math.floor(Math.random() * data.length);
    if (resData.length > 0) {
      expect(response.body.data[resData]).to.have.property('id').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('tripId').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('seatNo').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('userId').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('createdOn').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('firstName').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('lastName').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('email').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('origin').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('destination').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('busId').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('fare').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('tripDate').to.be.a('string');
    }
  });

  it('Should not get all trips at "api/v1/bookings" as an authenticated CLient with GET if token is an empty string', async () => {
    const token = '';
    const response = await chai.request(app).get('/api/v1/bookings').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all bookings at "api/v1/bookings" as an authenticated CLient with GET if token is not sent', async () => {
    const response = await chai.request(app).get('/api/v1/bookings');
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all bookings at "api/v1/bookings" as an authenticated Client with GET if token does not match any user', async () => {
    const token = await Test.generateToken('1010101012222');
    const response = await chai.request(app).get('/api/v1/bookings').set('token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not get all bookings at "api/v1/bookings" as an authenticated Client with GET if id from token is a negative integer', async () => {
    const token = await Test.generateToken('-1010101010101');
    const response = await chai.request(app).get('/api/v1/bookings').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get all trips at "api/v1/trips" as an authenticated Client with GET if id from token is a floating point number', async () => {
    const token = await Test.generateToken('101010.1010101');
    const response = await chai.request(app).get('/api/v1/trips').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get all trips at "api/v1/trips" as an authenticated Client with GET if id from token is a negative floating point number', async () => {
    const token = await Test.generateToken('-101010.1010101');
    const response = await chai.request(app).get('/api/v1/trips').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get all trips at "api/v1/trips" as an authenticated Client with GET if token is invalid', async () => {
    const token = 1010101010101;
    const response = await chai.request(app).get('/api/v1/trips').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('object');
    expect(response.body.error).to.have.property('name').to.be.a('string');
    expect(response.body.error).to.have.property('message').to.be.a('string');
  });
});


describe('Test endpoint with "/api/v1/bookings" to get all bookings of users if requested by an authenticated Client with GET', () => {
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


  before(async () => {
    await pool.queryAny(Test.bookings());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should get all bookings at "/api/v1/bookings" as an authenticated Admin if all input data are valid', async () => {
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).get('/api/v1/bookings').set('token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('array');
    const { data } = response.body;
    const resData = Math.floor(Math.random() * data.length);
    if (resData.length > 0) {
      expect(response.body.data[resData]).to.have.property('id').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('tripId').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('seatNo').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('userId').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('createdOn').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('firstName').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('lastName').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('email').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('origin').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('destination').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('busId').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('fare').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('tripDate').to.be.a('string');
    }
  });

  it('Should not get all trips at "api/v1/bookings" as an authenticated Admin with GET if token is an empty string', async () => {
    const token = '';
    const response = await chai.request(app).get('/api/v1/bookings').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all bookings at "api/v1/bookings" as an authenticated Admin with GET if token is not sent', async () => {
    const response = await chai.request(app).get('/api/v1/bookings');
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all bookings at "api/v1/bookings" as an authenticated Admin with GET if token does not match client', async () => {
    const token = await Test.generateToken('5050505052222');
    const response = await chai.request(app).get('/api/v1/bookings').set('token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not get all bookings at "api/v1/bookings" as an authenticated Admin with GET if id from token is a negative integer', async () => {
    const token = await Test.generateToken('-5050505050505');
    const response = await chai.request(app).get('/api/v1/bookings').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get all bookings at "api/v1/bookings" as an authenticated Admin with GET if id from token is a floating point number', async () => {
    const token = await Test.generateToken('5050505.050505');
    const response = await chai.request(app).get('/api/v1/bookings').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get all bookings at "api/v1/bookings" as an authenticated Admin with GET if id from token is a negative floating point number', async () => {
    const token = await Test.generateToken('-5050505.050505');
    const response = await chai.request(app).get('/api/v1/bookings').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });


  it('Should not get all trips at "api/v1/trips" as an authenticated Admin with GET if token is invalid', async () => {
    const token = 5050505050505;
    const response = await chai.request(app).get('/api/v1/trips').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('object');
    expect(response.body.error).to.have.property('name').to.be.a('string');
    expect(response.body.error).to.have.property('message').to.be.a('string');
  });
});
