/*
Connect to db as bootcamp47 and RUN  \c wayfarer \i api/src/seeders/bookings.sql \q
*/

INSERT INTO bookings
    (id, trip_id, "user_id", seat_no, origin, destination, bus_id, trip_date, fare)
VALUES
    (4040404040404, 3030303030303, 1010101010101, 8, 'Lagos', 'Abuja', 2020202020202, CURRENT_DATE, 8);

SELECT
    *
FROM
    bookings;