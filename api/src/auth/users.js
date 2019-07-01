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
}
