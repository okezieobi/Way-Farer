export default class Patterns {
  static validateEmail(email) {
    const emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailPattern.test(email);
  }

  static validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }

  static checkName(name) {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
  }

  static checkNumber(amount) {
    const amountPattern = /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;
    return amountPattern.test(amount);
  }

  static checkInteger(integer) {
    const integerPattern = /^(0|[1-9]\d*)$/;
    return integerPattern.test(integer);
  }

  static checkUserName(username) {
    const usernamePattern = /^[a-zA-Z0-9\s_-]+$/;
    return usernamePattern.test(username);
  }

  static validateNumberPlate(numberPlate) {
    const numberPlatePattern = /^([A-Z0-9]){8,8}$/;
    return numberPlatePattern.test(numberPlate);
  }

  static checkDateInput(date) {
    const datePattern = /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/;
    return datePattern.test(date);
  }
}
