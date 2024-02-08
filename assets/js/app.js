let tareas = [
  { id: 1, descripcion: "Tarea 1", completada: false },
  { id: 2, descripcion: "Tarea 2", completada: false },
  { id: 3, descripcion: "Tarea 3", completada: false }
];

const listaTareas = document.getElementById("lista-tareas");
const totalTareas = document.getElementById("total-tareas");
const tareasCompletadas = document.getElementById("tareas-completadas");

function actualizarResumen() {
  totalTareas.textContent = tareas.length;
  tareasCompletadas.textContent = tareas.filter(tarea => tarea.completada).length;
}

function renderizarTareas() {
  listaTareas.innerHTML = "";
  tareas.forEach(tarea => {
      const li = document.createElement("li");
      li.classList.add("item-tarea");
      if (tarea.completada) {
          li.classList.add("completada");
      }
      li.innerHTML = `
          ${tarea.descripcion}
          <button onclick="cambiarCompletitud(${tarea.id})">Cambiar</button>
          <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
      `;
      listaTareas.appendChild(li);
  });
  actualizarResumen();
}

function agregarTarea() {
  const entrada = document.getElementById("entrada-tarea");
  const descripcion = entrada.value.trim();
  if (descripcion !== "") {
      const id = tareas.length + 1;
      tareas.push({ id, descripcion, completada: false });
      renderizarTareas();
      entrada.value = "";
  }
}

function eliminarTarea(id) {
  tareas = tareas.filter(tarea => tarea.id !== id);
  renderizarTareas();
}

function cambiarCompletitud(id) {
  const tarea = tareas.find(tarea => tarea.id === id);
  if (tarea) {
      tarea.completada = !tarea.completada;
      renderizarTareas();
  }
}

// Renderizado inicial
renderizarTareas();
