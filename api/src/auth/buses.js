/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import { TitledErrors } from '../helpers/errors';
import { BusQueries } from '../helpers/queries';

export default class Bus {
  static async verifyNumberPlate(req, res, next) {
    const { number_plate } = req.body;
    const findBusQuery = BusQueries.findBusByNumberPlate();
    const findBus = await database.queryOneORNone(findBusQuery, [number_plate]);
    if (findBus) protocol.err400Res(res, TitledErrors.dataFound('Bus data with number plate'));
    else next();
  }
}
