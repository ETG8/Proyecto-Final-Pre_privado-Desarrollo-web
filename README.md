# Proyecto: Registro de participantes para un taller — versión base
## 1. Descripción del proyecto

Aplicación web desarrollada para gestionar las inscripciones
de participantes a talleres de formación.

El sistema permite registrar, consultar, actualizar y eliminar
participantes mediante una interfaz web.

También incluye reportes visuales que muestran información
estadística obtenida directamente de una base de datos SQLite.

El diseño utiliza la identidad visual ETG, con colores negro,
rojo y plateado, y se adapta a computadoras y dispositivos móviles.

## 2. Tecnologías utilizadas

- HTML5: estructura de la página y formularios.
- CSS3: estilos y diseño adaptable.
- JavaScript: interacción, validaciones y consumo de API.
- Node.js: ejecución de JavaScript en el servidor.
- Express.js: creación de rutas y manejo de solicitudes HTTP.
- SQLite: almacenamiento persistente de inscripciones.
- Git: control de versiones.
- GitHub: repositorio del código fuente.
- Visual Studio Code: entorno de desarrollo.

## 3. Requisitos

Para ejecutar el proyecto se necesita:

- Node.js 22.13 o posterior.
- npm.
- Visual Studio Code u otro editor de código.
- Un navegador web.

Durante el desarrollo se utilizó Node.js v26.13.0.

No es necesario instalar un servidor de base de datos
adicional porque se utiliza el módulo integrado node:sqlite.

## 4. Instalación del proyecto

1. Descargar o clonar el repositorio desde GitHub.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir una terminal desde Terminal > New Terminal.
4. Instalar las dependencias:

```bash
npm.cmd install
```

5. Iniciar el servidor:

```bash
npm.cmd start
```

También se puede iniciar directamente mediante:

```bash
node server.js
```

6. Abrir en el navegador:

http://localhost:3000

Si PowerShell bloquea la ejecución de npm, utilizar:

```powershell
npm.cmd install
npm.cmd start
```

## 5. Estructura del proyecto

```text
registro-taller-estudiante/
|
|-- public/
|   |-- index.html
|   |-- styles.css
|   |-- app.js
|   |-- logo-etg.png
|
|-- database.js
|-- server.js
|-- package.json
|-- package-lock.json
|-- .gitignore
|-- README.md
|-- bitacora.md
```

El archivo registro_taller.db se genera localmente
al iniciar la aplicación.

## 6. Base de datos SQLite

El sistema utiliza SQLite para guardar los registros
de manera persistente.

La conexión se configura en database.js mediante:

```javascript
const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("registro_taller.db");
```

Al iniciar el servidor, se abre la base de datos y
se crea automáticamente la tabla inscripciones
si todavía no existe.

La tabla contiene los siguientes campos:

- id: identificador único.
- nombre: nombre completo del participante.
- correo: correo electrónico.
- telefono: número telefónico.
- taller: taller seleccionado.
- horario: horario elegido.
- modalidad: presencial o virtual.
- nivel_experiencia: experiencia previa.
- fecha_registro: fecha de creación del registro.

La clave primaria es id y se genera automáticamente.

Se utilizan consultas SQL preparadas para insertar,
actualizar y eliminar información de manera segura.

Los datos permanecen almacenados incluso después
de reiniciar el servidor.

## 7. Funcionalidades del sistema

El sistema permite:

1. Registrar participantes con los siete campos requeridos.
2. Validar que los campos obligatorios estén completos.
3. Comprobar el formato del correo electrónico.
4. Consultar todos los participantes registrados.
5. Editar los datos de un participante existente.
6. Eliminar registros mediante una confirmación.
7. Mostrar mensajes de éxito o error.
8. Generar reportes visuales desde SQLite.
9. Actualizar la lista y los reportes automáticamente.

## 8. Rutas de la API

### GET /api/inscripciones

Consulta todos los participantes almacenados.

Ejemplo:

http://localhost:3000/api/inscripciones

Respuesta HTTP 200:

```json
[
  {
    "id": 1,
    "nombre": "Ana Lopez",
    "correo": "ana@example.com",
    "telefono": "41234567",
    "taller": "JavaScript",
    "horario": "Matutina 07 am - 11 am",
    "modalidad": "Virtual",
    "nivel_experiencia": "Inicial",
    "fecha_registro": "2026-11-10 10:00:00"
  }
]
```

Los datos mostrados son ficticios.

### POST /api/inscripciones

Crea una inscripción nueva.

Recibe un objeto JSON con los siete campos.

Ejemplo:

```json
{
  "nombre": "Ana Lopez",
  "correo": "ana@example.com",
  "telefono": "41234567",
  "taller": "JavaScript",
  "horario": "Matutina 07 am - 11 am",
  "modalidad": "Virtual",
  "nivel_experiencia": "Inicial"
}
```

Respuestas:

- HTTP 201: inscripción creada correctamente.
- HTTP 400: datos incompletos o correo inválido.

### PUT /api/inscripciones/:id

Actualiza una inscripción existente.

Ejemplo:

PUT /api/inscripciones/1

Se envían nuevamente los siete campos en formato JSON,
incluyendo los valores modificados.

Respuestas:

- HTTP 200: inscripción actualizada.
- HTTP 400: datos incorrectos o identificador inválido.
- HTTP 404: inscripción no encontrada.

### DELETE /api/inscripciones/:id

Elimina una inscripción utilizando su identificador.

Ejemplo:

