/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import { UntitledErrors, TitledErrors } from '../helpers/errors';
import { TripQueries, BookingQueries } from '../helpers/queries';
import authenticatedUsers from './users';

export default class Bookings {
  static async verifyTrip(req, res, next) {
    const { trip_id } = req.body;
    const { tripId } = req.params;
    const tripIdNo = tripId || trip_id;
    const findTripQuery = TripQueries.findTripById();
    this.findTrip = await database.queryOneORNone(findTripQuery, [tripIdNo]);
    if (!this.findTrip) protocol.err404Res(res, TitledErrors.dataNotFound('Trip data'));
    else next();
  }

  static async verifySeatNo(req, res, next) {
    const { findTrip } = this;
    const { seats } = findTrip;
    const { seat_no } = req.body;
    if (parseInt(seat_no, 10) === 0) return protocol.err400Res(res, UntitledErrors.noZeroSeatNo());
    const checkSeat = seats.find(seat => seat === parseInt(seat_no, 10));
    if (!checkSeat) return protocol.err400Res(res, TitledErrors.availableSeats(seats));
    return next();
  }

  static async verifyBookingId(req, res, next) {
    const { bookingId } = req.params;
    const { findUser } = authenticatedUsers;
    const findBookingQuery = BookingQueries.findBookingsByIdAndUserId();
    this.findBooking = await database.queryOneORNone(findBookingQuery, [bookingId, findUser.id]);
    if (!this.findBooking) protocol.err404Res(res, TitledErrors.dataNotFound('Booking data'));
    else next();
  }
}
