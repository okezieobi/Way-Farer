import protocol from '../helpers/response';
import checkRequest from '../helpers/requests';

export default class Bookings {
  static create(req, res, next) {
    const { tripId, seatNumber } = req.body;
    const tripIdErr = checkRequest.validateInteger(tripId, 'Trip id');
    const seatNumberErr = checkRequest.validateInteger(seatNumber, 'Seat number');
    const findErr = checkRequest.findError(tripIdErr, seatNumberErr);
    if (findErr) protocol.err400Res(res, findErr);
    else next();
  }
}
