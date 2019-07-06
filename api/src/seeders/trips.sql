/*
Connect to db as bootcamp47 and RUN  \c wayfarer \i api/src/seeders/trips.sql \q
*/

INSERT INTO trips
    (id, bus_id, origin, destination, fare)
VALUES
    (3030303030303, 2020202020202, 'Lagos', 'Abuja', 10000);

SELECT
    *
FROM
    trips;
