import protocol from '../helpers/response';
import checkRequest from '../helpers/requests';

export default class Buses {
  static create(req, res, next) {
    const {
      numberPlate, manufacturer, model, year, capacity,
    } = req.body;
    const numberPlateErr = checkRequest.validateNumberPlate(numberPlate, 'Number plate');
    const manufacturerErr = checkRequest.validateLetters(manufacturer, 'Manufacturer');
    const modelErr = checkRequest.validateLetters(model, 'Model');
    const yearErr = checkRequest.validateInteger(year, 'Year');
    const capacityErr = checkRequest.validateInteger(capacity, 'Capacity');
    const findErr = checkRequest.findError(numberPlateErr, manufacturerErr,
      modelErr, yearErr, capacityErr);
    if (findErr) protocol.err400Res(res, findErr);
    else next();
  }
}
