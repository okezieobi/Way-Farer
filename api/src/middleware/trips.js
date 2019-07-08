import authenticateUsers from '../auth/users';
import middleware from './middleware';
import validateTripData from '../data/trips';
import authenticateTrip from '../auth/trips';

export default class Trips {
  static create() {
    const validate = validateTripData.create.bind(validateTripData);
    const authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    const authBus = authenticateTrip.verifyBus.bind(authenticateTrip);
    const authTripDate = authenticateTrip.verifyTripDate.bind(authenticateTrip);
    return middleware.routeCallbacks(validate, authAdmin, authBus, authTripDate);
  }
}
