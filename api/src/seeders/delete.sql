/*
Connect to db as bootcamp47 and RUN  \c wayfarer \i api/src/seeders/delete.sql
*/

TRUNCATE clients
CASCADE;

TRUNCATE admins
CASCADE;

TRUNCATE buses
CASCADE;

TRUNCATE trips
CASCADE;