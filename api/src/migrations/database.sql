/*
RUN psql -d postgres -U bootcamp43 (windows)
psql -U bootcamp47 -d postgres -h 127.0.0.1 -W (linux)
RUN \i api/src/migrations/database.sql \q
*/

DROP DATABASE IF EXISTS banka;
CREATE DATABASE banka;

\c banka
\i api/src/tables/users.sql 
