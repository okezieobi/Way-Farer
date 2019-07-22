import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoint at "api/v1/buses" that creates a bus data as an authenticated Admin with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should create a bus data at "api/v1/buses" as an authenticated Admin with POST if all input data are valid', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('numberPlate').to.be.a('string');
    expect(response.body.data).to.have.property('manufacturer').to.be.a('string').to.equal(testData.manufacturer);
    expect(response.body.data).to.have.property('model').to.be.a('string').to.equal(testData.model);
    expect(response.body.data).to.have.property('year').to.be.a('number').to.equal(parseInt(testData.year, 10));
    expect(response.body.data).to.have.property('capacity').to.be.a('number').to.equal(parseInt(testData.capacity, 10));
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if number plate is an empty string', async () => {
    const testData = {
      number_plate: '',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if number plate is not string type', async () => {
    const testData = {
      number_plate: 1000,
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate must be string type');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if number plate is undefined', async () => {
    const testData = {
      number_plate: undefined,
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if number plate is null', async () => {
    const testData = {
      number_plate: null,
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if number plate is not sent', async () => {
    const testData = {
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if number plate does not contain capital letters', async () => {
    const testData = {
      number_plate: 'ggg000ff',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate must be capital letters and positive integers of exactly 8 characters');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if number plate does not contain positive integers', async () => {
    const testData = {
      number_plate: 'GGG0.00FFF',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate must be capital letters and positive integers of exactly 8 characters');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if number plate is not exactly 8 characters in length', async () => {
    const testData = {
      number_plate: 'GGG0000FFF',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Number plate must be capital letters and positive integers of exactly 8 characters');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if number plate already exists', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Bus data with number plate already exists');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if manufacturer is an empty string', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: '',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Manufacturer is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if manufacturer is not type string', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 1000,
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Manufacturer must be string type');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if manufacturer is undefined', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: undefined,
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Manufacturer is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if manufacturer is null', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: null,
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Manufacturer is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if manufacturer is not sent', async () => {
    const testData = {
      number_plate: 'ERT99948',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Manufacturer is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if manufacturer does not contain case insensitive letters', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: '99990$%$',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Manufacturer must be letters');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if model is an empty string', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: '',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Model is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if model is not string type', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 1000,
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Model must be string type');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if model is undefined', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: undefined,
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Model is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if model is null', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: null,
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Model is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if model is not sent', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Model is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if model are not letters', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: '9904%$',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Model must be letters');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if year is an empty string', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Year is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if year is not a string type', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: 1000,
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Year must be string type');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if year is undefined', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: undefined,
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Year is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if year is null', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: null,
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Year is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if year is not sent', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Year is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if year is a floating point number', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '20.10',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Year must be a positive integer');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if year is a negative floating point number', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '-20.10',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Year must be a positive integer');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if year is a negative integer', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '-2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Year must be a positive integer');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if capacity is an empty string', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Capacity is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if capacity is undefined', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: undefined,
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Capacity is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if capacity is not string type', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: 1000,
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Capacity must be string type');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if capacity is null', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: null,
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Capacity is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if capacity is not sent', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Capacity is required');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if capacity is a negative integer', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '-8',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Capacity must be a positive integer');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if capacity is a negative floating point number', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '-8.1',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Capacity must be a positive integer');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if capacity is a floating point number', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8.1',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Capacity must be a positive integer');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if token is an empty string', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = '';
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if token is not sent', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const response = await chai.request(app).post('/api/v1/buses').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if token is does not match any user', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('5050505050876');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if token is does not match admin', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Only admin can access this resource');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if id from token is a negative integer', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('-5050505050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if id from token is a negative floating point number', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('-505050.5050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if id from token is a floating point number', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = await Test.generateToken('505050.5050505');
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });

  it('Should not create a bus data at "api/v1/buses" as an authenticated Admin with POST if token is invalid', async () => {
    const testData = {
      number_plate: 'ERT99948',
      manufacturer: 'toyota',
      model: 'sienna',
      year: '2010',
      capacity: '8',
    };
    const token = 5050505050505;
    const response = await chai.request(app).post('/api/v1/buses').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('object');
    expect(response.body.error).to.have.property('name').to.be.a('string');
    expect(response.body.error).to.have.property('message').to.be.a('string');
  });
});
