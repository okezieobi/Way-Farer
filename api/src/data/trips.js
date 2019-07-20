/* eslint-disable camelcase */
import protocol from '../helpers/response';
import checkRequest from '../helpers/requests';

export default class Trips {
  static create(req, res, next) {
    const {
      bus_id, origin, destination, fare, trip_date,
    } = req.body;
    const busIdErr = checkRequest.validateInteger(bus_id, 'Bus id');
    const originErr = checkRequest.validateLetters(origin, 'Trip origin');
    const destinationErr = checkRequest.validateLetters(destination, 'Trip destination');
    const fareErr = checkRequest.validateNumber(fare, 'Trip fare');
    const tripDateErr = checkRequest.validateDate(trip_date, 'Trip date');
    const findErr = checkRequest.findError(busIdErr, originErr,
      destinationErr, fareErr, tripDateErr);
    if (findErr) protocol.err400Res(res, findErr);
    else next();
  }

  static updateStatus(req, res, next) {
    const { tripId } = req.params;
    const { status } = req.body;
    const tripIdErr = checkRequest.validateInteger(tripId, 'Trip id');
    const statusErr = checkRequest.validateLetters(status, 'Trip status');
    const findErr = checkRequest.findError(tripIdErr, statusErr);
    if (findErr) protocol.err400Res(res, findErr);
    else next();
  }
}
