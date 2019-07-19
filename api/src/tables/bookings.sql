/*
Connect to database as bootcamp47 and RUN  \c banka \i api/src/tables/trips.sql
*/

DROP TABLE IF EXISTS bookings;
CREATE TABLE bookings
(
    id          bigint       PRIMARY KEY NOT NULL,
    trip_id     bigint       NOT NULL REFERENCES trips (id) ON DELETE CASCADE,
    "user_id"   bigint       NOT NULL REFERENCES users (id),
    created_on  timestamptz  DEFAULT now(),
    seat_no     smallint     NOT NULL,
    origin      varchar(128) NOT NULL,
    destination varchar(128) NOT NULL,
    bus_id      bigint       NOT NULL REFERENCES buses (id),
    trip_date   date         NOT NULL,
    fare        numeric      NOT NULL
);