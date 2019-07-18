/* eslint-disable camelcase */
import numbers from '../helpers/uniqueNos';

export default class Bookings {
  static commonData(data) {
    const { trip_id, seat_no } = data;
    return {
      tripId: parseInt(trip_id, 10),
      seatNo: parseInt(seat_no, 10),
    };
  }

  static bookingsData(data, userId) {
    const reqData = this.commonData(data);
    const { tripId, seatNo } = reqData;
    return {
      id: numbers.uniqueIds(),
      tripId,
      userId: parseInt(userId, 10),
      seatNo,
    };
  }

  static bookingDataRes(data, user) {
    const { first_name, last_name, email } = user;
    const { id, user_id, created_on } = data;
    const reqData = this.commonData(data);
    const { tripId, seatNo } = reqData;
    return {
      id: parseInt(id, 10),
      tripId,
      seatNo,
      userId: parseInt(user_id, 10),
      createdOn: String(created_on),
      firstName: String(first_name),
      lastName: String(last_name),
      email: String(email),
    };
  }

  static bookingDataArray(bookings, userData) {
    if (bookings) {
      return bookings.map(bookingData => this.bookingDataRes(bookingData, userData));
    }
    return bookings;
  }
}
