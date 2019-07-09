/*
Connect to database as bootcamp47 and RUN  \c banka \i api/src/tables/trips.sql
*/

DROP TABLE IF EXISTS trips;

CREATE TABLE trips
(
    id          bigint       PRIMARY KEY NOT NULL,
    bus_id      bigint       NOT NULL REFERENCES buses (id) ON DELETE CASCADE,
    origin      varchar(128) NOT NULL,
    destination varchar(128) NOT NULL,
    trip_date   date  DEFAULT CURRENT_DATE,
    fare        numeric      NOT NULL,
    status      varchar(128) DEFAULT 'Active'
);