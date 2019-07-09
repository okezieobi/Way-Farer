import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoint at "api/v1/trips" that creates a trip as an authenticated Admin with POST', () => {
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

  it('Should create a trip at "api/v1/trips" as an authenticated Admin if all input data are valid', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('busId').to.be.a('number');
    expect(response.body.data).to.have.property('origin').to.be.a('string').to.equal(testData.origin);
    expect(response.body.data).to.have.property('destination').to.be.a('string').to.equal(testData.destination);
    expect(response.body.data).to.have.property('fare').to.be.a('number').to.equal(testData.fare);
    expect(response.body.data).to.have.property('tripDate').to.be.a('string');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if number plate is an empty string', async () => {
    const testData = {
      numberPlate: '',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if number plate is undefined', async () => {
    const testData = {
      numberPlate: undefined,
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if number plate is null', async () => {
    const testData = {
      numberPlate: null,
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if number plate is not sent', async () => {
    const testData = {
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if number plate is does not contain capital letters', async () => {
    const testData = {
      numberPlate: 'ggg000ff',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate must be capital letters and positive integers of exactly 8 characters');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if number plate is does not contain positive integers', async () => {
    const testData = {
      numberPlate: 'GGG0.00FFF',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate must be capital letters and positive integers of exactly 8 characters');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if number plate is does not exactly 8 characters', async () => {
    const testData = {
      numberPlate: 'GGG0000FFF',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate must be capital letters and positive integers of exactly 8 characters');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if number plate is not found', async () => {
    const testData = {
      numberPlate: 'ERT99948',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bus data not found');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip origin is an empty string', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: '',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip origin is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip origin is undefined', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: undefined,
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip origin is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip origin is null', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: null,
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip origin is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip origin is not sent', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip origin is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip origin does not contain case insensitive letters', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: '100$%$3',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip origin must be letters');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip destination is an empty string', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: '',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip destination is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip destination is undefined', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: undefined,
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip destination is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip destination is null', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: null,
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip destination is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip destination is not sent', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip destination is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip destination does not contain case insensitive letters', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: '345#$%',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip destination must be letters');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is an empty string', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '',
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is undefined', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: undefined,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is null', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: null,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is not sent', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is a negative integer', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: -8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare must be a positive number');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is a negative floating point number', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: -8.1,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare must be a positive number');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip date is an empty string', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip date is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip date is undefined', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: undefined,
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip date is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip date is null', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: null,
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip date is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip date is not sent', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip date is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip date is not in required format', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '201--Hdy$%5',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Provided trip date must be written in YYYY-MM-DD format');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if token is an empty string', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = '';
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if token is not sent', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const response = await chai.request(app).post('/api/v1/trips').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if token is does not match admin', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('5050505050876');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any admin');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if id from token is a negative integer', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('-5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if id from token is a negative floating point number', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('-505050.5050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if id from token is a floating point number', async () => {
    const testData = {
      numberPlate: 'STR101AG',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 8,
      tripDate: '2019/07/09',
    };
    const token = await Test.generateToken('505050.5050505');
    const response = await chai.request(app).post('/api/v1/trips').set('admin-token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });
});
