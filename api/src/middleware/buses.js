import validateBusData from '../data/buses';
import authenticateUsers from '../auth/users';
import authenticateBusData from '../auth/buses';
import middleware from './middleware';

export default class Buses {
  static create() {
    const validate = validateBusData.create.bind(validateBusData);
    const authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    const authNumberPlate = authenticateBusData.verifyNumberPlate.bind(authenticateBusData);
    return middleware.routeCallbacks(validate, authAdmin, authNumberPlate);
  }

  static getAll() {
    const authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    return middleware.routeCallbacks(authAdmin);
  }
}
