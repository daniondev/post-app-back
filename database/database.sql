CREATE TABLE "post" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "nombre" varchar(100) NOT NULL,
  "descripcion" text NOT NULL,
  "fecha_creacion" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "activo" boolean DEFAULT true
);