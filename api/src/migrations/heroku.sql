/*
"database for heroku": "cat api/src/migrations/heroku.sql | heroku pg:psql -a andela-way-farer HEROKU_POSTGRESQL_BROWN_URL"
*/

\i api/src/tables/users.sql
\i api/src/tables/buses.sql
\i api/src/tables/trips.sql
\i api/src/tables/bookings.sql
\i api/src/seeders/users.sql