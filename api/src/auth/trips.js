/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import errors from '../helpers/errors';
import queries from '../helpers/queries';

export default class {
  static async verifyBus(req, res, next) {
    const { bus_id } = req.body;
    const findBusQuery = queries.findBusById;
    this.findBus = await database.queryOneORNone(findBusQuery, [bus_id]);
    if (!this.findBus) protocol.err404Res(res, errors.dataNotFound('Bus data'));
    else next();
  }

  static async verifyTripDate(req, res, next) {
    const { trip_date, bus_id } = req.body;
    const findTripsByBusIdQuery = queries.findTripsByBusId();
    const findTripsByBusId = await database.queryAny(findTripsByBusIdQuery, [bus_id]);
    let lastTripDateOfBus;
    if (findTripsByBusId[0]) lastTripDateOfBus = findTripsByBusId[0].trip_date;
    else lastTripDateOfBus = 0;
    const lastTripDateDiff = new Date(trip_date) - lastTripDateOfBus;
    const tripDateDiff = new Date(trip_date) - new Date();
    if (lastTripDateDiff <= 43200000
      && lastTripDateDiff <= tripDateDiff) protocol.err400Res(res, errors.tripDateErr());
    else next();
  }
}
