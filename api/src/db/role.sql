/*
RUN psql -U postgres -a -f "src/db/role.sql" to create role (windows)
sudo -u postgres psql -f db/role.sql (linux)
*/
DROP ROLE IF EXISTS bootcamp47;
CREATE ROLE bootcamp47
WITH LOGIN PASSWORD 'lovely' CREATEDB SUPERUSER;
