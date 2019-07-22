import authenticateUsers from '../auth/users';
import middleware from './middleware';
import authenticateBooking from '../auth/bookings';
import validateBooking from '../data/bookings';

export default class Bookings {
  static create() {
    const validate = validateBooking.create.bind(validateBooking);
    this.authAll = authenticateUsers.authenticateAll.bind(authenticateUsers);
    const authTrip = authenticateBooking.verifyTrip.bind(authenticateBooking);
    const authSeatNo = authenticateBooking.verifySeatNo.bind(authenticateBooking);
    return middleware.routeCallbacks(validate, this.authAll, authTrip, authSeatNo);
  }

  static getAll() {
    return middleware.routeCallbacks(this.authAll);
  }

  static deleteOne() {
    const validate = validateBooking.deleteOne.bind(validateBooking);
    const authBooking = authenticateBooking.verifyBookingId.bind(authenticateBooking);
    return middleware.routeCallbacks(validate, this.authAll, authBooking);
  }
}
