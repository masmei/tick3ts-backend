DROP DATABASE IF EXISTS tick3ts_dev;
CREATE DATABASE tick3ts_dev;

\c tick3ts_dev;

DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    address TEXT NOT NULL,
    name TEXT,
    twitter TEXT,
    instagram TEXT,
    picture TEXT,
    about TEXT
);

DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    date DATE,
    location TEXT,
    image TEXT,
    contract TEXT
);







-- psql -U postgres -f db/schema.sql
-- psql -U postgres -f db/seed.sql