import database from '../db/pgConnect';
import models from '../models/buses';
import { BusQueries } from '../helpers/queries';
import protocol from '../helpers/response';
import mainController from './controller';

export default class Buses {
  static async create(req, res) {
    const createBusQuery = BusQueries.createBus();
    const arrayData = models.postgresData(req.body);
    const newBusData = await database.queryOne(createBusQuery, arrayData);
    const newBusRes = await models.busDataRes(newBusData);
    return protocol.success201Res(res, newBusRes);
  }

  static async getAll(req, res) {
    const getAllBusesQuery = BusQueries.getAllBuses();
    await mainController.getAll(req, res, getAllBusesQuery, models.busDataArray);
  }
}
