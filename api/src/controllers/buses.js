import database from '../db/pgConnect';
import models from '../models/buses';
import { BusQueries } from '../helpers/queries';
import protocol from '../helpers/response';

export default class Buses {
  static async create(req, res) {
    const reqData = await models.busData(req.body);
    const {
      id, numberPlate, manufacturer, model, year, capacity,
    } = reqData;
    const createBusQuery = BusQueries.createBus();
    const arrayData = [id, numberPlate, manufacturer, model, year, capacity];
    const newBusData = await database.queryOne(createBusQuery, arrayData);
    const newBusRes = await models.busDataRes(newBusData);
    return protocol.success201Res(res, newBusRes);
  }

  static async getAll(req, res) {
    const getAllBusesQuery = BusQueries.getAllBuses();
    const allBuses = await database.queryAny(getAllBusesQuery);
    const allBusesRes = await models.busDataArray(allBuses);
    return protocol.success200Res(res, allBusesRes);
  }
}
