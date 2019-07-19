import regexTest from './regex';
import { TitledErrors, UntitledErrors } from './errors';

export default class RequestCheck {
  static checkRequest(request, testRequest, errRequired, errIsString, testErrMessage) {
    let err;
    if (!request) err = errRequired;
    else if (typeof request !== 'string') err = errIsString;
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

  static procoessErrs(request, title, test, error) {
    const testRequest = regexTest[test](request);
    const errIsRequired = TitledErrors.isRequired(title);
    const errIsString = TitledErrors.isStringType(title);
    return this.checkRequest(request, testRequest, errIsRequired, errIsString, error);
  }

  static checkAllErrors(request, title, test, error) {
    const testErrMessage = TitledErrors[error](title);
    return this.procoessErrs(request, title, test, testErrMessage);
  }

  static checkAllErrorsNoTitle(request, title, test, error) {
    const testErrMessage = UntitledErrors[error]();
    return this.procoessErrs(request, title, test, testErrMessage);
  }

  static validateLetters(request, title) {
    return this.checkAllErrors(request, title, 'checkName', 'notLetters');
  }

  static checkEmailFormat(request, title) {
    return this.checkAllErrorsNoTitle(request, title, 'validateEmail', 'notEmail');
  }

  static checkPassword(request, title) {
    return this.checkAllErrorsNoTitle(request, title, 'validatePassword', 'notPassword');
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
    return this.checkAllErrorsNoTitle(request, title, 'validateNumberPlate', 'notNumberPlate');
  }

  static validateDate(request, title) {
    return this.checkAllErrorsNoTitle(request, title, 'checkDateInput', 'notDate');
  }
}
