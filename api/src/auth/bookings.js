/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import errors from '../helpers/errors';
import queries from '../helpers/queries';

export default class Bookings {
  static async verifyTrip(req, res, next) {
    const { trip_id } = req.body;
    const findTripQuery = queries.findTripById();
    this.findTrip = await database.queryOneORNone(findTripQuery, [trip_id]);
    if (!this.findTrip) protocol.err404Res(res, errors.dataNotFound('Trip data'));
    else next();
  }

  static async verifySeatNo(req, res, next) {
    const { findTrip } = this;
    const { seats } = findTrip;
    const { seat_no } = req.body;
    if (parseInt(seat_no, 10) === 0) return protocol.err400Res(res, errors.noZeroSeatNo());
    const checkSeat = seats.find(seat => seat === parseInt(seat_no, 10));
    if (!checkSeat) return protocol.err400Res(res, errors.availableSeats(seats));
    return next();
  }
}
