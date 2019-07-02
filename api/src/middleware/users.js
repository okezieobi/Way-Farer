import validateUserRequest from '../data/users';
import authenticateUsers from '../auth/users';
import middleware from './middleware';

export default class Users {
  static users(method) {
    const validateAll = validateUserRequest[method].bind(validateUserRequest);
    const authAll = authenticateUsers[method].bind(authenticateUsers);
    return middleware.routeCallbacks(validateAll, authAll);
  }

  static signupClients() {
    return this.users('signUp');
  }

  static signinClients() {
    return this.users('signIn');
  }

  static signinAdmin() {
    return this.users('signinAdmin');
  }
}
