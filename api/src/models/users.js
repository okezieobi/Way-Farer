/* eslint-disable camelcase */
import numbers from '../helpers/uniqueNos';
import bcrypt from '../helpers/bcrypt';

export default class Users {
  static userDataPostgre(data) {
    const {
      first_name, last_name, email, password, username,
    } = data;
    return {
      id: numbers.uniqueIds(),
      email,
      username,
      firstName: first_name,
      lastName: last_name,
      hashedPassword: bcrypt.hash(password),
    };
  }

  static createUserDataResPostgre(data) {
    const {
      id, first_name, last_name, username, email, type,
    } = data;
    return {
      id: parseInt(id, 10),
      firstName: String(first_name),
      lastName: String(last_name),
      userName: String(username),
      email: String(email),
      type: String(type),
    };
  }
}
