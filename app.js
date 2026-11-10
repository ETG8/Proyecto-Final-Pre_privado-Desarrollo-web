const formulario = document.querySelector("#formulario-registro");
const lista = document.querySelector("#lista-inscripciones");
const mensaje = document.querySelector("#mensaje");

async function cargarInscripciones() {
  // TODO: Solicita GET /api/inscripciones con fetch().
  // TODO: Limpia la lista y dibuja cada registro recibido.
  // Usa textContent para mostrar los datos.
}

formulario.addEventListener("submit", async (evento) => {
  // TODO 1: Evita que el formulario recargue la página.
  // TODO 2: Obtén los valores del formulario.
  // TODO 3: Envía los cinco datos como JSON con POST /api/inscripciones.
  // TODO 4: Muestra confirmación o el mensaje de error del servidor.
  // TODO 5: Si se guardó, limpia el formulario y vuelve a cargar la lista.
});

cargarInscripciones();