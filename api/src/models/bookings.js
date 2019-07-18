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

  static bookingsData(data, userId, trip) {
    const {
      fare, origin, destination, bus_id, trip_date,
    } = trip;
    const reqData = this.commonData(data);
    const { tripId, seatNo } = reqData;
    return {
      id: numbers.uniqueIds(),
      tripId,
      userId: parseInt(userId, 10),
      seatNo,
      origin: String(origin),
      destination: String(destination),
      busId: parseInt(bus_id, 10),
      fare: parseInt(fare, 10),
      tripDate: new Date(trip_date),
    };
  }

  static bookingDataRes(data, user) {
    const { first_name, last_name, email } = user;
    const {
      id, user_id, created_on, fare, origin, destination, bus_id, trip_date,
    } = data;
    const resData = this.commonData(data);
    const { tripId, seatNo } = resData;
    return {
      id: parseInt(id, 10),
      tripId,
      seatNo,
      userId: parseInt(user_id, 10),
      createdOn: String(created_on),
      firstName: String(first_name),
      lastName: String(last_name),
      email: String(email),
      origin: String(origin),
      destination: String(destination),
      busId: parseInt(bus_id, 10),
      fare: parseFloat(fare),
      tripDate: new Date(trip_date),
    };
  }

  static bookingDataArray(bookings, userData, tripData) {
    if (bookings) {
      return bookings.map(bookingData => this.bookingDataRes(bookingData, userData, tripData));
    }
    return bookings;
  }
}
