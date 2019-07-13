import protocol from '../helpers/response';
import database from '../db/pgConnect';
import errors from '../helpers/errors';
import queries from '../helpers/queries';

export default class Bookings {
  static async verifyTrip(req, res, next) {
    const { tripId } = req.body;
    const findTripQuery = queries.findTripId();
    const findTrip = await database.queryOneORNone(findTripQuery, [tripId]);
    if (!findTrip) protocol.err404Res(res, errors.dataNotFound('Trip data'));
    else next();
  }
}
