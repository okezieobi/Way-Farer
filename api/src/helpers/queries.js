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
}
