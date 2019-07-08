import protocol from '../helpers/response';
import database from '../db/pgConnect';
import errors from '../helpers/errors';
import queries from '../helpers/queries';

export default class Bus {
  static async verifyNumberPlate(req, res, next) {
    const { numberPlate } = req.body;
    const findBusQuery = queries.findBusByNumberPlate();
    const findBus = await database.queryOneORNone(findBusQuery, [numberPlate]);
    if (findBus) protocol.err400Res(res, errors.dataFound('Bus data with number plate'));
    else next();
  }
}
