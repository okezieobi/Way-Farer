import path from 'path';
import { QueryFile } from 'pg-promise';

class Queries {
  static sql(file) {
    const fullPath = path.join(__dirname, file);
    return new QueryFile(fullPath, { minify: true });
  }
}

export default {
  deleteAll: Queries.sql('../seeders/delete.sql'),
  users: {
    insertData: Queries.sql('../seeders/users.sql'),
  },
  buses: {
    insertData: Queries.sql('../seeders/buses.sql'),
  },
  trips: {
    insertData: Queries.sql('../seeders/trips.sql'),
  },
  bookings: {
    insertData: Queries.sql('../seeders/bookings.sql'),
  },
};
