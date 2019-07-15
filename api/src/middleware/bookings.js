import authenticateUsers from '../auth/users';
import middleware from './middleware';
import authenticateBooking from '../auth/bookings';
import validateBooking from '../data/bookings';

export default class Bookings {
  static create() {
    const valildate = validateBooking.create.bind(validateBooking);
    const authClient = authenticateUsers.client.bind(authenticateUsers);
    const authTrip = authenticateBooking.verifyTrip.bind(authenticateBooking);
    const authSeatNo = authenticateBooking.verifySeatNo.bind(authenticateBooking);
    return middleware.routeCallbacks(valildate, authClient, authTrip, authSeatNo);
  }
}
