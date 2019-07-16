export default class Protocol {
  static responseData(codeStatus, resKey, resValue) {
    return {
      status: codeStatus,
      [resKey]: resValue,
    };
  }

  static response(res, codeStatus, resKey, resValue) {
    const response = this.responseData(codeStatus, resKey, resValue);
    res.status(codeStatus).send(response);
  }

  static authResponse(res, codeStatus, resKey, resValue, token) {
    const authResponse = this.responseData(codeStatus, resKey, resValue);
    authResponse.token = token;
    res.status(codeStatus).set('token', authResponse.token).send(authResponse);
  }

  static err400Res(res, err400Message) {
    return this.response(res, 400, 'error', err400Message);
  }

  static err404Res(res, err404Message) {
    return this.response(res, 404, 'error', err404Message);
  }

  static success200Res(res, success200Data) {
    return this.response(res, 200, 'data', success200Data);
  }

  static success200ResMessage(res, success200Message) {
    return this.response(res, 200, 'message', success200Message);
  }

  static success201Res(res, success201Data) {
    return this.response(res, 201, 'data', success201Data);
  }

  static auth201Res(res, auth201Data, token) {
    return this.authResponse(res, 201, 'data', auth201Data, token);
  }

  static auth200Res(res, auth201Data, token) {
    return this.authResponse(res, 200, 'data', auth201Data, token);
  }
}
