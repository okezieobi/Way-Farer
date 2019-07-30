import database from '../db/pgConnect';
import token from '../helpers/jwt';
import authenticateUsers from '../auth/users';
import protocol from '../helpers/response';
import models from '../models/users';
import { UserQueries } from '../helpers/queries';

export default class Users {
  static async signUp(req, res) {
    const createUserQuery = UserQueries.createClient();
    const arrayData = models.postgresData(req.body);
    const newUser = await database.queryOne(createUserQuery, arrayData);
    const signUpRes = await models.createUserDataResPostgre(newUser);
    const newToken = await token.generate(newUser.id);
    return protocol.auth201Res(res, signUpRes, newToken);
  }

  static async signIn(req, res) {
    const { verifyUser } = authenticateUsers;
    const signInRes = await models.createUserDataResPostgre(verifyUser);
    const newToken = await token.generate(verifyUser.id);
    return protocol.auth200Res(res, signInRes, newToken);
  }
}
