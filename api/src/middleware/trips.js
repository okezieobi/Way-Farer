import authenticateUsers from '../auth/users';
import middleware from './middleware';
import validateTripData from '../data/trips';
import authenticateTrip from '../auth/trips';
import authenticateMoreTripData from '../auth/bookings';

export default class Trips {
  static create() {
    const validate = validateTripData.create.bind(validateTripData);
    this.authAll = authenticateUsers.authenticateAll.bind(authenticateUsers);
    this.authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    const authBus = authenticateTrip.verifyBus.bind(authenticateTrip);
    const authTripDate = authenticateTrip.verifyTripDate.bind(authenticateTrip);
    return middleware.routeCallbacks(validate, this.authAll, this.authAdmin, authBus, authTripDate);
  }

  static getAll() {
    return middleware.routeCallbacks(this.authAll);
  }

  static updateStatus() {
    const validate = validateTripData.updateStatus.bind(validateTripData);
    const authTrip = authenticateMoreTripData.verifyTrip.bind(authenticateMoreTripData);
    const authStatus = authenticateTrip.verifyTripStatus.bind(authenticateTrip);
    return middleware.routeCallbacks(validate, this.authAll, this.authAdmin, authTrip, authStatus);
  }
}
