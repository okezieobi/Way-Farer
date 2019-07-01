import numbers from '../helpers/uniqueNos';
import bcrypt from '../helpers/bcrypt';

export default class Users {
  static userDataPostgre(data) {
    const {
      userEmail, userLastName, userFirstName, userPassword,
    } = data;
    return {
      id: numbers.uniqueIds(),
      email: String(userEmail),
      firstName: String(userFirstName),
      lastName: String(userLastName),
      hashedPassword: bcrypt.hash(String(userPassword)),
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
}
