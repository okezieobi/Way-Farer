import protocol from '../helpers/response';
import database from '../db/pgConnect';
import errors from '../helpers/errors';
import queries from '../helpers/queries';

export default class {
  static async verifyBus(req, res, next) {
    const { numberPlate } = req.body;
    const findBusQuery = queries.findBusByNumberPlate();
    this.findBus = await database.queryOneORNone(findBusQuery, [numberPlate]);
    if (!this.findBus) protocol.err404Res(res, errors.dataNotFound('Bus data'));
    else next();
  }

  static async verifyTripDate(req, res, next) {
    const { tripDate } = req.body;
    const findTripsByBusIdQuery = queries.findTripsByBusId();
    const { id } = this.findBus;
    const findTripsByBusId = await database.queryAny(findTripsByBusIdQuery, [id]);
    const lastTripDateOfBus = findTripsByBusId[0].trip_date;
    const tripDateDiff = new Date(tripDate) - lastTripDateOfBus;
    if (tripDateDiff < 86400000) protocol.err400Res(res, errors.tripDateErr());
    else next();
  }
}
