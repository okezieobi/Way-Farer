import database from '../db/pgConnect';
import models from '../models/buses';
import { BusQueries } from '../helpers/queries';
import protocol from '../helpers/response';
import mainController from './controller';

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
    await mainController.getAll(req, res, getAllBusesQuery, models.busDataArray);
  }
}
