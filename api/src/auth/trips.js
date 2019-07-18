/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import { UntitledErrors, TitledErrors } from '../helpers/errors';
import queries from '../helpers/queries';

export default class {
  static async verifyBus(req, res, next) {
    const { bus_id } = req.body;
    const findBusQuery = queries.findBusById;
    this.findBus = await database.queryOneORNone(findBusQuery, [bus_id]);
    if (!this.findBus) protocol.err404Res(res, TitledErrors.dataNotFound('Bus data'));
    else next();
  }

  static async verifyTripDate(req, res, next) {
    const { trip_date, bus_id } = req.body;
    const findTripsByBusIdAndDateQuery = queries.findTripsByBusIdAndDate();
    const tripDateDiff = new Date(trip_date) - new Date();
    if (tripDateDiff < -43200000) return protocol.err400Res(res, UntitledErrors.tripDateErr());
    const findTripsByBusId = await database.queryOneORNone(findTripsByBusIdAndDateQuery,
      [bus_id, trip_date]);
    if (findTripsByBusId) return protocol.err400Res(res, UntitledErrors.tripDateScheduleErr());
    return next();
  }
}
