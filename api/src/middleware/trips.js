import authenticateUsers from '../auth/users';
import middleware from './middleware';
import validateTripData from '../data/trips';
import authenticateBusId from '../auth/trips';

export default class Trips {
  static create() {
    const validate = validateTripData.create.bind(validateTripData);
    const authAdmin = authenticateUsers.admin.bind(authenticateUsers);
    const authBusId = authenticateBusId.verifyBusId.bind(authenticateBusId);
    return middleware.routeCallbacks(validate, authBusId, authAdmin);
  }
}
