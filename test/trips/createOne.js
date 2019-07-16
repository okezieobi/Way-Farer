// Don't forget to adjust the testData.trip_date
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
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2020/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('busId').to.be.a('number').to.equal(parseInt(testData.bus_id, 10));
    expect(response.body.data).to.have.property('origin').to.be.a('string').to.equal(testData.origin);
    expect(response.body.data).to.have.property('destination').to.be.a('string').to.equal(testData.destination);
    expect(response.body.data).to.have.property('fare').to.be.a('number').to.equal(parseInt(testData.fare, 10));
    expect(response.body.data).to.have.property('tripDate').to.be.an('string');
    expect(response.body.data).to.have.property('seats').to.be.a('string');
    expect(response.body.data).to.have.property('status').to.be.a('string').to.equal('Active');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if Bus id is an empty string', async () => {
    const testData = {
      bus_id: '',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bus id is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if Bus id is not a string', async () => {
    const testData = {
      bus_id: 1000,
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bus id must be string type');
  });


  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if Bus id is undefined', async () => {
    const testData = {
      bus_id: undefined,
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bus id is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if Bus id is null', async () => {
    const testData = {
      bus_id: null,
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bus id is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if Bus id is not sent', async () => {
    const testData = {
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bus id is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if Bus id is a negative integer', async () => {
    const testData = {
      bus_id: '-2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bus id must be a positive integer');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if Bus id is a negative floating point number', async () => {
    const testData = {
      bus_id: '-202020.2020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bus id must be a positive integer');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if Bus id is a floating point number', async () => {
    const testData = {
      bus_id: '202020.2020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bus id must be a positive integer');
  });


  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if Bus id is not found', async () => {
    const testData = {
      bus_id: '2020202021010',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bus data not found');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip origin is an empty string', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: '',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip origin is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip origin is not a string', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 1000,
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip origin must be string type');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip origin is undefined', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: undefined,
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip origin is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip origin is null', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: null,
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip origin is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip origin is not sent', async () => {
    const testData = {
      bus_id: '2020202020202',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip origin is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip origin does not contain case insensitive letters', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: '100$%$3',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip origin must be letters');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip destination is an empty string', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: '',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip destination is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip destination is not string type', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 1000,
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip destination must be string type');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip destination is undefined', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: undefined,
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip destination is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip destination is null', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: null,
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip destination is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip destination is not sent', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip destination is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip destination does not contain case insensitive letters', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: '345#$%',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip destination must be letters');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is an empty string', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is not string type', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: 1000,
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare must be string type');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is undefined', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: undefined,
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is null', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: null,
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is not sent', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is a negative integer', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '-8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare must be a positive number');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip fare is a negative floating point number', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '-8.1',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip fare must be a positive number');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip date is an empty string', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip date is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip date is undefined', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: undefined,
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip date is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip date is null', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: null,
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip date is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip date is not sent', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip date is required');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip date is not in required format', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '201--Hdy$%5',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Provided trip date must be written in YYYY/MM/DD format');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if trip date is not valid', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2019/07/12',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Provided date is invalid');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if bus is already booked for provided date', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2020/07/17',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Provided trip date is incorrect, bus is already booked for a trip on requested date');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if token is an empty string', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = '';
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if token is not sent', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const response = await chai.request(app).post('/api/v1/trips').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if token is does not match admin', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('5050505050876');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if id from token is a negative integer', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('-5050505050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if id from token is a negative floating point number', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('-505050.5050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not create a trip at "api/v1/trips" as an authenticated Admin with POST if id from token is a floating point number', async () => {
    const testData = {
      bus_id: '2020202020202',
      origin: 'Port Harcourt',
      destination: 'Aba',
      fare: '8',
      trip_date: '2021/07/17',
    };
    const token = await Test.generateToken('505050.5050505');
    const response = await chai.request(app).post('/api/v1/trips').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });
});
