/*
Connect to database as bootcamp47 and RUN  \c banka \i api/src/tables/trips.sql
*/

DROP TABLE IF EXISTS bookings;
CREATE TABLE bookings
(
    id         bigint      PRIMARY KEY NOT NULL,
    trip_id    bigint      NOT NULL REFERENCES trips (id) ON DELETE CASCADE,
    "user_id"  bigint      NOT NULL REFERENCES users (id),
    created_on timestamptz DEFAULT now(),
    seat_no    smallint    NOT NULL
);