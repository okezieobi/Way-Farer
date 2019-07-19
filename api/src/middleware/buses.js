import validateBusData from '../data/buses';
import authenticateUsers from '../auth/users';
import authenticateBusData from '../auth/buses';
import middleware from './middleware';

export default class Buses {
  static create() {
    const validate = validateBusData.create.bind(validateBusData);
    this.authAll = authenticateUsers.authenticateAll.bind(authenticateUsers);
    this.authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    const authNumberPlate = authenticateBusData.verifyNumberPlate.bind(authenticateBusData);
    return middleware.routeCallbacks(validate, this.authAll, this.authAdmin, authNumberPlate);
  }

  static getAll() {
    return middleware.routeCallbacks(this.authAll, this.authAdmin);
  }
}
