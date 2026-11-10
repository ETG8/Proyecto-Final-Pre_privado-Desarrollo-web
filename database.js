const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("registro_taller.db");

db.exec(
  "CREATE TABLE IF NOT EXISTS inscripciones (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
  "nombre TEXT NOT NULL, " +
  "correo TEXT NOT NULL, " +
  "telefono TEXT NOT NULL, " +
  "taller TEXT NOT NULL, " +
  "horario TEXT NOT NULL, " +
  "modalidad TEXT NOT NULL, " +
  "nivel_experiencia TEXT NOT NULL, " +
  "fecha_registro TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP" +
  ")"
);

module.exports = db;

const columnas = db.prepare(
  "PRAGMA table_info(inscripciones)"
).all();

const existeSexo = columnas.some(
  columna => columna.name === "genero"
);

if (!existeSexo) {
  db.exec(
    "ALTER TABLE inscripciones ADD COLUMN genero TEXT"
  );
}