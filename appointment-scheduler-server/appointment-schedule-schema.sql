-- to run in terminal type "psql -f appointment-schedule.sql"
-- To connect to db type "psql and type \c appointment_scheduler_db when prompted"
-- \q to quit 


CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  password   TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  doctor     TEXT NOT NULL
);

-- CREATE TABLE doctors (
--   id         SERIAL PRIMARY KEY,
--   password   TEXT NOT NULL,
--   first_name TEXT NOT NULL,
--   last_name  TEXT NOT NULL,
--   email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
--   is_doctor  BOOLEAN DEFAULT TRUE
-- );

-- CREATE TABLE appointments(
--   id         SERIAL PRIMARY KEY,
--   date       DATE, 
--   time       TIME, 
--   created_by INTEGER REFERENCES users(id) ON DELETE CASCADE, 
--   doctor     TEXT NOT NULL,
-- );

