# Tarea: Mi componente interactivo

## Componente elegido
**Registro de Notas de Estudiantes**: Un componente interactivo que permite ingresar el nombre de un estudiante junto a su calificación (entre 0 y 20), calcular dinámicamente si está aprobado o desaprobado, calcular el promedio general del curso, filtrar estudiantes por nombre y eliminar registros de la lista.

## Version 1: solo DOM
### Código principal (JS)
```javascript
const tabla = document.getElementById("lista-notas");
const promedioSpan = document.getElementById("promedio-general");

const datosIniciales = [
  { nombre: "Carlos Pérez", nota: 15 },
  { nombre: "María Lopez", nota: 8 }
];

function renderV1() {
  tabla.innerHTML = "";
  let suma = 0;

  datosIniciales.forEach(item => {
    const tr = document.createElement("tr");
    
    const tdNombre = document.createElement("td");
    tdNombre.textContent = item.nombre;
    
    const tdNota = document.createElement("td");
    tdNota.textContent = item.nota;

    tr.appendChild(tdNombre);
    tr.appendChild(tdNota);
    tabla.appendChild(tr);

    suma += item.nota;
  });

  promedioSpan.textContent = (suma / datosIniciales.length).toFixed(2);
}
renderV1();
``` 

## Version 2: con eventos
### Código principal (JS)
```javascript
const formulario = document.getElementById("nota-form");
const inputNombre = document.getElementById("nombre");
const inputNota = document.getElementById("calificacion");
const inputBuscador = document.getElementById("buscador");
const mensajeError = document.getElementById("mensaje-error");

formulario.addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = inputNombre.value.trim();
  const nota = parseFloat(inputNota.value);

  if (!nombre || isNaN(nota) || nota < 0 || nota > 20) {
    mensajeError.textContent = "La calificación debe ser un valor entre 0 y 20.";
    return;
  }
  mensajeError.textContent = "";

  datosIniciales.push({ nombre, nota });
  renderV1();
});

inputBuscador.addEventListener("input", function() {
  const filtro = inputBuscador.value.toLowerCase();
  const filas = tabla.getElementsByTagName("tr");

  Array.from(filas).forEach(fila => {
    const texto = fila.firstElementChild.textContent.toLowerCase();
    fila.style.display = texto.includes(filtro) ? "" : "none";
  });
}); 
```

## Version 3: con clases y objetos 
### Código principal (JS)
```javascript
class Estudiante {
  constructor(nombre, calificacion) {
    this.id = Date.now();
    this.nombre = nombre;
    this.calificacion = parseFloat(calificacion);
  }

  esAprobado() {
    return this.calificacion >= 10.5;
  }

  obtenerFormato() {
    const estado = this.esAprobado() ? "Aprobado" : "Desaprobado";
    return `${this.nombre} - Nota: ${this.calificacion.toFixed(1)} (${estado})`;
  }
}

class GestorNotas {
  constructor() {
    this.estudiantes = [];
    this.formulario = document.getElementById("nota-form");
    this.inputNombre = document.getElementById("nombre");
    this.inputCalificacion = document.getElementById("calificacion");
    this.inputBuscador = document.getElementById("buscador");
    this.listaDOM = document.getElementById("lista-notas");
    this.mensajeError = document.getElementById("mensaje-error");
    this.promedioSpan = document.getElementById("promedio-general");

    this.inicializarEventos();
  }

  inicializarEventos() {
    this.formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      this.agregarEstudiante();
    });

    this.inputBuscador.addEventListener("input", () => {
      this.renderizar();
    });

    this.listaDOM.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-borrar")) {
        const id = Number(e.target.dataset.id);
        this.eliminarEstudiante(id);
      }
    });
  }

  validarEntradas(nombre, calificacion) {
    if (!nombre.trim()) return "El nombre del estudiante no puede estar vacío.";
    if (isNaN(calificacion) || calificacion === "") return "Debe ingresar una calificación válida.";
    const notaNum = Number(calificacion);
    if (notaNum < 0 || notaNum > 20) return "La calificación debe ser un valor entre 0 y 20.";
    return null;
  }

  agregarEstudiante() {
    const error = this.validarEntradas(this.inputNombre.value, this.inputCalificacion.value);
    if (error) {
      this.mensajeError.textContent = error;
      return;
    }
    this.mensajeError.textContent = "";

    const nuevo = new Estudiante(this.inputNombre.value, this.inputCalificacion.value);
    this.estudiantes.push(nuevo);
    this.inputNombre.value = "";
    this.inputCalificacion.value = "";
    this.renderizar();
  }

  eliminarEstudiante(id) {
    this.estudiantes = this.estudiantes.filter((e) => e.id !== id);
    this.renderizar();
  }

  calcularPromedio() {
    if (this.estudiantes.length === 0) return "0.00";
    const suma = this.estudiantes.reduce((acc, est) => acc + est.calificacion, 0);
    return (suma / this.estudiantes.length).toFixed(2);
  }

  renderizar() {
    const filtro = this.inputBuscador.value.toLowerCase();
    const filtrados = this.estudiantes.filter((e) => e.nombre.toLowerCase().includes(filtro));

    this.listaDOM.innerHTML = "";
    filtrados.forEach((estudiante) => {
      const tr = document.createElement("tr");

      const tdNombre = document.createElement("td");
      tdNombre.textContent = estudiante.nombre;

      const tdNota = document.createElement("td");
      tdNota.textContent = estudiante.calificacion.toFixed(1);

      const tdEstado = document.createElement("td");
      tdEstado.textContent = estudiante.esAprobado() ? "Aprobado" : "Desaprobado";
      tdEstado.style.color = estudiante.esAprobado() ? "green" : "red";

      const tdAccion = document.createElement("td");
      const btnBorrar = document.createElement("button");
      btnBorrar.textContent = "Eliminar";
      btnBorrar.classList.add("btn-borrar");
      btnBorrar.dataset.id = estudiante.id;
      tdAccion.appendChild(btnBorrar);

      tr.appendChild(tdNombre);
      tr.appendChild(tdNota);
      tr.appendChild(tdEstado);
      tr.appendChild(tdAccion);

      this.listaDOM.appendChild(tr);
    });

    this.promedioSpan.textContent = this.calcularPromedio();
  }
} 
```

