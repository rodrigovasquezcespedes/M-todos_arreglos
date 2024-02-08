let tareas = [];

const listaTareas = document.getElementById("lista-tareas");
const totalTareas = document.getElementById("total-tareas");
const tareasCompletadas = document.getElementById("tareas-completadas");
const boton = document.querySelector("#boton")
const entrada = document.querySelector("#entrada-tarea");


function actualizarResumen() {
  totalTareas.textContent = tareas.length;
  tareasCompletadas.textContent = tareas.filter(tarea => tarea.completada).length;
}

function mostrarTarea() {
  listaTareas.innerHTML = "";
  tareas.forEach(tarea => {
    const li = document.createElement("li");
    li.classList.add("item-tarea");
    if (tarea.completada) {
      li.classList.add("completada");
    }
    li.innerHTML = `
    
          ${tarea.id}
          &nbsp;&nbsp;&nbsp;&nbsp;
          ${tarea.descripcion}
          <button onclick="cambiarEstado(${tarea.id})">Cambiar</button>
          &nbsp;
          <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
        
      `;
    listaTareas.appendChild(li);
  });
  actualizarResumen();
}

function agregarTarea() {
  const descripcion = entrada.value.trim();
  if (descripcion !== "") {
    const id = tareas.length + 1;
    tareas.push({ id, descripcion, completada: false });
    mostrarTarea();
    entrada.value = "";
  }
}

function eliminarTarea(id) {
  tareas = tareas.filter(tarea => tarea.id !== id);
  mostrarTarea();
}

function cambiarEstado(id) {
  const tarea = tareas.find(tarea => tarea.id === id);
  if (tarea) {
    tarea.completada = !tarea.completada;
    mostrarTarea();
  }
}

// Renderizado inicial 
mostrarTarea();
boton.addEventListener('click', agregarTarea);
