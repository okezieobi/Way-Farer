/* eslint-disable camelcase */
import protocol from '../helpers/response';
import checkRequest from '../helpers/requests';

export default class ValidateUserRequest {
  static signUp(req, res, next) {
    const {
      first_name, last_name, email, password,
    } = req.body;
    const firstNameErr = checkRequest.validateLetters(first_name, 'First name');
    const lastNameErr = checkRequest.validateLetters(last_name, 'Last name');
    const emailErr = checkRequest.checkEmailFormat(email, 'Email');
    const passwordErr = checkRequest.checkPassword(password, 'Password');
    const findError = checkRequest.findError(firstNameErr, lastNameErr, emailErr, passwordErr);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }

  static signinPlus(req, res, next, userData, userDataTest, userDataTitle, password) {
    const userDataReq = req.body[userData];
    const passwordReq = req.body[password];
    const checkUserData = checkRequest[userDataTest](userDataReq, userDataTitle);
    const checkPassword = checkRequest.checkPassword(passwordReq, 'Password');
    const findError = checkRequest.findError(checkUserData, checkPassword);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }

  static signIn(req, res, next) {
    return this.signinPlus(req, res, next, 'email',
      'checkEmailFormat', 'Email', 'password');
  }

  static signinAdmin(req, res, next) {
    return this.signinPlus(req, res, next, 'username',
      'validateUsername', 'Username', 'password');
  }
}
