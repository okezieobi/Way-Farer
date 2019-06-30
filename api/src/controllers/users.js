import database from '../db/pgConnect';
// import password from '../helpers/bcrypt';
import token from '../helpers/jwt';
// import authenticateUsers from '../auth/users';
import protocol from '../helpers/response';
// import errors from '../helpers/errors';
import models from '../models/users';
import queries from '../helpers/queries';

export default class Users {
  static async signUp(req, res) {
    const reqData = await models.userDataPostgre(req.body);
    const {
      id, firstName, lastName, email, hashedPassword,
    } = reqData;
    const createUserQuery = queries.createClient();
    const arrayData = [id, firstName, lastName, email, hashedPassword];
    const newUser = await database.queryOne(createUserQuery, arrayData);
    const signUpRes = models.createUserDataResPostgre(newUser);
    const newToken = await token.generate(newUser.id);
    return protocol.auth201Res(res, signUpRes, newToken);
  }

  static async signinClients(req, res) {
    const { userPassword } = req.body;
    const userModel = models.createUserDataResPostgre;
    const signin = this.signinAll(req, res, userPassword, userModel);
    return signin;
  }
}
