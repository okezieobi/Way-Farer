import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/bookings/:bookingId" to delete a booking as an authenticated User with DELETE', () => {
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

  it('Should delete a booking at "/api/v1/bookings/:bookingId" as an authenticated User if all input data are valid', async () => {
    const token = await Test.generateToken('1010101010101');
    const bookingId = 4040404040404;
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`).set('token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('message').to.be.a('string').to.equal('Booking successfully deleted');
  });

  it('Should not delete a booking at "/api/v1/bookings/:bookingId" if bookingId is not a number', async () => {
    const token = await Test.generateToken('1010101010101');
    const bookingId = 'akkakakakakak';
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`).set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Booking id must be a positive integer');
  });

  it('Should not delete a booking at "/api/v1/bookings/:bookingId" if bookingId is a negative integer', async () => {
    const token = await Test.generateToken('1010101010101');
    const bookingId = -4040404040404;
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`).set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Booking id must be a positive integer');
  });

  it('Should not delete a booking at "/api/v1/bookings/:bookingId" if bookingId is a negative floating point number', async () => {
    const token = await Test.generateToken('1010101010101');
    const bookingId = 4040404.040404;
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`).set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Booking id must be a positive integer');
  });

  it('Should not delete a booking at "/api/v1/bookngs/:bookingId" if bookingId is a floating point number', async () => {
    const token = await Test.generateToken('1010101010101');
    const bookingId = 404040.4040404;
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`).set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Booking id must be a positive integer');
  });

  it('Should not delete a booking at "/api/v1/bookings/:bookingId" if token is an empty string', async () => {
    const token = '';
    const bookingId = 4040404040404;
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`).set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not delete a booking at "/api/v1/bookings/:bookingId" if token is not sent', async () => {
    const bookingId = 4040404040404;
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not delete a booking at "/api/v1/bookings/:bookingId" if token does not match any user', async () => {
    const token = await Test.generateToken('1010101010202');
    const bookingId = 4040404040404;
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`).set('token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not delete a booking at "/api/v1/bookings/:bookingId" if id from token is a negative integer', async () => {
    const token = await Test.generateToken('-1010101010101');
    const bookingId = 4040404040404;
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`).set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not delete a booking at "/api/v1/bookings/:bookingId" if id from token is a negative floating point number', async () => {
    const token = await Test.generateToken('-101010.1010101');
    const bookingId = 4040404040404;
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`).set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not delete a booking at "/api/v1/bookings/:bookingId" if id from token is a floating point number', async () => {
    const token = await Test.generateToken('101010.1010101');
    const bookingId = 4040404040404;
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`).set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not delete a booking at "/api/v1/bookings/:bookingId" if token is invalid', async () => {
    const token = 1010101010101;
    const bookingId = 4040404040404;
    const response = await chai.request(app).delete(`/api/v1/bookings/${bookingId}`).set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.an('object');
    expect(response.body.error).to.have.property('name').to.be.a('string');
    expect(response.body.error).to.have.property('message').to.be.a('string');
  });
});
