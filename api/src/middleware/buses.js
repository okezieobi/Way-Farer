import validateBusData from '../data/buses';
import authenticateUsers from '../auth/users';
import middleware from './middleware';

export default class Buses {
  static create() {
    const validate = validateBusData.create.bind(validateBusData);
    const authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    return middleware.routeCallbacks(validate, authAdmin);
  }
}
