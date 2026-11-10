const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Guardar inscripciones temporalmente
const inscripciones = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// GET: consultar inscripciones
app.get("/api/inscripciones", (req, res) => {
  res.json(inscripciones);
});

// POST: registrar una inscripción
app.post("/api/inscripciones", (req, res) => {

  // TODO 1: Obtener los cinco datos
  const { nombre, correo, telefono, taller, horario } = req.body || {};

  // TODO 2: Validar campos obligatorios
  if ([nombre, correo, telefono, taller, horario].some(
    dato => typeof dato !== "string" || !dato.trim()
  )) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios."
    });
  }

  // TODO 3: Validar correo electrónico
  const validarCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!validarCorreo.test(correo)) {
    return res.status(400).json({
      mensaje: "El correo electrónico no es válido."
    });
  }

  // TODO 4: Crear y guardar el registro
  const nuevaInscripcion = {
    id: inscripciones.length + 1,
    nombre: nombre.trim(),
    correo: correo.trim(),
    telefono: telefono.trim(),
    taller: taller.trim(),
    horario: horario.trim()
  };

  inscripciones.push(nuevaInscripcion);

  // TODO 5: Responder con estado 201
  res.status(201).json(nuevaInscripcion);
});

app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
