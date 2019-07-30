import authenticateUsers from './users';
import middleware from './middleware';
import validateTripData from '../data/trips';
import authenticateTrip from '../auth/trips';
import authenticateMoreTripData from '../auth/bookings';

export default class Trips {
  static create() {
    const { authToken, authAll, authAdmin } = authenticateUsers.authUsers();
    const validate = validateTripData.create.bind(validateTripData);
    const authBus = authenticateTrip.verifyBus.bind(authenticateTrip);
    const authTripDate = authenticateTrip.verifyTripDate.bind(authenticateTrip);
    return middleware.routeCallbacks(validate, authToken, authAll,
      authAdmin, authBus, authTripDate);
  }

  static getAll() {
    const { authToken, authAll } = authenticateUsers.authUsers();
    return middleware.routeCallbacks(authToken, authAll);
  }

  static updateStatus() {
    const { authToken, authAll, authAdmin } = authenticateUsers.authUsers();
    const validate = validateTripData.updateStatus.bind(validateTripData);
    const authTrip = authenticateMoreTripData.verifyTrip.bind(authenticateMoreTripData);
    const authStatus = authenticateTrip.verifyTripStatus.bind(authenticateTrip);
    return middleware.routeCallbacks(validate, authToken, authAll,
      authAdmin, authTrip, authStatus);
  }
}