DELETE /api/inscripciones/1

Respuestas:

- HTTP 200: inscripción eliminada.
- HTTP 400: identificador inválido.
- HTTP 404: inscripción no encontrada.

### GET /api/reportes/resumen

Consulta información estadística desde SQLite.

Ejemplo:

http://localhost:3000/api/reportes/resumen

Respuesta de ejemplo:

```json
{
  "total": 2,
  "porTaller": [
    {"taller": "JavaScript", "cantidad": 1},
    {"taller": "HTML y CSS", "cantidad": 1}
  ],
  "porHorario": [
    {"horario": "Matutina 07 am - 11 am", "cantidad": 2}
  ],
  "porModalidad": [
    {"modalidad": "Virtual", "cantidad": 2}
  ]
}
```

## 9. Cómo probar las operaciones

### Prueba 1: Crear una inscripción

1. Abrir http://localhost:3000.
2. Completar los siete campos del formulario.
3. Presionar Registrar inscripción.
4. Comprobar que aparece un mensaje de confirmación.
5. Verificar que el participante aparece en la lista.

Resultado esperado:
La API guarda el registro mediante POST y devuelve HTTP 201.

### Prueba 2: Consultar inscripciones

1. Abrir http://localhost:3000/api/inscripciones.
2. Revisar la respuesta JSON.
3. Comprobar que aparezcan los registros guardados.

Resultado esperado:
GET devuelve los datos existentes en SQLite.

### Prueba 3: Actualizar una inscripción

1. Abrir la página principal.
2. Presionar Editar en un participante.
3. Modificar alguno de sus datos.
4. Presionar Registrar inscripción.
5. Comprobar que los cambios aparecen en la lista.

Resultado esperado:
PUT actualiza el registro sin crear uno nuevo.

### Prueba 4: Eliminar una inscripción

1. Buscar un participante.
2. Presionar Eliminar.
3. Confirmar la operación.
4. Verificar que desaparece de la lista.

Resultado esperado:
DELETE elimina el registro de SQLite.

### Prueba 5: Validar datos incorrectos

1. Dejar un campo obligatorio vacío.
2. Intentar enviar el formulario.
3. Introducir un correo inválido.
4. Intentar enviar nuevamente.

Resultado esperado:
El navegador impide enviar datos inválidos.
Express también rechaza solicitudes incorrectas con HTTP 400.

### Prueba 6: Comprobar persistencia

1. Registrar un participante ficticio.
2. Detener el servidor con Ctrl + C.
3. Ejecutar nuevamente npm start.
4. Abrir http://localhost:3000.

Resultado esperado:
El participante sigue guardado después del reinicio.

### Prueba 7: Comprobar reportes

1. Registrar varios participantes.
2. Consultar la sección Reportes de inscripciones.
3. Comparar el total con la lista.
4. Editar un participante y modificar su modalidad.
5. Comprobar que las barras cambian.
6. Eliminar un participante y revisar nuevamente.

Resultado esperado:
Los reportes se actualizan según los datos de SQLite.

### Prueba 8: Diseño adaptable

1. Abrir las herramientas de desarrollador de Chrome.
2. Activar la vista de dispositivos móviles.
3. Seleccionar un dispositivo.
4. Comprobar que el formulario y los reportes se adaptan.

Resultado esperado:
La página permite navegar y utilizar sus funciones
en pantallas pequeñas.

## 10. Reportes visuales

El sistema incluye cuatro indicadores:

- Total de participantes inscritos.
- Cantidad de participantes por taller.
- Cantidad de participantes por horario.
- Cantidad de participantes por modalidad.

La información se obtiene mediante consultas SQL
que utilizan COUNT(*) y GROUP BY.

JavaScript consulta la ruta GET /api/reportes/resumen
mediante fetch y presenta los resultados en tarjetas
y barras visuales.

Los reportes se actualizan después de crear,
editar o eliminar una inscripción.

## 11. Seguridad y validaciones

El sistema utiliza:

- Campos obligatorios en HTML.
- Validación de correo electrónico.
- Validación de datos en Express.
- Consultas SQL preparadas.
- Comprobación de identificadores.
- Manejo de errores HTTP.
- textContent para mostrar información de registros.

Las validaciones del servidor permiten rechazar datos
incorrectos aunque una solicitud no provenga del formulario.

## 12. Archivos excluidos de GitHub

El archivo .gitignore excluye:

```gitignore
node_modules/
.env
registro_taller.db
registro_taller.db-shm
registro_taller.db-wal
```

La base de datos local no se publica en GitHub.

Cada persona que descargue el proyecto puede crear su
propia base de datos al iniciar la aplicación.

## 13. Evidencias de funcionamiento

Las evidencias del proyecto deben incluir:

- Formulario de inscripción con sus campos.
- Registro creado correctamente.
- Lista de participantes con botones Editar y Eliminar.
- Actualización de un participante.
- Eliminación de una inscripción.
- Reportes visuales con datos ficticios.
- Diseño adaptable a dispositivos móviles.
- Funcionamiento de la API y persistencia de SQLite.

## 14. Conclusión

El proyecto ETG Registro de participantes para un taller
integra frontend, backend y base de datos.

Se implementó una API REST con Express, almacenamiento
persistente mediante SQLite y operaciones para crear,
consultar, actualizar y eliminar participantes.

También se desarrollaron reportes visuales dinámicos
y un diseño personalizado adaptable.

El proyecto demuestra el funcionamiento completo
de una aplicación web conectada a una base de datos.