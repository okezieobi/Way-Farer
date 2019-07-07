import numbers from '../helpers/uniqueNos';

export default class Trips {
  static commonTripData(commonData) {
    const {
      origin, destination, fare,
    } = commonData;
    return {
      origin: String(origin),
      destination: String(destination),
      fare: parseInt(fare, 10),
    };
  }

  static tripData(data, busId) {
    const busData = this.commonTripData(data);
    const {
      origin, destination, fare,
    } = busData;
    return {
      tripId: numbers.uniqueIds(),
      busId: parseInt(busId, 10),
      origin,
      destination,
      fare,
    };
  }

  static tripDataRes(data) {
    const { id } = data;
    const busData = this.commonTripData(data);
    const {
      origin, destination, fare,
    } = busData;
    return {
      id: parseInt(id, 10),
      busId: parseInt(data.bus_id, 10),
      origin,
      destination,
      fare,
    };
  }
}
