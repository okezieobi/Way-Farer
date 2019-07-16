import validateBusData from '../data/buses';
import authenticateUsers from '../auth/users';
import authenticateBusData from '../auth/buses';
import middleware from './middleware';

export default class Buses {
  static create() {
    const validate = validateBusData.create.bind(validateBusData);
    const authAll = authenticateUsers.authenticateAll.bind(authenticateUsers);
    const authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    const authNumberPlate = authenticateBusData.verifyNumberPlate.bind(authenticateBusData);
    return middleware.routeCallbacks(validate, authAll, authAdmin, authNumberPlate);
  }

  static getAll() {
    const authAll = authenticateUsers.authenticateAll.bind(authenticateUsers);
    const authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    return middleware.routeCallbacks(authAll, authAdmin);
  }
}
