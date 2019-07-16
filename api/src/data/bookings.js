/* eslint-disable camelcase */
import protocol from '../helpers/response';
import checkRequest from '../helpers/requests';

export default class Bookings {
  static create(req, res, next) {
    const { trip_id, seat_no } = req.body;
    const tripIdErr = checkRequest.validateInteger(trip_id, 'Trip id');
    const seatNumberErr = checkRequest.validateInteger(seat_no, 'Seat number');
    const findErr = checkRequest.findError(tripIdErr, seatNumberErr);
    if (findErr) protocol.err400Res(res, findErr);
    else next();
  }
}
