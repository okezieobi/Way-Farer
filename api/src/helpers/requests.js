import regexTest from './regex';
import errors from './errors';

export default class RequestCheck {
  static checkRequest(request, testRequest, errMessage, testErrMessage) {
    let err;
    if (!request) err = errMessage;
    else if (!testRequest) err = testErrMessage;
    return err;
  }

  static findError(...errorsList) {
    return errorsList.find(error => error);
  }

  static checkValue(data, errMessage, ...values) {
    let err;
    const verifyValue = values.find(value => value === data);
    if (!verifyValue) err = errMessage;
    return err;
  }

  static checkAllErrors(request, title, test, error) {
    let testErrMessage;
    const isErrExceptions = error === 'notEmail'
      || error === 'notPassword' || error === 'notNumberPlate' || error === 'notDate';
    if (isErrExceptions) testErrMessage = errors[error]();
    else testErrMessage = errors[error](title);
    const testRequest = regexTest[test](request);
    const errMessage = errors.isRequired(title);
    return this.checkRequest(request, testRequest, errMessage, testErrMessage);
  }

  static validateLetters(request, title) {
    return this.checkAllErrors(request, title, 'checkName', 'notLetters');
  }

  static checkEmailFormat(request, title) {
    return this.checkAllErrors(request, title, 'validateEmail', 'notEmail');
  }

  static checkPassword(request, title) {
    return this.checkAllErrors(request, title, 'validatePassword', 'notPassword');
  }

  static validateNumber(request, title) {
    return this.checkAllErrors(request, title, 'checkNumber', 'notNumbers');
  }

  static validateInteger(request, title) {
    return this.checkAllErrors(request, title, 'checkInteger', 'notInteger');
  }

  static validateUsername(request, title) {
    return this.checkAllErrors(request, title, 'checkUserName', 'notLettersAndNumbers');
  }

  static validateNumberPlate(request, title) {
    return this.checkAllErrors(request, title, 'validateNumberPlate', 'notNumberPlate');
  }

  static validateDate(request, title) {
    return this.checkAllErrors(request, title, 'checkDateInput', 'notDate');
  }
}
