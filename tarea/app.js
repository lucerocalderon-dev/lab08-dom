// CLASE PROPIA: Estudiante
class Estudiante {
  constructor(nombre, calificacion) {
    this.id = Date.now();
    this.nombre = nombre;
    this.calificacion = parseFloat(calificacion);
  }

  // Método 1: Determina si el estudiante está aprobado
  esAprobado() {
    return this.calificacion >= 10.5;
  }

  // Método 2: Formatea la información relevante del estudiante
  obtenerFormato() {
    const estado = this.esAprobado() ? "Aprobado" : "Desaprobado";
    return `${this.nombre} - Nota: ${this.calificacion.toFixed(1)} (${estado})`;
  }
}

// GESTIÓN DEL ESTADO Y DOM
class GestorNotas {
  constructor() {
    this.estudiantes = [];
    
    // Referencias DOM
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
    // Evento 1: submit (Formulario)
    this.formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      this.agregarEstudiante();
    });

    // Evento 2: input (Buscador en tiempo real)
    this.inputBuscador.addEventListener("input", () => {
      this.renderizar();
    });

    // Evento 3: click (Delegación para borrar notas)
    this.listaDOM.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-borrar")) {
        const id = Number(e.target.dataset.id);
        this.eliminarEstudiante(id);
      }
    });
  }

  validarEntradas(nombre, calificacion) {
    if (!nombre.trim()) {
      return "El nombre del estudiante no puede estar vacío.";
    }
    if (isNaN(calificacion) || calificacion === "") {
      return "Debe ingresar una calificación válida.";
    }
    const notaNum = Number(calificacion);
    if (notaNum < 0 || notaNum > 20) {
      return "La calificación debe ser un valor entre 0 y 20.";
    }
    return null; // Sin errores
  }

  agregarEstudiante() {
    const nombre = this.inputNombre.value;
    const calificacion = this.inputCalificacion.value;

    const error = this.validarEntradas(nombre, calificacion);
    if (error) {
      this.mensajeError.textContent = error;
      return;
    }

    // Limpiar mensaje de error si pasa la validación
    this.mensajeError.textContent = "";

    const nuevoEstudiante = new Estudiante(nombre, calificacion);
    this.estudiantes.push(nuevoEstudiante);

    // Resetear campos del formulario
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
    // Filtrado según búsqueda
    const filtro = this.inputBuscador.value.toLowerCase();
    const estudiantesFiltrados = this.estudiantes.filter((e) =>
      e.nombre.toLowerCase().includes(filtro)
    );

    // Modificar / Reconstruir DOM
    this.listaDOM.innerHTML = "";

    estudiantesFiltrados.forEach((estudiante) => {
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

    // Actualizar promedio
    this.promedioSpan.textContent = this.calcularPromedio();
  }
}

// Inicializar al cargar el script
document.addEventListener("DOMContentLoaded", () => {
  new GestorNotas();
});

// v2: Agregado de escuchadores de eventos y validaciones
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
    mensajeError.textContent = "Ingrese un nombre válido y una nota entre 0 y 20.";
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

// v3: con clases y objetos
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

    this.listaDOM.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-borrar")) {
        const id = Number(e.target.dataset.id);
        this.eliminarEstudiante(id);
      }
    });
  }

  agregarEstudiante() {
    const nombre = document.getElementById("nombre").value;
    const nota = document.getElementById("calificacion").value;

    if (!nombre.trim() || isNaN(nota) || nota < 0 || nota > 20) {
      this.mensajeError.textContent = "Datos inválidos. Ingrese una nota entre 0 y 20.";
      return;
    }
    this.mensajeError.textContent = "";

    this.estudiantes.push(new Estudiante(nombre, nota));
    this.renderizar();
  }

  eliminarEstudiante(id) {
    this.estudiantes = this.estudiantes.filter(e => e.id !== id);
    this.renderizar();
  }

  renderizar() {
    this.listaDOM.innerHTML = "";
    this.estudiantes.forEach(est => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${est.nombre}</td>
        <td>${est.calificacion.toFixed(1)}</td>
        <td style="color: ${est.esAprobado() ? 'green' : 'red'}">${est.esAprobado() ? 'Aprobado' : 'Desaprobado'}</td>
        <td><button class="btn-borrar" data-id="${est.id}">Eliminar</button></td>
      `;
      this.listaDOM.appendChild(tr);
    });
  }
}