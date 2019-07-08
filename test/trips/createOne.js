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
  });
});
