import protocol from '../helpers/response';
import checkRequest from '../helpers/requests';

export default class ValidateUserRequest {
  static signUp(req, res, next) {
    const {
      userFirstName, userLastName, userEmail, userPassword,
    } = req.body;
    const firstNameErr = checkRequest.validateLetters(userFirstName, 'First name');
    const lastNameErr = checkRequest.validateLetters(userLastName, 'Last name');
    const emailErr = checkRequest.checkEmailFormat(userEmail, 'Email');
    const passwordErr = checkRequest.checkPassword(userPassword, 'Password');
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
    return this.signinPlus(req, res, next, 'userEmail',
      'checkEmailFormat', 'Email', 'userPassword');
  }
}
