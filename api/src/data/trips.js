import protocol from '../helpers/response';
import checkRequest from '../helpers/requests';

export default class Trips {
  static create(req, res, next) {
    const {
      numberPlate, origin, destination, fare,
    } = req.body;
    const busIdErr = checkRequest.validateNumberPlate(numberPlate, 'Number plate');
    const originErr = checkRequest.validateLetters(origin, 'Trip origin');
    const destinationErr = checkRequest.validateLetters(destination, 'Trip destination');
    const fareErr = checkRequest.validateNumber(fare, 'Trip fare');
    const findErr = checkRequest.findError(busIdErr, originErr, destinationErr, fareErr);
    if (findErr) protocol.err400Res(res, findErr);
    else next();
  }
}
