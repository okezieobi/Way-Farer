import database from '../db/pgConnect';
import models from '../models/trips';
import queries from '../helpers/queries';
import protocol from '../helpers/response';
import authenticatedBus from '../auth/trips';

export default class Trips {
  static createSeats(integer) {
    const seats = [];
    for (let seatIndex = 1; seatIndex <= integer; seatIndex += 1) {
      seats.push(seatIndex);
    }
    return seats;
  }

  static async create(req, res) {
    const { findBus } = authenticatedBus;
    const seats = this.createSeats(findBus.capacity);
    const reqData = await models.tripData(req.body);
    const {
      tripId, busId, origin, destination, fare, tripDate,
    } = reqData;
    const createTripQuery = queries.createTrip();
    const arrayData = [tripId, busId, origin, destination, fare, tripDate, seats];
    const createTrip = await database.queryOne(createTripQuery, arrayData);
    const newTripRes = await models.tripDataRes(createTrip);
    return protocol.success201Res(res, newTripRes);
  }

  static async getAll(req, res) {
    const getAllTripsQuery = queries.getAllTrips();
    const allTrips = await database.queryAny(getAllTripsQuery);
    const allTripsRes = await models.tripDataArray(allTrips);
    return protocol.success200Res(res, allTripsRes);
  }
}
