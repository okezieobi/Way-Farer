import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoint at "api/v1/buses" that gets all bus data as an authenticated Admin with GET', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  before(async () => {
    await pool.queryAny(Test.buses());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should get all bus data at "api/v1/buses" as an authenticated Admin with GET if all input data are valid', async () => {
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).get('/api/v1/buses').set('token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('array');
    const { data } = response.body;
    const resData = Math.floor(Math.random() * data.length);
    if (data.length > 0) {
      expect(response.body.data[resData]).to.have.property('id').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('numberPlate').to.be.a('string').to.be.length(9);
      expect(response.body.data[resData]).to.have.property('manufacturer').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('model').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('year').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('capacity').to.be.a('number');
    }
  });

  it('Should not get all bus data at "api/v1/buses" as an authenticated Admin with GET if token is an empty string', async () => {
    const token = '';
    const response = await chai.request(app).get('/api/v1/buses').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all bus data at "api/v1/buses" as an authenticated Admin with GET if token is not sent', async () => {
    const response = await chai.request(app).get('/api/v1/buses');
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get all bus data at "api/v1/buses" as an authenticated Admin with GET if token does not match admin', async () => {
    const token = await Test.generateToken('5050505059845');
    const response = await chai.request(app).get('/api/v1/buses').set('token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not get all bus data at "api/v1/buses" as an authenticated Admin with GET if id from token is a negative integer', async () => {
    const token = await Test.generateToken('-5050505050505');
    const response = await chai.request(app).get('/api/v1/buses').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get all bus data at "api/v1/buses" as an authenticated Admin with GET if id from token is a negative floating point number', async () => {
    const token = await Test.generateToken('-505050.5050505');
    const response = await chai.request(app).get('/api/v1/buses').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not get all bus data at "api/v1/buses" as an authenticated Admin with GET if id from token is a floating point number', async () => {
    const token = await Test.generateToken('505050.5050505');
    const response = await chai.request(app).get('/api/v1/buses').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });
});
