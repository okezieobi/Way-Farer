import validateBusData from '../data/buses';
import authenticateUsers from './users';
import authenticateBusData from '../auth/buses';
import middleware from './middleware';

export default class Buses {
  static create() {
    const { authToken, authAll, authAdmin } = authenticateUsers.authUsers();
    const validate = validateBusData.create.bind(validateBusData);
    const authNumberPlate = authenticateBusData.verifyNumberPlate.bind(authenticateBusData);
    return middleware.routeCallbacks(validate, authToken,
      authAll, authAdmin, authNumberPlate);
  }

  static getAll() {
    const { authToken, authAll, authAdmin } = authenticateUsers.authUsers();
    return middleware.routeCallbacks(authToken, authAll, authAdmin);
  }
}
