/*
Connect to db as bootcamp47 and RUN  \c wayfarer \i api/src/seeders/bookings.sql \q
*/

INSERT INTO bookings
    (id, trip_id, "user_id")
VALUES
    (4040404040404, 3030303030303, 1010101010101);

SELECT
    *
FROM
    bookings;