/* eslint-disable camelcase */
import numbers from '../helpers/uniqueNos';
import commonModel from './model';

export default class Trips {
  static commonTripData(commonData) {
    const {
      bus_id, origin, destination, fare, trip_date,
    } = commonData;
    return {
      origin,
      destination,
      fare: parseInt(fare, 10),
      tripDate: new Date(trip_date),
      busId: parseInt(bus_id, 10),
    };
  }

  static tripData(data) {
    const busData = this.commonTripData(data);
    const {
      busId, origin, destination, fare, tripDate,
    } = busData;
    return {
      tripId: numbers.uniqueIds(),
      busId,
      tripDate,
      origin,
      destination,
      fare,
    };
  }

  static tripDataRes(data) {
    const { id, seats, status } = data;
    const busData = Trips.commonTripData(data);
    const {
      busId, origin, destination, fare,
    } = busData;
    return {
      id: parseInt(id, 10),
      busId,
      tripDate: new Date(data.trip_date),
      origin,
      destination,
      fare,
      status: String(status),
      seats: String(seats.join(', ')),
    };
  }

  static postgresData(tripReqData) {
    const {
      tripId, busId, origin, destination, fare, tripDate,
    } = this.tripData(tripReqData);
    return commonModel.postgreValues(tripId, busId, origin, destination, fare, tripDate);
  }

  static tripDataArray(array) {
    if (array) {
      return commonModel.modifyArray(array, Trips.tripDataRes);
    }
    return array;
  }
}
