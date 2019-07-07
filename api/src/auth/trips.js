import protocol from '../helpers/response';
import database from '../db/pgConnect';
import errors from '../helpers/errors';
import queries from '../helpers/queries';

export default class {
  static async verifyBusId(req, res, next) {
    const { numberPlate } = req.body;
    const findBusQuery = queries.findBusByNumberPlate();
    this.findBus = await database.queryOneORNone(findBusQuery, [numberPlate]);
    if (!this.findBus) protocol.err404Res(res, errors.dataNotFound('Bus data'));
    else next();
  }
}
