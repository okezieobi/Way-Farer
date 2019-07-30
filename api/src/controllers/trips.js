import database from '../db/pgConnect';
import models from '../models/trips';
import { TripQueries } from '../helpers/queries';
import protocol from '../helpers/response';
import authenticatedBus from '../auth/trips';
import mainController from './controller';

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
    const createTripQuery = TripQueries.createTrip();
    const arrayData = [...models.postgresData(req.body), ...[seats]];
    const createTrip = await database.queryOne(createTripQuery, arrayData);
    const newTripRes = await models.tripDataRes(createTrip);
    return protocol.success201Res(res, newTripRes);
  }

  static async getAll(req, res) {
    const getAllTripsQuery = TripQueries.getAllTrips();
    await mainController.getAll(req, res, getAllTripsQuery, models.tripDataArray);
  }

  static async updateStatus(req, res) {
    const { tripId } = req.params;
    const { status } = req.body;
    const updateStatusQuery = TripQueries.updateTripById();
    await database.queryNone(updateStatusQuery, [status, tripId]);
    return protocol.success200ResMessage(res, `Trip status successfully updated to ${status.toLowerCase()}`);
  }
}
