import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/auth/signup" to create a User with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should create a User at "/api/v1/auth/signup" with POST if all request inputs are valid', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'mama@mail.com',
      userPassword: '1234AOdBcd!',
    };
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('firstName').to.be.a('string').to.equal(testData.userFirstName);
    expect(response.body.data).to.have.property('lastName').to.be.a('string').to.equal(testData.userLastName);
    expect(response.body.data).to.have.property('email').to.be.a('string').to.equal(testData.userEmail);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Client');
    expect(response.body).to.have.property('headers').to.be.an('object');
    expect(response.body.headers).to.have.property('access-token').to.be.a('string');
    expect(response.header).to.have.property('access-token').to.be.a('string');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is undefined', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userFirstName = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('First name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is an empty string', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userFirstName = '';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('First name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is null', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userFirstName = null;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('First name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name does not exist', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    delete testData.userFirstName;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('First name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name are not letters', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userFirstName = '000@342';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('First name must be letters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user last name is undefined', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userLastName = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Last name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user last name is an empty string', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userLastName = '';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Last name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user last name is null', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userLastName = null;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Last name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user last name does not exist', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    delete testData.userLastName;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Last name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user last name are not letters', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userLastName = '9834#42*!';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Last name must be letters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is undefined', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userEmail = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is an empty string', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userEmail = '';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is null', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userEmail = null;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email does not exist', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    delete testData.userEmail;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email format is wrong', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userEmail = 'haha@com';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email format is wrong');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email has already been registered', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userEmail = 'mama@mail.com';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User exists, please sign in');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is undefined', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userPassword = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is an empty string', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userPassword = '';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is null', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userPassword = null;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not exist', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    delete testData.userPassword;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is not a minimum of 8 characters', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userPassword = '1OdBcd!';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 upper case letter', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userPassword = '1234aodbcd!';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 lower case letter', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userPassword = '1234AODBCD!';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 number', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userPassword = 'odedeAODBCD!';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 special character', async () => {
    const testData = {
      userFirstName: 'Frank',
      userLastName: 'Okezie',
      userEmail: 'haha@mail.com',
      userPassword: '1234AOdBcd!',
    };
    testData.userPassword = 'odedeAODBCD123';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });
});
