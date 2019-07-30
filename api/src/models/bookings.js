/* eslint-disable camelcase */
import numbers from '../helpers/uniqueNos';
import commonModel from './model';

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

  static bookingDataRes(data) {
    const {
      id, user_id, created_on, fare, origin, destination,
      bus_id, trip_date, first_name, last_name, email,
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

  static postgresValues(data, user_id) {
    const {
      id, tripId, userId, seatNo,
    } = this.bookingsData(data, user_id);
    return commonModel.postgreValues(id, tripId, userId, seatNo);
  }

  static bookingDataArray(bookings, userData, tripData) {
    if (bookings) {
      return bookings.map(bookingData => this.bookingDataRes(bookingData, userData, tripData));
    }
    return bookings;
  }
}
