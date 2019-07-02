/*
Connect to db as bootcamp47 and RUN  \c wayfarer \i api/src/seeders/users.sql
*/

INSERT INTO clients
    (id, first_name, last_name, email, "password")
VALUES
    (1010101010101, 'Frank', 'Okezie', 'foobar@mail.com', crypt('AbcDFer123*@is!', gen_salt('bf', 12)));

SELECT
    *
FROM
    clients;