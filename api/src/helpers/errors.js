class TitledErrors {
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

  static restrictedAccess(title) {
    return `Only ${title} can access this resource`;
  }

  static dataNotFound(title) {
    return `${title} not found`;
  }

  static availableSeats(title) {
    const seats = title.join(', ');
    return `Requested seat is unavailable, please select from seats ${seats}`;
  }

  static dataFound(title) {
    return `${title} already exists`;
  }

  static statusUpdateErr(title) {
    return `Status is already 4040404040404${title.toLowerCase()}`;
  }
}


class UntitledErrors {
  static userNotExists() {
    return 'User does not exist, please sign up';
  }

  static userExists() {
    return 'User exists, please sign in with email or username';
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

  static notDate() {
    return 'Provided trip date must be written in YYYY/MM/DD format';
  }

  static tripDateScheduleErr() {
    return 'Provided trip date is incorrect, bus is already booked for a trip on requested date';
  }

  static tripDateErr() {
    return 'Provided date is invalid';
  }

  static wrongToken() {
    return 'Token provided does not match any user';
  }

  static invalidToken() {
    return 'Id from token is not a positive integer';
  }

  static noZeroSeatNo() {
    return 'Seat number can not be 0';
  }

  static noSeats() {
    return 'No other seat is available';
  }

  static wrongPassword() {
    return 'Password does not match user';
  }

  static notNumberPlate() {
    return 'Number plate must be capital letters and positive integers of exactly 8 characters';
  }

  static statusError() {
    return 'Status must be active or cancelled';
  }
}

export {
  TitledErrors,
  UntitledErrors,
};
