/*
Connect to database as bootcamp47 and RUN  \c banka \i api/src/tables/buses.sql
*/

DROP TABLE IF EXISTS buses;

CREATE TABLE buses
(
    id           bigint       PRIMARY KEY NOT NULL,
    number_plate varchar(128) NOT NULL,
    manufacturer varchar(128) NOT NULL,
    model        varchar(128) NOT NULL,
    "year"       varchar(128) NOT NULL,
    capacity     smallint     NOT NULL
);