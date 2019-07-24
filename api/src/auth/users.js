/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import { UntitledErrors, TitledErrors } from '../helpers/errors';
import test from '../helpers/regex';
import { UserQueries } from '../helpers/queries';
import jwt from '../helpers/jwt';
import bcrypt from '../helpers/bcrypt';

export default class AuthenticateUsers {
  static async authEmailUsername(req) {
    const { username, email } = req.body;
    const user = await UserQueries.users(database.pool, email, username);
    return user;
  }

  static async signUp(req, res, next) {
    const user = await this.authEmailUsername(req);
    if (user) return protocol.err400Res(res, UntitledErrors.userExists());
    return next();
  }

  static async signIn(req, res, next) {
    this.verifyUser = await this.authEmailUsername(req);
    if (!this.verifyUser) return protocol.err404Res(res, UntitledErrors.userNotExists());
    return next();
  }

  static async verifyPassword(req, res, next) {
    const { password } = req.body;
    const { verifyUser } = this;
    const verifyPassword = await bcrypt.compare(verifyUser.password, password);
    if (!verifyPassword) protocol.err400Res(res, UntitledErrors.wrongPassword());
    else next();
  }

  static async authToken(req, res, next) {
    const { token } = req.headers;
    if (!token) return protocol.err400Res(res, UntitledErrors.tokenIsRequired());
    const verifyToken = await jwt.verify(token);
    // @ts-ignore
    const { userId, message, name } = verifyToken;
    if (name || message) return protocol.err400Res(res, { name, message }); // jwt error
    const checkId = await test.checkInteger(userId);
    if (!checkId) return protocol.err400Res(res, UntitledErrors.invalidToken());
    this.user_id = userId;
    return next();
  }

  static async authenticateAll(req, res, next) {
    this.findUser = await database.queryOneORNone(UserQueries.findUserById(), [this.user_id]);
    if (!this.findUser) return protocol.err404Res(res, UntitledErrors.wrongToken());
    return next();
  }

  static admin(req, res, next) {
    const { is_admin } = this.findUser;
    if (!is_admin) protocol.err400Res(res, TitledErrors.restrictedAccess('admin'));
    else next();
  }
}
