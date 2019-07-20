import database from '../db/pgConnect';
import protocol from '../helpers/response';

export default class Controllers {
  static async getAll(req, res, query, model) {
    const data = await database.queryAny(query);
    const dataRes = await model(data);
    return protocol.success200Res(res, dataRes);
  }
}
