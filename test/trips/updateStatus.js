import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/trips/:tripId" to update a trip status as an authenticated Admin with PATCH', () => {
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

  it('Should update a trip status "/api/v1/trips/:tripId" as an authenticated Admin if all input data are valid', async () => {
    const tripId = 3030303030303;
    const token = await Test.generateToken('5050505050505');
    const status = 'Cancelled';
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('message').to.be.a('string').to.equal(`Trip status successfully updated to ${status.toLowerCase()}`);
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if status is not a string type', async () => {
    const tripId = 3030303030303;
    const token = await Test.generateToken('5050505050505');
    const status = 1000;
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip status must be string type');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if status is an empty string', async () => {
    const tripId = 3030303030303;
    const token = await Test.generateToken('5050505050505');
    const status = '';
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip status is required');
  });


  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if status is undefined', async () => {
    const tripId = 3030303030303;
    const token = await Test.generateToken('5050505050505');
    const status = undefined;
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip status is required');
  });


  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if status is null', async () => {
    const tripId = 3030303030303;
    const token = await Test.generateToken('5050505050505');
    const status = null;
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip status is required');
  });


  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if status is not sent', async () => {
    const tripId = 3030303030303;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip status is required');
  });


  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if status does not equal active or cancelled (capitalized insensitive)', async () => {
    const tripId = 3030303030303;
    const token = await Test.generateToken('5050505050505');
    const status = 'leeeeemaooooo';
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Status must be active or cancelled');
  });


  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if status is an empty string', async () => {
    const tripId = 3030303030303;
    const token = await Test.generateToken('5050505050505');
    const status = '';
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip status is required');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if trip id is not a number', async () => {
    const tripId = 'hahahahaha';
    const token = await Test.generateToken('5050505050505');
    const status = 'Cancelled';
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id must be a positive integer');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if trip id is a negative integer', async () => {
    const tripId = -3030303030303;
    const token = await Test.generateToken('5050505050505');
    const status = 'Cancelled';
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id must be a positive integer');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if trip id is a negative floating point number', async () => {
    const tripId = -303030.3030303;
    const token = await Test.generateToken('5050505050505');
    const status = 'Cancelled';
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id must be a positive integer');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if trip id is a floating point number', async () => {
    const tripId = 303030.3030303;
    const token = await Test.generateToken('5050505050505');
    const status = 'Cancelled';
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id must be a positive integer');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if token is an empty string', async () => {
    const tripId = 3030303030303;
    const token = '';
    const status = 'Cancelled';
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if token is not sent', async () => {
    const tripId = 3030303030303;
    const status = 'Cancelled';
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if token does not match user', async () => {
    const tripId = 3030303030303;
    const token = await Test.generateToken('1010101012020');
    const status = 'Cancelled';
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if id from token does not belong to admin', async () => {
    const tripId = 3030303030303;
    const status = 'Cancelled';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Only admin can access this resource');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if id from token is a negative integer', async () => {
    const tripId = 3030303030303;
    const status = 'Cancelled';
    const token = await Test.generateToken('-5050505050505');
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if id from token is a negative floating point number', async () => {
    const tripId = 3030303030303;
    const status = 'Cancelled';
    const token = await Test.generateToken('-505050.5050505');
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not update a trip status at "/api/v1/trips/:tripId" as an authenticated Admin if id from token is a floating point number', async () => {
    const tripId = 3030303030303;
    const status = 'Cancelled';
    const token = await Test.generateToken('505050.5050505');
    const response = await chai.request(app).patch(`/api/v1/trips/${tripId}`).set('token', token).send({ status });
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });
});
