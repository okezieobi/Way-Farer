import database from '../db/pgConnect';
import models from '../models/buses';
import queries from '../helpers/queries';
import protocol from '../helpers/response';

export default class Buses {
  static async create(req, res) {
    const reqData = await models.busData(req.body);
    const {
      id, numberPlate, manufacturer, model, year, capacity,
    } = reqData;
    const createBusQuery = queries.createBus();
    const arrayData = [id, numberPlate, manufacturer, model, year, capacity];
    const newBusData = await database.queryOne(createBusQuery, arrayData);
    const newBusRes = await models.busDataRes(newBusData);
    return protocol.success201Res(res, newBusRes);
  }
}
