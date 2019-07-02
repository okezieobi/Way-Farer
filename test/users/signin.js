import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/auth/signin" to sign in a User with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should signin in a User at "/api/v1/auth/signin" with POST if all request inputs are valid', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('firstName').to.be.a('string');
    expect(response.body.data).to.have.property('lastName').to.be.a('string');
    expect(response.body.data).to.have.property('email').to.be.a('string').to.equal(testData.userEmail);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Client');
    expect(response.body).to.have.property('headers').to.be.an('object');
    expect(response.body.headers).to.have.property('access-token').to.be.a('string');
    expect(response.header).to.have.property('access-token').to.be.a('string');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email is undefined', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userEmail = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email is an empty string', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userEmail = '';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email is null', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userEmail = null;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email does not exist', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    delete testData.userEmail;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email has not been registered', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userEmail = 'haha@mail.com';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User does not exist, please sign up');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is undefined', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userPassword = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT sign in  a User at "/api/v1/auth/signin" if user password is an empty string', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userPassword = '';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is null', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userPassword = null;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not exist', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    delete testData.userPassword;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is not a minimum of 8 characters', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userPassword = 'dBcd!';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not have at least 1 upper case letter', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userPassword = '1234aodbcd!';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not have at least 1 lower case letter', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userPassword = '1234AODBCD!';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not have at least 1 number', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userPassword = 'odedeAODBCD!@';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not have at least 1 special character', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userPassword = 'odedeAODBCD123';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not not match with input password', async () => {
    const testData = {
      userEmail: 'foobar@mail.com',
      userPassword: 'AbcDFer123*@is!',
    };
    testData.userPassword = 'AbcDFer123*@is!90';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password does not match user');
  });
});
