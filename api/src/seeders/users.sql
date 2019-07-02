/*
Connect to db as bootcamp47 and RUN  \c wayfarer \i api/src/seeders/users.sql \q
*/

INSERT INTO clients
    (id, first_name, last_name, email, "password")
VALUES
    (1010101010101, 'Frank', 'Okezie', 'foobar@mail.com', crypt('AbcDFer123*@is!', gen_salt('bf', 12)));

SELECT
    *
FROM
    clients;


INSERT INTO admins
    (id, username, "password")
VALUES
    (5050505050505, 'obiedere', crypt('AbcDFer123*@is!', gen_salt('bf', 12)));

SELECT
    *
FROM
    admins;