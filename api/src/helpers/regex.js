export default class Patterns {
  static validateEmail(email) {
    const emailString = String(email);
    const emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailPattern.test(emailString);
  }

  static validatePassword(password) {
    const passwordString = String(password);
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(passwordString);
  }

  static checkName(name) {
    const nameString = String(name);
    const namePattern = /^[A-Za-z]+$/;
    return namePattern.test(nameString);
  }

  static checkNumber(amount) {
    const amountString = String(amount);
    const amountPattern = /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;
    return amountPattern.test(amountString);
  }

  static checkInteger(integer) {
    const integerString = String(integer);
    const integerPattern = /^(0|[1-9]\d*)$/;
    return integerPattern.test(integerString);
  }

  static checkUserName(username) {
    const usernameString = String(username);
    const usernamePattern = /^[a-zA-Z0-9\s_-]+$/;
    return usernamePattern.test(usernameString);
  }

  static validateNumberPlate(numberPlate) {
    const numberPlateString = String(numberPlate);
    const numberPlatePattern = /^([A-Z0-9]){8,8}$/;
    return numberPlatePattern.test(numberPlateString);
  }
}
