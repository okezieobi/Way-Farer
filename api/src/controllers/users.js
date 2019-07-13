import database from '../db/pgConnect';
import bcrypt from '../helpers/bcrypt';
import token from '../helpers/jwt';
import authenticateUsers from '../auth/users';
import protocol from '../helpers/response';
import errors from '../helpers/errors';
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
    const signUpRes = await models.createUserDataResPostgre(newUser);
    const newToken = await token.generate(newUser.id);
    return protocol.auth201Res(res, signUpRes, newToken);
  }

  static async signinAll(req, res, userPassword, model) {
    const { verifyUser } = authenticateUsers;
    const verifyPassword = await bcrypt.compare(verifyUser.password, userPassword);
    if (!verifyPassword) return protocol.err400Res(res, errors.wrongPassword());
    const signInRes = await model(verifyUser);
    const newToken = await token.generate(verifyUser.id);
    return protocol.auth200Res(res, signInRes, newToken);
  }

  static signinClients(req, res) {
    const { password } = req.body;
    const userModel = models.createUserDataResPostgre;
    return this.signinAll(req, res, password, userModel);
  }

  static signinAdmin(req, res) {
    const { adminPassword } = req.body;
    const adminModel = models.createAdminDataResPostgre;
    return this.signinAll(req, res, adminPassword, adminModel);
  }
}
