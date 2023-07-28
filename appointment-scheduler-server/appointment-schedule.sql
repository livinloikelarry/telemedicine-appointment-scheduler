\echo 'Delete and recreate appointment-scheduler db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE appointment_scheduler_db;
CREATE DATABASE appointment_scheduler_db;
\connect appointment_scheduler_db;

-- run script 
\i appointment-schedule-schema.sql 
