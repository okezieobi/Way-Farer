import database from '../db/pgConnect';
import models from '../models/trips';
import authenticatedBuses from '../auth/trips';
import queries from '../helpers/queries';
import protocol from '../helpers/response';

export default class Trips {
  static async create(req, res) {
    const { findBus } = authenticatedBuses;
    const { id } = findBus;
    const reqData = await models.tripData(req.body, id);
    const {
      tripId, busId, origin, destination, fare, tripDate,
    } = reqData;
    const createTripQuery = queries.createTrip();
    const arrayData = [tripId, busId, origin, destination, fare, tripDate];
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
