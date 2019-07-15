export default class Errors {
  static isRequired(title) {
    return `${title} is required`;
  }

  static isStringType(title) {
    return `${title} must be string type`;
  }

  static notLetters(title) {
    return `${title} must be letters`;
  }

  static notLettersAndNumbers(title) {
    return `${title} must be letters and numbers`;
  }

  static notNumbers(title) {
    return `${title} must be a positive number`;
  }

  static notInteger(title) {
    return `${title} must be a positive integer`;
  }

  static userExists(title) {
    return `${title} exists, please sign in`;
  }

  static userNotExists(title) {
    return `${title} does not exist, please sign up`;
  }

  static notEmail() {
    return 'Email format is wrong';
  }

  static notPassword() {
    return 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character';
  }

  static tokenIsRequired() {
    return 'Token is required, please sign in or sign up';
  }

  static wrongToken(title) {
    return `Token provided does not match any ${title}`;
  }

  static invalidToken() {
    return 'Id from token is not a positive integer';
  }

  static wrongPassword() {
    return 'Password does not match user';
  }

  static notNumberPlate() {
    return 'Number plate must be capital letters and positive integers of exactly 8 characters';
  }

  static dataNotFound(title) {
    return `${title} not found`;
  }

  static noSeats() {
    return 'No other seat is available';
  }

  static availableSeats(title) {
    const seats = title.join(', ');
    return `Requested seat is unavailable, please select from seats ${seats}`;
  }

  static noZeroSeatNo() {
    return 'Seat number can not be 0';
  }

  static dataFound(title) {
    return `${title} already exists`;
  }

  static notDate() {
    return 'Provided trip date must be written in YYYY-MM-DD format';
  }

  static tripDateScheduleErr() {
    return 'Provided trip date is incorrect, bus is already booked for a trip on requested date';
  }

  static tripDateErr() {
    return 'Provided date is invalid';
  }
}
