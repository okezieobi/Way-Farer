/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import { BookingQueries } from '../helpers/queries';
import models from '../models/bookings';
import authenticatedUser from '../auth/users';
import authenticatedBooking from '../auth/bookings';

export default class Bookings {
  static async create(req, res) {
    const { findUser } = authenticatedUser;
    const { findTrip } = authenticatedBooking;
    const { seats } = findTrip;
    const { seat_no } = req.body;
    const bookingArrayData = models.postgresValues(req.body, findUser.id);
    const updatedTripSeatData = seats.filter(seat => parseInt(seat_no, 10) !== seat);
    const newBooking = await BookingQueries.createbooking(database.pool, bookingArrayData,
      [updatedTripSeatData, findTrip.id]);
    const newBookingRes = models.bookingDataRes(newBooking, findUser);
    return protocol.success201Res(res, newBookingRes);
  }

  static async getAll(req, res) {
    const { findUser } = authenticatedUser;
    const { is_admin, id } = findUser;
    let getBookingsQuery;
    let bookings;
    if (is_admin) {
      getBookingsQuery = BookingQueries.findAllBookings();
      bookings = await database.queryAny(getBookingsQuery);
    } else {
      getBookingsQuery = BookingQueries.findBookingsByUserId();
      bookings = await database.queryAny(getBookingsQuery, [id]);
    }
    const bookingsRes = models.bookingDataArray(bookings, findUser);
    return protocol.success200Res(res, bookingsRes);
  }

  static async deleteOne(req, res) {
    const { findBooking } = authenticatedBooking;
    const {
      id, trip_id, user_id, seat_no,
    } = findBooking;
    await BookingQueries.deleteBooking(database.pool, [id, user_id], seat_no, trip_id);
    return protocol.success200ResMessage(res, 'Booking successfully deleted');
  }
}
