# Bitácora de repaso de Desarrollo Web

Completa una ficha por tema con tus palabras. No copies párrafos de los sitios consultados.

## HTML
Resumen propio:
HTML es el lenguaje que se utiliza para crear la estructura de una página web. Por medio de sus etiquetas podemos organizar los textos, imágenes, enlaces, formularios y otras partes que forman el contenido de un sitio.
2 términos Clave y su explicación:
-	Etiqueta: Es un elemento que permite indicar qué tipo de contenido se está colocando en la página, por ejemplo, un título, un párrafo o una imagen.
-	Atributo: Es una característica que se agrega a una etiqueta para darle información adicional o definir cómo debe funcionar.
Ejemplo de Código explicado
<form>
  <label for="nombre">Nombre:</label>
  <input id="nombre" name="nombre" type="text" required>
  <button type="submit">Enviar</button>
</form>
Explicación: En este ejemplo se crea un formulario para ingresar el nombre de una persona. La etiqueta label identifica el campo, mientras que input permite escribir la información. El atributo required hace que el campo sea obligatorio antes de enviar el formulario.
Pregunta que podría aparecer en el examen
¿Cuál es la diferencia entre etiqueta y atributo?


## CSS
Resumen propio:
CSS es el lenguaje que permite darle estilo y presentación a una página web, se utiliza para cambiar colores, tamaños, espacios, posiciones y la distribución de los elementos. 
2 términos Clave y su explicación:
• Selector: Es el que permite elegir los elementos HTML a los que se les quiere aplicar un estilo.
• Modelo de caja: Es la forma en que CSS organiza el espacio de cada elemento, tomando en cuenta el contenido, el relleno, el borde y el margen.
Ejemplo de Código explicado
.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
Explicación: En este ejemplo se utiliza Flexbox para organizar los elementos dentro de un contenedor. justify-content permite alinearlos horizontalmente y align-items verticalmente. Además, padding agrega espacio interno.
Pregunta que podría aparecer en el examen
¿Cuál es la diferencia entre margin y padding en CSS?


## JavaScript y DOM
Resumen propio:
JavaScript es un lenguaje que permite agregar interacción y funcionalidad a una página web y junto con el DOM, permite acceder a los elementos HTML y modificarlos.
2 términos Clave y su explicación:
• DOM: Es la representación de la estructura HTML que JavaScript puede utilizar para acceder a los elementos y modificarlos.
• Evento: Es una acción que ocurre en la página, como hacer clic en un botón o escribir en un campo de texto.

Ejemplo de Código explicado
const boton = document.querySelector("#boton");

boton.addEventListener("click", function() {
  alert("Hola, bienvenido");
});

Explicación: En este ejemplo se busca un elemento que tenga el identificador boton. Después, mediante addEventListener, se establece que al hacer clic se muestre un mensaje en pantalla.
Pregunta que podría aparecer en el examen
¿Qué es el DOM y cómo se utiliza junto con JavaScript para modificar una página web?


## Node.js, Express y API
Resumen propio:
Node.js permite ejecutar JavaScript fuera del navegador, principalmente para trabajar del lado del servidor, Express facilita la creación de servidores y rutas, mientras que una API permite que diferentes aplicaciones intercambien información mediante solicitudes y respuestas.
2 términos Clave y su explicación:
• Ruta: Es una dirección del servidor que permite indicar qué acción se debe realizar cuando recibe una solicitud.
• API: Es un medio que permite la comunicación entre diferentes aplicaciones para enviar y recibir información.

Ejemplo de Código explicado
const express = require("express");
const app = express();

app.use(express.json());

app.post("/usuarios", (req, res) => {
  res.status(201).json({
    mensaje: "Usuario creado"
  });
});
Explicación: En este ejemplo se crea un servidor utilizando Express. La ruta /usuarios recibe solicitudes de tipo POST y responde con el estado 201, que indica que se creó un recurso correctamente. También se utiliza express.json() para poder recibir información en formato JSON.

Pregunta que podría aparecer en el examen
¿Cuál es la diferencia entre Node.js y Express, y para qué se utiliza una API?


## SQL
Resumen propio:
SQL es un lenguaje que se utiliza para trabajar con bases de datos, permite crear tablas, consultar información, agregar nuevos registros, modificar datos existentes y eliminar información, dependiendo de lo que se requiera.
2 términos Clave y su explicación:
• Clave primaria: Es un campo que permite identificar de manera única cada registro de una tabla.
• Clave foránea: Es un campo que permite relacionar una tabla con otra, utilizando la clave primaria de la tabla relacionada.

Ejemplo de Código explicado
SELECT nombre, correo
FROM usuarios
WHERE id = 1;
Explicación: En este ejemplo se realiza una consulta a la tabla usuarios para obtener únicamente el nombre y el correo del registro cuyo identificador sea igual a 1. SELECT indica los datos que se desean consultar y WHERE establece la condición.
Pregunta que podría aparecer en el examen
¿Cuál es la diferencia entre una clave primaria y una clave foránea dentro de una base de datos?


