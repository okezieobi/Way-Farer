/* eslint-disable camelcase */
import numbers from '../helpers/uniqueNos';
import bcrypt from '../helpers/bcrypt';

export default class Users {
  static userDataPostgre(data) {
    const {
      first_name, last_name, email, password,
    } = data;
    return {
      id: numbers.uniqueIds(),
      email,
      firstName: first_name,
      lastName: last_name,
      hashedPassword: bcrypt.hash(String(password)),
    };
  }

  static createUserDataResPostgre(data) {
    return {
      id: parseInt(data.id, 10),
      firstName: String(data.first_name),
      lastName: String(data.last_name),
      email: String(data.email),
      type: String(data.type),
    };
  }


  static createAdminDataResPostgre(data) {
    return {
      id: parseInt(data.id, 10),
      username: String(data.username),
      type: String(data.type),
    };
  }

  static adminDataPostgre(data) {
    const { userName, adminPassword } = data;
    return {
      id: numbers.uniqueIds(),
      username: String(userName),
      hashedPassword: bcrypt.hash(String(adminPassword)),
    };
  }
}
