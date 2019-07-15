/*
Connect to db as bootcamp47 and RUN  \c wayfarer \i api/src/seeders/trips.sql \q
*/

INSERT INTO trips
    (id, bus_id, origin, destination, fare, seats)
VALUES
    (3030303030303, 2020202020202, 'Lagos', 'Abuja', 10000, ARRAY
[1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14]);

SELECT
    *
FROM
    trips;
