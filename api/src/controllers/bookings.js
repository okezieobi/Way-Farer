/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import { BookingQueries } from '../helpers/queries';
import models from '../models/bookings';
import authenticatedUser from '../auth/users';
import authenticatedTrip from '../auth/bookings';

export default class Bookings {
  static async create(req, res) {
    const { findUser } = authenticatedUser;
    const { findTrip } = authenticatedTrip;
    const { seats } = findTrip;
    const reqData = models.bookingsData(req.body, findUser.id, findTrip);
    const {
      id, tripId, userId, seatNo, origin, destination, busId, fare, tripDate,
    } = reqData;
    const bookingArrayData = [id, tripId, userId, seatNo, origin,
      destination, busId, tripDate, fare];
    const updatedTripSeatData = seats.filter(seat => seatNo !== seat);
    const newBooking = await BookingQueries.booking(database.pool, bookingArrayData,
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
}
