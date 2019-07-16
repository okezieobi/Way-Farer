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
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('firstName').to.be.a('string').to.equal(testData.first_name);
    expect(response.body.data).to.have.property('userName').to.be.a('string').to.equal(testData.username);
    expect(response.body.data).to.have.property('lastName').to.be.a('string').to.equal(testData.last_name);
    expect(response.body.data).to.have.property('email').to.be.a('string').to.equal(testData.email);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Client');
    expect(response.body).to.have.property('token').to.be.a('string');
    expect(response.header).to.have.property('token').to.be.a('string');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is undefined', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is not string type', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username must be string type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is an empty string', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = '';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is null', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = null;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is not sent', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.username;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is not made up of letters and numbers', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = '$%^&*@#$$%';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username must be letters and numbers');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is undefined', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.first_name = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('First name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is not type string', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.first_name = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('First name must be string type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is an empty string', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.first_name = '';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('First name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is null', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.first_name = null;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('First name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name does not exist', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.first_name;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('First name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name are not letters', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.first_name = '000@342';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('First name must be letters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user last name is undefined', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.last_name = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Last name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user last name is not string type', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.last_name = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Last name must be string type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user last name is an empty string', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.last_name = '';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Last name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user last name is null', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.last_name = null;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Last name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user last name does not exist', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.last_name;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Last name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user last name are not letters', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.last_name = '9834#42*!';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Last name must be letters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is undefined', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is not string type', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email must be string type');
  });


  it('Should NOT create a User at "/api/v1/auth/signup" if user email is an empty string', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = '';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is null', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = null;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email does not exist', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.email;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email format is wrong', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = 'haha@com';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email format is wrong');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email has already been registered', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = 'mama@mail.com';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User exists, please sign in with email or username');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is undefined', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = undefined;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is not string type', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be string type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is an empty string', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = '';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is null', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = null;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not exist', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.password;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is not a minimum of 8 characters', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = '1OdBcd!';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 upper case letter', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = '1234aodbcd!';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 lower case letter', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = '1234AODBCD!';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 number', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = 'odedeAODBCD!';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not have at least 1 special character', async () => {
    const testData = {
      first_name: 'Frank',
      last_name: 'Okezie',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = 'odedeAODBCD123';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });
});
