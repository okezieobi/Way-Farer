import protocol from '../helpers/response';
import database from '../db/pgConnect';
import errors from '../helpers/errors';
// import test from '../helpers/regex';
import queries from '../helpers/queries';
// import jwt from '../helpers/jwt';

export default class AuthenticateUsers {
  static async signUpAll(req, res, next, userData, findUserQuery, userTitle) {
    const data = req.body[userData];
    const checkUserQuery = queries[findUserQuery]();
    const user = await database.queryOneORNone(checkUserQuery, [data]);
    if (user) return protocol.err400Res(res, errors.userExists(`${userTitle}`));
    return next();
  }

  static signUp(req, res, next) {
    return this.signUpAll(req, res, next, 'userEmail', 'findClientByEmail', 'User');
  }

  static async signInAll(req, res, next, query, title, data) {
    const userData = req.body[data];
    this.verifyUser = await database.queryOneORNone(queries[query](), [userData]);
    if (!this.verifyUser) return protocol.err404Res(res, errors.userNotExists(`${title}`));
    return next();
  }

  static signIn(req, res, next) {
    return this.signInAll(req, res, next, 'findClientByEmail', 'User', 'userEmail');
  }

  static signinAdmin(req, res, next) {
    return this.signInAll(req, res, next, 'findAdminByUsername', 'Admin', 'userName');
  }
}
