import protocol from '../helpers/response';
import database from '../db/pgConnect';
import errors from '../helpers/errors';
import test from '../helpers/regex';
import queries from '../helpers/queries';
import jwt from '../helpers/jwt';

export default class AuthenticateUsers {
  static async signUpAll(req, res, next, userData, findUserQuery, userTitle) {
    const data = req.body[userData];
    const checkUserQuery = queries[findUserQuery]();
    const user = await database.queryOneORNone(checkUserQuery, [data]);
    if (user) return protocol.err400Res(res, errors.userExists(`${userTitle}`));
    return next();
  }

  static signUp(req, res, next) {
    return this.signUpAll(req, res, next, 'email', 'findClientByEmail', 'User');
  }

  static async signInAll(req, res, next, query, title, data) {
    const userData = req.body[data];
    this.verifyUser = await database.queryOneORNone(queries[query](), [userData]);
    if (!this.verifyUser) return protocol.err404Res(res, errors.userNotExists(`${title}`));
    return next();
  }

  static signIn(req, res, next) {
    return this.signInAll(req, res, next, 'findClientByEmail', 'User', 'email');
  }

  static signinAdmin(req, res, next) {
    return this.signInAll(req, res, next, 'findAdminByUsername', 'Admin', 'username');
  }

  static async authenticateAll(req, res, next, tokenTitle, query, title) {
    const token = req.headers[tokenTitle];
    if (!token) return protocol.err400Res(res, errors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId } = verifyToken;
    const checkId = await test.checkInteger(userId);
    if (!checkId) return protocol.err400Res(res, errors.invalidToken());
    this.findUser = await database.queryOneORNone(queries[query](), [userId]);
    if (!this.findUser) return protocol.err404Res(res, errors.wrongToken([title]));
    return next();
  }

  static admin(req, res, next) {
    return this.authenticateAll(req, res, next, 'token', 'findAdminById', 'admin');
  }

  static client(req, res, next) {
    return this.authenticateAll(req, res, next, 'client-token', 'findClientById', 'client');
  }
}
