/*
RUN psql -d postgres -U bootcamp43 (windows)
psql -U bootcamp47 -d postgres -h 127.0.0.1 -W (linux)
RUN \i api/src/seeders/seeder.sql \q
*/

\c wayfarer
\i api/src/seeders/users.sql
\i api/src/seeders/buses.sql
\i api/src/seeders/trips.sql
\i api/src/seeders/bookings.sql