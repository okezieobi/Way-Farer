/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import errors from '../helpers/errors';
import test from '../helpers/regex';
import queries from '../helpers/queries';
import jwt from '../helpers/jwt';

export default class AuthenticateUsers {
  static async authEmailUsername(req) {
    const { username, email } = req.body;
    const user = await queries.users(database.pool, email, username);
    return user;
  }

  static async signUp(req, res, next) {
    const user = await this.authEmailUsername(req);
    if (user) return protocol.err404Res(res, errors.userExists());
    return next();
  }

  static async signIn(req, res, next) {
    this.verifyUser = await this.authEmailUsername(req);
    if (!this.verifyUser) return protocol.err404Res(res, errors.userNotExists());
    return next();
  }

  static async authenticateAll(req, res, next) {
    const { token } = req.headers;
    if (!token) return protocol.err400Res(res, errors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId } = verifyToken;
    const checkId = await test.checkInteger(userId);
    if (!checkId) return protocol.err400Res(res, errors.invalidToken());
    this.findUser = await database.queryOneORNone(queries.findUserById(), [userId]);
    if (!this.findUser) return protocol.err404Res(res, errors.wrongToken());
    return next();
  }

  static admin(req, res, next) {
    const { findUser } = this;
    const { is_admin } = findUser;
    if (!is_admin) protocol.err400Res(res, errors.restrictedAccess('admin'));
    else next();
  }
}
