const formulario = document.querySelector("#formulario-registro");
const lista = document.querySelector("#lista-inscripciones");
const mensaje = document.querySelector("#mensaje");

// Identificar si estamos editando un registro
let idEnEdicion = null;

// Obtener y mostrar las inscripciones
async function cargarInscripciones() {
  try {
    const respuesta = await fetch("/api/inscripciones");

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar las inscripciones.");
    }

    const inscripciones = await respuesta.json();

    lista.replaceChildren();

    if (inscripciones.length === 0) {
      const item = document.createElement("li");
      item.textContent = "Aún no hay inscripciones.";
      lista.appendChild(item);
      return;
    }

    inscripciones.forEach((inscripcion) => {
      const item = document.createElement("li");

      const texto = document.createElement("p");
      texto.textContent =
       `${inscripcion.nombre} - ${inscripcion.taller} - ${inscripcion.horario} - ${inscripcion.modalidad} - ${inscripcion.nivel_experiencia}`;

      // Botón Editar
      const editar = document.createElement("button");
      editar.type = "button";
      editar.textContent = "Editar";

      editar.addEventListener("click", () => {
        prepararEdicion(inscripcion);
      });

      // Botón Eliminar
      const eliminar = document.createElement("button");
      eliminar.type = "button";
      eliminar.textContent = "Eliminar";

      eliminar.addEventListener("click", () => {
        eliminarInscripcion(inscripcion.id);
      });

      item.append(texto, editar, eliminar);
      lista.appendChild(item);
    });

  } catch (error) {
    mensaje.textContent = error.message;
  }
}

// Preparar el formulario para editar
function prepararEdicion(inscripcion) {
  idEnEdicion = inscripcion.id;

  const campos = [
  "nombre",
  "correo",
  "telefono",
  "taller",
  "horario",
  "modalidad",
  "nivel_experiencia"
];

campos.forEach((campo) => {
  const control = formulario.elements.namedItem(campo);

  if (control) {
    control.value = inscripcion[campo];
  }
});

  mensaje.textContent = "Editando inscripción de " + inscripcion.nombre;

  formulario.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Eliminar inscripción
async function eliminarInscripcion(id) {
  if (!confirm("¿Deseas eliminar esta inscripción?")) {
    return;
  }

  try {
    const respuesta = await fetch("/api/inscripciones/" + id, {
      method: "DELETE"
    });

    const resultado = await respuesta.json();

    mensaje.textContent = resultado.mensaje || resultado.error;

    if (respuesta.ok) {
      if (idEnEdicion === id) {
        idEnEdicion = null;
        formulario.reset();
      }

      await cargarInscripciones();
      await cargarReportes();
    }

  } catch (error) {
    mensaje.textContent = "Error al eliminar la inscripción.";
  }
}

// Registrar o actualizar una inscripción
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  if (!formulario.reportValidity()) {
    return;
  }

  const datosFormulario = new FormData(formulario);

  const datos = {
    nombre: datosFormulario.get("nombre"),
    correo: datosFormulario.get("correo"),
    telefono: datosFormulario.get("telefono"),
    taller: datosFormulario.get("taller"),
    horario: datosFormulario.get("horario"),
    modalidad: datosFormulario.get("modalidad"),
    nivel_experiencia: datosFormulario.get("nivel_experiencia")
  };

  const metodo = idEnEdicion ? "PUT" : "POST";

  const ruta = idEnEdicion
    ? "/api/inscripciones/" + idEnEdicion
    : "/api/inscripciones";

  try {
    const respuesta = await fetch(ruta, {
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      mensaje.textContent =
        resultado.mensaje || resultado.error || "Error al guardar.";
      return;
    }

    mensaje.textContent = idEnEdicion
      ? "¡Inscripción actualizada correctamente!"
      : "¡Inscripción registrada correctamente!";

    formulario.reset();
    idEnEdicion = null;

    await cargarInscripciones();
    await cargarReportes();

  } catch (error) {
    mensaje.textContent = "Error al conectar con el servidor.";
  }
});

// Mostrar los registros guardados al abrir la página
cargarInscripciones();

// Obtener y mostrar los reportes desde SQLite
async function cargarReportes() {
  try {
    const respuesta = await fetch("/api/reportes/resumen");

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los reportes.");
    }

    const datos = await respuesta.json();

    // Mostrar total de inscripciones
    document.querySelector("#total").textContent = datos.total;

    // Dibujar las barras de cada categoría
    function mostrarBarras(idLista, registros, campo) {
      const listaReporte = document.querySelector(idLista);
      listaReporte.replaceChildren();

      if (registros.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Todavía no hay inscripciones para reportar.";
        listaReporte.appendChild(item);
        return;
      }

      const mayor = Math.max(
        ...registros.map(registro => Number(registro.cantidad)),
        1
      );

      registros.forEach(registro => {
        const item = document.createElement("li");

        const etiqueta = document.createElement("p");
        etiqueta.textContent =
          registro[campo] + ": " + registro.cantidad;

        const fondo = document.createElement("div");
        fondo.className = "barra-fondo";

        const barra = document.createElement("div");
        barra.className = "barra";

        barra.style.width =
          (Number(registro.cantidad) / mayor * 100) + "%";

        fondo.appendChild(barra);
        item.append(etiqueta, fondo);
        listaReporte.appendChild(item);
      });
    }

    // Reporte por taller
    mostrarBarras(
      "#reporte-talleres",
      datos.porTaller,
      "taller"
    );

    // Reporte por horario
    mostrarBarras(
      "#reporte-horarios",
      datos.porHorario,
      "horario"
    );

    // Reporte por modalidad
    mostrarBarras(
      "#reporte-modalidades",
      datos.porModalidad,
      "modalidad"
    );

  } catch (error) {
    console.error("Error al cargar reportes:", error);
  }
}

// Cargar los reportes al abrir la página
cargarReportes();