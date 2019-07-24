import authenticateUsers from './users';
import middleware from './middleware';
import authenticateBooking from '../auth/bookings';
import validateBooking from '../data/bookings';

export default class Bookings {
  static create() {
    const { authToken, authAll } = authenticateUsers.authUsers();
    const validate = validateBooking.create.bind(validateBooking);
    const authTrip = authenticateBooking.verifyTrip.bind(authenticateBooking);
    const authSeatNo = authenticateBooking.verifySeatNo.bind(authenticateBooking);
    return middleware.routeCallbacks(validate, authToken, authAll, authTrip, authSeatNo);
  }

  static getAll() {
    const { authToken, authAll } = authenticateUsers.authUsers();
    return middleware.routeCallbacks(authToken, authAll);
  }

  static deleteOne() {
    const { authToken, authAll } = authenticateUsers.authUsers();
    const validate = validateBooking.deleteOne.bind(validateBooking);
    const authBooking = authenticateBooking.verifyBookingId.bind(authenticateBooking);
    return middleware.routeCallbacks(validate, authToken, authAll, authBooking);
  }
}
