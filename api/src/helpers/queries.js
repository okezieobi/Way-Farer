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
    return 'SELECT bookings.*, users.first_name, users.last_name, users.email, trips.bus_id, trips.origin, trips.destination, trips.fare, trips.trip_date FROM bookings INNER JOIN users ON bookings.user_id = users.id INNER JOIN trips on bookings.trip_id = trips.id WHERE users.id = $1';
  }

  static findAllBookings() {
    return 'SELECT bookings.*, users.first_name, users.last_name, users.email, trips.bus_id, trips.origin, trips.destination, trips.fare, trips.trip_date FROM bookings INNER JOIN users ON bookings.user_id = users.id INNER JOIN trips on bookings.trip_id = trips.id';
  }

  static findBookingsByIdAndUserId() {
    return 'SELECT * FROM bookings WHERE id = $1 AND user_id = $2';
  }

  static deleteBookingsByIdAndUserId() {
    return 'DELETE FROM bookings WHERE id = $1 AND user_id = $2';
  }

  static getBookingById() {
    return 'SELECT bookings.*, users.first_name, users.last_name, users.email, trips.bus_id, trips.origin, trips.destination, trips.fare, trips.trip_date FROM bookings INNER JOIN users ON bookings.user_id = users.id INNER JOIN trips on bookings.trip_id = trips.id WHERE bookings.id = $1';
  }

  static updateSeats() {
    return 'UPDATE trips SET seats = $1 WHERE id = $2';
  }

  static async createbooking(db, createBookingArrayValue, tripSeatsArrayValue) {
    const createBookingQuery = 'INSERT INTO bookings(id, trip_id, user_id, seat_no) VALUES ($1, $2, $3 , $4) RETURNING *';
    const newBooking = await db.task('createBooking', async (t) => {
      const { id } = await t.one(createBookingQuery, createBookingArrayValue);
      await t.none(this.updateSeats, tripSeatsArrayValue);
      const bookingDetails = await t.one(this.getBookingById, [id]);
      return bookingDetails;
    });
    return newBooking;
  }

  static async deleteBooking(db, deleteBookingArray, bookingSeat, bookingTripId) {
    await db.task('deletingBooking', async (t) => {
      await t.none(this.deleteBookingsByIdAndUserId, deleteBookingArray);
      const { seats } = await t.one(TripQueries.findTripById(), [bookingTripId]);
      await seats.push(bookingSeat);
      await t.none(this.updateSeats, [seats, bookingTripId]);
    });
  }
}

export {
  TripQueries,
  UserQueries,
  BusQueries,
  BookingQueries,
};
