import authenticateUsers from '../auth/users';
import middleware from './middleware';
import validateTripData from '../data/trips';
import authenticateTrip from '../auth/trips';

export default class Trips {
  static create() {
    const validate = validateTripData.create.bind(validateTripData);
    const authAll = authenticateUsers.authenticateAll.bind(authenticateUsers);
    const authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    const authBus = authenticateTrip.verifyBus.bind(authenticateTrip);
    const authTripDate = authenticateTrip.verifyTripDate.bind(authenticateTrip);
    return middleware.routeCallbacks(validate, authAll, authAdmin, authBus, authTripDate);
  }

  static getAll() {
    const authAll = authenticateUsers.authenticateAll.bind(authenticateUsers);
    return middleware.routeCallbacks(authAll);
  }
}
