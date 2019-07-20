/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import { UntitledErrors, TitledErrors } from '../helpers/errors';
import { TripQueries, BusQueries } from '../helpers/queries';
import authenticatedTrip from './bookings';

export default class {
  static async verifyBus(req, res, next) {
    const { bus_id } = req.body;
    const findBusQuery = BusQueries.findBusById();
    this.findBus = await database.queryOneORNone(findBusQuery, [bus_id]);
    if (!this.findBus) protocol.err404Res(res, TitledErrors.dataNotFound('Bus data'));
    else next();
  }

  static async verifyTripDate(req, res, next) {
    const { trip_date, bus_id } = req.body;
    const findTripsByBusIdAndDateQuery = TripQueries.findTripsByBusIdAndDate();
    const tripDateDiff = new Date(trip_date) - new Date();
    if (tripDateDiff < -43200000) return protocol.err400Res(res, UntitledErrors.tripDateErr());
    const findTripsByBusId = await database.queryOneORNone(findTripsByBusIdAndDateQuery,
      [bus_id, trip_date]);
    if (findTripsByBusId) return protocol.err400Res(res, UntitledErrors.tripDateScheduleErr());
    return next();
  }

  static verifyTripStatus(req, res, next) {
    const { verifyTrip } = authenticatedTrip;
    const { status } = req.body;
    if (status !== 'Active' && status !== 'Cancelled'
      && status !== 'active' && status !== 'cancelled') protocol.err400Res(res, UntitledErrors.statusError());
    // eslint-disable-next-line max-len
    else if (status === verifyTrip.status) protocol.err400Res(res, TitledErrors.statusUpdateErr(status));
    else next();
  }
}
