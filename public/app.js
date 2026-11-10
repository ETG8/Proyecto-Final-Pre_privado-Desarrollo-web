const formulario = document.querySelector("#formulario-registro");
const lista = document.querySelector("#lista-inscripciones");
const mensaje = document.querySelector("#mensaje");

// Obtener y mostrar las inscripciones
async function cargarInscripciones() {
  try {
    const respuesta = await fetch("/api/inscripciones");

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar las inscripciones.");
    }

    const inscripciones = await respuesta.json();

    lista.innerHTML = "";

    if (inscripciones.length === 0) {
      const item = document.createElement("li");
      item.textContent = "Aún no hay inscripciones.";
      lista.appendChild(item);
      return;
    }

    inscripciones.forEach((inscripcion) => {
      const item = document.createElement("li");

      item.textContent =
        `${inscripcion.nombre} - ${inscripcion.taller} - ${inscripcion.horario}`;

      lista.appendChild(item);
    });

  } catch (error) {
    mensaje.textContent = error.message;
  }
}

// Enviar el formulario a la API
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const datosFormulario = new FormData(formulario);

  const datos = {
    nombre: datosFormulario.get("nombre"),
    correo: datosFormulario.get("correo"),
    telefono: datosFormulario.get("telefono"),
    taller: datosFormulario.get("taller"),
    horario: datosFormulario.get("horario")
  };

  try {
    const respuesta = await fetch("/api/inscripciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      mensaje.textContent = resultado.mensaje;
      return;
    }

    mensaje.textContent = "¡Inscripción registrada correctamente!";

    formulario.reset();
    await cargarInscripciones();

  } catch (error) {
    mensaje.textContent = "Error al conectar con el servidor.";
  }
});

// Mostrar registros al abrir la página
cargarInscripciones();