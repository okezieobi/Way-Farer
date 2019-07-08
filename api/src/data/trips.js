import protocol from '../helpers/response';
import checkRequest from '../helpers/requests';

export default class Trips {
  static create(req, res, next) {
    const {
      numberPlate, origin, destination, fare, tripDate,
    } = req.body;
    const numberPlateErr = checkRequest.validateNumberPlate(numberPlate, 'Number plate');
    const originErr = checkRequest.validateLetters(origin, 'Trip origin');
    const destinationErr = checkRequest.validateLetters(destination, 'Trip destination');
    const fareErr = checkRequest.validateNumber(fare, 'Trip fare');
    const tripDateErr = checkRequest.validateDate(tripDate, 'Trip date');
    const findErr = checkRequest.findError(numberPlateErr, originErr,
      destinationErr, fareErr, tripDateErr);
    if (findErr) protocol.err400Res(res, findErr);
    else next();
  }
}
