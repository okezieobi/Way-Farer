/* eslint-disable camelcase */
import numbers from '../helpers/uniqueNos';
import bcrypt from '../helpers/bcrypt';
import model from './model';

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

  static postgresData(userData) {
    const {
      id, firstName, lastName,
      email, hashedPassword, username,
    } = this.userDataPostgre(userData);
    return model.postgreValues(id, firstName, lastName, email, hashedPassword, username);
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
