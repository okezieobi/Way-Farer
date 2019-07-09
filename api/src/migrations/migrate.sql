/*
RUN psql -d postgres -U bootcamp43 (windows)
psql -U bootcamp47 -d postgres -h 127.0.0.1 -W (linux)
RUN \i api/src/migrations/migrate.sql \q
*/

DROP DATABASE IF EXISTS wayfarer;
CREATE DATABASE wayfarer;

\c wayfarer
\i api/src/tables/users.sql
\i api/src/tables/buses.sql
\i api/src/tables/trips.sql
\i api/src/tables/bookings.sql 
