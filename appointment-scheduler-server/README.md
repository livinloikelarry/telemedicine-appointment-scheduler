This repo holds the backend code for the Appointment scheduler web app

Dev Setup
Copy the .env.template into a .env file.

cp .env.template .env
And fill in the appropriate env vars:

PORT=3003
DATABASE_USER=postgres
DATABASE_PASS=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=appointment_scheduler_db

These should be updated with values needed for your PostgreSQL connection string.

Then setup the database by running psql -f appointment-schedule.sql

Run npm install or yarn install to get the appropriate dependencies.
