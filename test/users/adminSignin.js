import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/auth/signin/admin" to sign in an Admin with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should sign in an Admin at "/api/v1/auth/signin/admin" with POST if all request inputs are valid', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('username').to.be.a('string').to.equal(testData.username);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Admin');
    expect(response.body).to.have.property('token').to.be.a('string');
    expect(response.header).to.have.property('token').to.be.a('string');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if user name is an empty string', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.username = '';
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if user name is not string type', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.username = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username must be string type');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if user name is not sent in request', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    delete testData.username;
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if user name equals undefined', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.username = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if user name equals null', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.username = null;
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if user name is not an admin', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.username = 'okbobo';
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Admin does not exist, please sign up');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password is an empty string', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.password = '';
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password is not a string type', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.password = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be string type');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password is not sent', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    delete testData.password;
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password is undefined', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.password = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password is null', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.password = null;
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password does not match', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.password = 'AbcDFer123*@is!0wT';
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password does not match user');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password is not a minimum of 8 characters', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.password = 'dBcd!';
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password does not have at least 1 upper case letter', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.password = '1234aodbcd!';
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password does not have at least 1 lower case letter', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.password = '1234AODBCD!';
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password does not have at least 1 number', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.password = 'odedeAODBCD!@';
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password does not have at least 1 special character', async () => {
    const testData = {
      username: 'obiedere',
      password: 'AbcDFer123*@is!',
    };
    testData.password = 'odedeAODBCD123';
    const response = await chai.request(app).post('/api/v1/auth/signin/admin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });
});