## Donde uso DOM, eventos y objetos
| Parte del código final | DOM | Eventos | Objetos / Clases |
| :--- | :---: | :---: | :---: |
| Modificación de `textContent`, `innerHTML` y colores en la interfaz | **X** | | |
| Creación de filas `<tr>`, celdas `<td>` y botones con `createElement` y `appendChild` | **X** | | |
| Captura del envío del formulario (`submit`) | | **X** | |
| Búsqueda de estudiantes en tiempo real (`input`) | | **X** | |
| Delegación de clics para eliminar filas de la tabla (`click`) | | **X** | |
| Definición del modelo de datos con atributos `id`, `nombre` y `calificacion` | | | **X** |
| Métodos de lógica de negocio `esAprobado()` y `obtenerFormato()` en la clase `Estudiante` | | | **X** |
| Administración del estado y arreglo de estudiantes mediante la clase `GestorNotas` | | | **X** |

## Pruebas realizadas
| Acción | Resultado esperado | Resultado obtenido | Cumple (Sí / No) |
| :--- | :--- | :--- | :---: |
| Intentar enviar el formulario dejando el nombre vacío | Mostrar el mensaje "El nombre del estudiante no puede estar vacío." en rojo | Aparece el mensaje de error visible debajo del formulario y no se crea el registro | **Sí** |
| Ingresar una nota menor a 0 o mayor a 20 (ejemplo: 25) | Mostrar el mensaje "La calificación debe ser un valor entre 0 y 20." | Se muestra la advertencia en pantalla sin usar `alert` y se detiene la inserción | **Sí** |
| Insertar un estudiante válido (ejemplo: "Ana López", nota: 16.5) | Agregar la fila a la tabla, clasificar como "Aprobado" y recalcular el promedio | El estudiante aparece en la tabla con texto verde y el promedio del curso se actualiza | **Sí** |
| Escribir un nombre en el buscador (ejemplo: "Ana") | Ocultar las filas que no coincidan y mostrar solo las coincidencias en tiempo real | La lista filtra las filas instantáneamente a medida que se escribe en el campo | **Sí** |
| Hacer clic en el botón "Eliminar" de un registro | Remover al estudiante seleccionado de la lista y recalcular el promedio | La fila desaparece del DOM, el objeto se borra del arreglo y el promedio se recalcula | **Sí** |

## Por que disene asi mi clase
Diseñé la clase `Estudiante` con los atributos `id`, `nombre` y `calificacion` porque contienen la información esencial requerida para gestionar un registro académico individual. El atributo `id` (generado mediante `Date.now()`) actúa como un identificador único que evita errores al eliminar registros con nombres o notas idénticas. En cuanto a sus métodos, `esAprobado()` encapsula la regla de negocio referente al puntaje mínimo de aprobación ($10.5$), lo que evita duplicar esa condición lógica en la interfaz del DOM; por su parte, `obtenerFormato()` centraliza la representación formateada en texto del estudiante para facilitar tareas de depuración o integración visual.