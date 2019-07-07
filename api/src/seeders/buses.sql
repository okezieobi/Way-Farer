/*
Connect to db as bootcamp47 and RUN  \c wayfarer \i api/src/seeders/buses.sql \q
*/

INSERT INTO buses
    (id, number_plate, manufacturer, model, "year", capacity)
VALUES
    (2020202020202, 'STR101AG', 'toyota', 'hiace', '2010', 14);


INSERT INTO buses
    (id, number_plate, manufacturer, model, "year", capacity)
VALUES
    (6060606060606, 'GHI101AG', 'toyota', 'hiace', '2010', 14);

SELECT
    *
FROM
    buses;
