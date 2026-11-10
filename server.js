const express = require("express");
const path = require("path");
const db = require("./database");

const app = express();
const PORT = 3000;

// Configuración de Express
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Función para validar los datos
function validarDatos(cuerpo = {}) {
  const texto = (valor) =>
    typeof valor === "string" ? valor.trim() : "";

  const datos = {
    nombre: texto(cuerpo.nombre),
    correo: texto(cuerpo.correo),
    telefono: texto(cuerpo.telefono),
    taller: texto(cuerpo.taller),
    horario: texto(cuerpo.horario),
    modalidad: texto(cuerpo.modalidad),
    nivel_experiencia: texto(cuerpo.nivel_experiencia)
  };

  if (Object.values(datos).some(valor => !valor)) {
    return {
      error: "Completa todos los campos."
    };
  }

  const correoValido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo);

  if (!correoValido) {
    return {
      error: "Escribe un correo válido."
    };
  }

  return { datos };
}

// GET: consultar las inscripciones
app.get("/api/inscripciones", (req, res) => {
  const filas = db.prepare(
    "SELECT id, nombre, correo, telefono, taller, " +
    "horario, modalidad, nivel_experiencia, fecha_registro " +
    "FROM inscripciones ORDER BY id DESC"
  ).all();

  res.json(filas);
});

// POST: registrar participantes
app.post("/api/inscripciones", (req, res) => {
  const validacion = validarDatos(req.body);

  if (validacion.error) {
    return res.status(400).json({
      error: validacion.error
    });
  }

  const datos = validacion.datos;

  const insertar = db.prepare(
    "INSERT INTO inscripciones " +
    "(nombre, correo, telefono, taller, horario, " +
    "modalidad, nivel_experiencia) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  const resultado = insertar.run(
    datos.nombre,
    datos.correo,
    datos.telefono,
    datos.taller,
    datos.horario,
    datos.modalidad,
    datos.nivel_experiencia
  );

  res.status(201).json({
    mensaje: "Inscripción guardada.",
    id: Number(resultado.lastInsertRowid)
  });
});

// PUT: actualizar participantes
app.put("/api/inscripciones/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: "Id inválido."
    });
  }

  const validacion = validarDatos(req.body);

  if (validacion.error) {
    return res.status(400).json({
      error: validacion.error
    });
  }

  const datos = validacion.datos;

  const resultado = db.prepare(
    "UPDATE inscripciones SET nombre=?, correo=?, " +
    "telefono=?, taller=?, horario=?, modalidad=?, " +
    "nivel_experiencia=? WHERE id=?"
  ).run(
    datos.nombre,
    datos.correo,
    datos.telefono,
    datos.taller,
    datos.horario,
    datos.modalidad,
    datos.nivel_experiencia,
    id
  );

  if (resultado.changes === 0) {
    return res.status(404).json({
      error: "No se encontró la inscripción."
    });
  }

  res.json({
    mensaje: "Inscripción actualizada."
  });
});

// DELETE: eliminar participantes
app.delete("/api/inscripciones/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: "Id inválido."
    });
  }

  const resultado = db.prepare(
    "DELETE FROM inscripciones WHERE id = ?"
  ).run(id);

  if (resultado.changes === 0) {
    return res.status(404).json({
      error: "No se encontró la inscripción."
    });
  }

  res.json({
    mensaje: "Inscripción eliminada."
  });
});

// GET: reportes visuales
app.get("/api/reportes/resumen", (req, res) => {

  const total = db.prepare(
    "SELECT COUNT(*) AS total FROM inscripciones"
  ).get().total;

  const porTaller = db.prepare(
    "SELECT taller, COUNT(*) AS cantidad " +
    "FROM inscripciones " +
    "GROUP BY taller ORDER BY cantidad DESC"
  ).all();

  const porHorario = db.prepare(
    "SELECT horario, COUNT(*) AS cantidad " +
    "FROM inscripciones " +
    "GROUP BY horario ORDER BY horario"
  ).all();

  const porModalidad = db.prepare(
    "SELECT modalidad, COUNT(*) AS cantidad " +
    "FROM inscripciones " +
    "GROUP BY modalidad ORDER BY cantidad DESC"
  ).all();

  res.json({
    total,
    porTaller,
    porHorario,
    porModalidad
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
