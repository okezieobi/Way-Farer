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

  static getAllTrips() {
    return 'SELECT * FROM trips';
  }

  static createTrip() {
    return 'INSERT INTO trips(id, bus_id, origin, destination, fare, trip_date, seats) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  }

  static findBusByNumberPlate() {
    return 'SELECT * FROM buses WHERE number_plate = $1';
  }

  static findBusById() {
    return 'SELECT * FROM buses WHERE id = $1';
  }

  static findTripsByBusIdAndDate() {
    return 'SELECT * FROM trips WHERE bus_id = $1 AND trip_date = $2';
  }

  static findTripById() {
    return 'SELECT * FROM trips WHERE id = $1';
  }

  static findBookingByTripId() {
    return 'SELECT * FROM bookings where trip_id = $1';
  }

  static async booking(db, createBookingArrayValue, tripSeatsArrayValue) {
    const createBookingQuery = 'INSERT INTO bookings(id, trip_id, user_id, seat_no) VALUES ($1, $2, $3 , $4) RETURNING *';
    const updateTripQuery = 'UPDATE trips SET seats = $1 WHERE id = $2';
    const newBooking = await db.task('createBooking', async (t) => {
      const createBooking = await t.one(createBookingQuery, createBookingArrayValue);
      await t.none(updateTripQuery, tripSeatsArrayValue);
      return createBooking;
    });
    return newBooking;
  }
}
