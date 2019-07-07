export default class Queries {
  static findClientByEmail() {
    return 'SELECT * FROM clients WHERE email = $1';
  }

  static findClientById() {
    return 'SELECT * FROM clients WHERE id = $1';
  }

  static createClient() {
    return 'INSERT INTO clients(id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, type';
  }

  static findAdminByUsername() {
    return 'SELECT * FROM admins WHERE username = $1';
  }

  static findAdminById() {
    return 'SELECT * FROM admins WHERE id = $1';
  }

  static createBus() {
    return 'INSERT INTO buses(id, number_plate, manufacturer, model, year, capacity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  }

  static getAllBuses() {
    return 'SELECT * FROM buses';
  }

  static createTrip() {
    return 'INSERT INTO trips(id, bus_id, origin, destination, fare) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  }

  static findBusByNumberPlate() {
    return 'SELECT * FROM buses WHERE number_plate = $1';
  }
}
