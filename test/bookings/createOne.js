// Don't forget to adjust the testData.trip_date
import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoint at "api/v1/bookings" that creates a booking as an authenticated Client with POST', () => {
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

  it('Should create a booking at "api/v1/bookings" as an authenticated Client with POST if all input data is valid', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('tripId').to.be.a('number').to.equal(parseInt(testData.trip_id, 10));
    expect(response.body.data).to.have.property('seatNo').to.be.a('number').to.equal(parseInt(testData.seat_no, 10));
    expect(response.body.data).to.have.property('userId').to.be.a('number');
    expect(response.body.data).to.have.property('createdOn').to.be.a('string');
    expect(response.body.data).to.have.property('firstName').to.be.a('string');
    expect(response.body.data).to.have.property('lastName').to.be.a('string');
    expect(response.body.data).to.have.property('email').to.be.a('string');
    expect(response.body.data).to.have.property('origin').to.be.a('string');
    expect(response.body.data).to.have.property('destination').to.be.a('string');
    expect(response.body.data).to.have.property('busId').to.be.a('number');
    expect(response.body.data).to.have.property('fare').to.be.a('number');
    expect(response.body.data).to.have.property('tripDate').to.be.a('string');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if seat no is not string type', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.seat_no = 1000;
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Seat number must be string type');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if seat no is an empty string', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.seat_no = '';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Seat number is required');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if seat no is undefined', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.seat_no = undefined;
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Seat number is required');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if seat no is null', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.seat_no = null;
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Seat number is required');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if seat no is not sent', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    delete testData.seat_no;
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Seat number is required');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if seat no is a negative integer', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.seat_no = '-2';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Seat number must be a positive integer');
  });


  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if seat no is a negative floating point number', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.seat_no = '-2.1';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Seat number must be a positive integer');
  });


  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if seat no is a floating point number', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.seat_no = '2.1';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Seat number must be a positive integer');
  });


  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if seat no is not a number', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.seat_no = 'rt$%fDFG@@';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Seat number must be a positive integer');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if seat no is 0', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.seat_no = '0';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Seat number can not be 0');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if seat no is unavailable', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.seat_no = '2';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string');
  });


  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if trip_id is not string type', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.trip_id = 1000;
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id must be string type');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if trip_id is an empty string', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.trip_id = '';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id is required');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if trip_id is undefined', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.trip_id = undefined;
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id is required');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if trip_id is null', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.trip_id = null;
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id is required');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if trip_id is not sent', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    delete testData.trip_id;
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id is required');
  });

  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if trip_id is a negative integer', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.trip_id = '-3030303030303';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id must be a positive integer');
  });


  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if trip_id is a negative floating point numnber', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.trip_id = '-3030303.030303';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id must be a positive integer');
  });


  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if trip_id is a floating point number', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.trip_id = '303030.3030303';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id must be a positive integer');
  });


  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if trip_id is not a number', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.trip_id = '-$%^&*()&tyDEDEer#$';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip id must be a positive integer');
  });


  it('Should not create a booking at "api/v1/bookings" as an authenticated Client if trip_id is a not found', async () => {
    const testData = {
      seat_no: '2',
      trip_id: '3030303030303',
    };
    testData.trip_id = '3030303031111';
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/bookings').set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Trip data not found');
  });
});
