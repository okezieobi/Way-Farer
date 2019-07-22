class TripQueries {
  static getAllTrips() {
    return 'SELECT * FROM trips';
  }

  static createTrip() {
    return 'INSERT INTO trips(id, bus_id, origin, destination, fare, trip_date, seats) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  }

  static findTripsByBusIdAndDate() {
    return 'SELECT * FROM trips WHERE bus_id = $1 AND trip_date = $2';
  }

  static findTripById() {
    return 'SELECT * FROM trips WHERE id = $1';
  }

  static updateTripById() {
    return 'UPDATE trips SET status = $1 WHERE id = $2';
  }
}

class UserQueries {
  static findClientByEmail() {
    return 'SELECT * FROM users WHERE email = $1';
  }

  static findUserById() {
    return 'SELECT * FROM users WHERE id = $1';
  }

  static createClient() {
    return 'INSERT INTO users(id, first_name, last_name, email, password, username) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, email, type, username';
  }

  static findAdminByUsername() {
    return 'SELECT * FROM users WHERE username = $1';
  }

  static async users(db, findUserByEmailValue, findUserByUsernameValue) {
    const findUser = await db.task('findUser', async (t) => {
      const byEmail = await t.oneOrNone(this.findClientByEmail, [findUserByEmailValue]);
      const byUsername = await t.oneOrNone(this.findAdminByUsername, [findUserByUsernameValue]);
      return byEmail || byUsername;
    });
    return findUser;
  }
}

class BusQueries {
  static createBus() {
    return 'INSERT INTO buses(id, number_plate, manufacturer, model, year, capacity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  }

  static getAllBuses() {
    return 'SELECT * FROM buses';
  }

  static findBusByNumberPlate() {
    return 'SELECT * FROM buses WHERE number_plate = $1';
  }

  static findBusById() {
    return 'SELECT * FROM buses WHERE id = $1';
  }
}

class BookingQueries {
  static findBookingByTripId() {
    return 'SELECT * FROM bookings where trip_id = $1';
  }

  static findBookingsByUserId() {
    return 'SELECT * FROM bookings where user_id = $1';
  }

  static findAllBookings() {
    return 'SELECT * FROM bookings';
  }

  static findBookingsByIdAndUserId() {
    return 'SELECT * FROM bookings WHERE id = $1 AND user_id = $2';
  }

  static deleteBookingsByIdAndUserId() {
    return 'DELETE FROM bookings WHERE id = $1 AND user_id = $2';
  }

  static async booking(db, createBookingArrayValue, tripSeatsArrayValue) {
    const createBookingQuery = 'INSERT INTO bookings(id, trip_id, user_id, seat_no, origin, destination, bus_id, trip_date, fare) VALUES ($1, $2, $3 , $4, $5, $6, $7, $8, $9) RETURNING *';
    const updateTripQuery = 'UPDATE trips SET seats = $1 WHERE id = $2';
    const newBooking = await db.task('createBooking', async (t) => {
      const createBooking = await t.one(createBookingQuery, createBookingArrayValue);
      await t.none(updateTripQuery, tripSeatsArrayValue);
      return createBooking;
    });
    return newBooking;
  }
}

export {
  TripQueries,
  UserQueries,
  BusQueries,
  BookingQueries,
};
