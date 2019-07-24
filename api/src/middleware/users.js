import validateUserRequest from '../data/users';
import authenticateUsers from '../auth/users';
import middleware from './middleware';

export default class Users {
  static middleware(method) {
    const validateAll = validateUserRequest[method].bind(validateUserRequest);
    const authAll = authenticateUsers[method].bind(authenticateUsers);
    return { validateAll, authAll };
  }

  static signup() {
    const { validateAll, authAll } = Users.middleware('signUp');
    return middleware.routeCallbacks(validateAll, authAll);
  }

  static signin() {
    const { validateAll, authAll } = this.middleware('signIn');
    const authPassword = authenticateUsers.verifyPassword.bind(authenticateUsers);
    return middleware.routeCallbacks(validateAll, authAll, authPassword);
  }

  static authUsers() {
    const authToken = authenticateUsers.authToken.bind(authenticateUsers);
    const authAll = authenticateUsers.authenticateAll.bind(authenticateUsers);
    const authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    return { authToken, authAll, authAdmin };
  }
}
