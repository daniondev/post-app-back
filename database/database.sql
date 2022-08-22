-- Database: postdb
-- DROP DATABASE IF EXISTS postdb;
CREATE DATABASE postdb
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE postdb
    IS 'Para app de posts en prueba de entrevista con TCIT';

CREATE TABLE "post" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "nombre" varchar(100) NOT NULL,
  "descripcion" text NOT NULL,
  "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "activo" boolean DEFAULT true
);