## Git y GitHub
Resumen propio:
Git es una herramienta que permite llevar el control de los cambios realizados en un proyecto, guardando diferentes versiones para poder consultar o recuperar avances anteriores y GitHub es una plataforma donde se pueden almacenar repositorios en línea y compartir proyectos con otras personas.
2 términos Clave y su explicación:
• Repositorio: Es el espacio donde se almacena un proyecto y su historial de cambios.
• Commit: Es un registro que guarda los cambios realizados en un momento determinado, acompañado de un mensaje que explica qué se modificó.

Ejemplo de Código explicado
git add .
git commit -m "Primer avance del proyecto"
git push
Explicación: En este ejemplo primero se agregan los cambios realizados al área de preparación con git add. Después se guardan en el historial mediante git commit y finalmente se envían al repositorio remoto utilizando git push.
Pregunta que podría aparecer en el examen
¿Para qué sirven los comandos add, commit y push?

## Preguntas durante las actividades:
1.	Explica qué hacen los atributos name, type y required.
•	name: identifica el dato de un campo cuando se envía el formulario. Por ejemplo, permite reconocer que un valor corresponde al nombre de la persona.
•	type: indica qué tipo de información se debe ingresar, como texto, correo electrónico o teléfono.
•	required: hace que un campo sea obligatorio. Si se deja vacío, el navegador muestra un aviso y no permite enviar el formulario.
2.	Registra una regla CSS propia y explica qué elemento selecciona.
. titulo {
	Color: #183153:
}

Esta regla selecciona los elementos que tengan la clase título y cambia el color de su texto a azul oscuro.
•	Selector: .titulo
•	Propiedad: color
•	Valor: #183153

3.	Registra una propiedad de Flexbox, una regla de media query y explica qué cambio visual produce cada una.

La propiedad Flexbox fue “justify-content: center;” Esta propiedad coloca los elementos en el centro de forma horizontal cuando están organizados en una fila y la regla de media query es: @media (max-width: 640px) {
    form {
        padding: 1rem;
    }
}
Esta regla se aplica cuando la pantalla mide 640 píxeles o menos. Reduce el espacio interno del formulario para que se adapte mejor a las pantallas de los teléfonos.

4.	¿Qué diferencia hay entre Node.js, npm y VS Code? ¿Por qué node_modules aparece después de instalar y no debe subirse a GitHub?

• Node.js: Es un entorno que permite ejecutar código JavaScript fuera del navegador.
• npm: Es una herramienta que permite instalar y administrar paquetes o librerías que necesitamos en un proyecto.
• VS Code: Es un editor de código donde podemos escribir, modificar y organizar nuestros programas.
Y node_modules no debe subirse y aparece después de instalar porque esa carpeta se crea automáticamente cuando instalamos las dependencias del proyecto con npm. Contiene todas las librerías necesarias para que el programa funcione.

5.	Define qué es una ruta. Escribe un ejemplo de GET y otro de POST, e indica cuándo usarías los estados HTTP 200, 201 y 400.

Una ruta es una dirección del servidor que se utiliza para recibir solicitudes. Está relacionada con un método HTTP, como GET o POST, y permite que el servidor ejecute una acción y devuelva una respuesta. Un ejemplo de get es: app.get("/api/inscripciones", (req, res) => {
    res.json(inscripciones);
});
Y un ejemplo de post es: app.post("/api/inscripciones", (req, res) => {
    res.status(201).json({
        mensaje: "Inscripción creada correctamente"
    });
});

•	200: cuando una solicitud se procesa correctamente, por ejemplo, al consultar una lista de inscripciones.
•	201: cuando se crea un nuevo registro correctamente, como una inscripción.
•	400: cuando la solicitud contiene datos incorrectos o incompletos.

6.	Explica la diferencia entre JSON.stringify() y response.json(). ¿Qué representa el estado 201?

JSON.stringify() convierte un objeto de JavaScript en texto con formato JSON, normalmente para enviarlo al servidor. Por otro lado, response.json() permite leer la respuesta del servidor en formato JSON y convertirla en un objeto que JavaScript pueda utilizar.

7.	Explica con tus palabras la diferencia entre add, commit y push. ¿Qué información comunica un buen mensaje de commit?

•	git add: selecciona los archivos o cambios que quiero guardar.
•	git commit: guarda esos cambios como una nueva versión en mi computadora y permite agregar un mensaje que expliqué lo que hice.

•	git push: envía los cambios guardados a GitHub para que el proyecto quede actualizado en el repositorio.

Un buen mensaje de commit comunica de forma breve y clara qué cambio se realizó en el proyecto.
