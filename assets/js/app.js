let tareas = [];

const entrada = document.querySelector("#entrada-tarea");
const boton = document.querySelector("#boton");
const totalTareas = document.querySelector("#total-tareas");
const tareasCompletadas = document.querySelector("#tareas-completadas");
const listaTareas = document.querySelector("#lista-tareas");

// se crea una función para agregar una tarea.
const agregarTarea = () => {
  const descripcion = entrada.value.trim();
  if (descripcion !== "") {
    const id = tareas.length + 1;
    tareas.push({ id, descripcion, completada: false });
    entrada.value = ""
    mostrarTarea();
  } else {
    alert("Ingresar Datos");
  }
}

// se crea una función para mostrar las tareas.
const mostrarTarea = () => {
  listaTareas.innerHTML = "";
  listaTareas.innerHTML = `
    <table>
      <tr>
        <th>ID</th>
        <th>Descripción</th>
        <th>Cumplido</th>
        <th>Eliminar</th>
      </tr>
    </table>
  `;
  const tabla = listaTareas.querySelector('table');
  for (let i = 0; i < tareas.length; i++) {
    const tarea = tareas[i];
    tabla.innerHTML += `
      <tr>
        <td>${tarea.id}</td>
        <td>${tarea.descripcion}</td>
        <! --  esta línea crea un checkbox en una celda de una tabla HTML, cuyo estado inicial (marcado o desmarcado) depende del estado de completado de la tarea correspondiente en el array tareas. Además, cuando se cambia el estado del checkbox, se llama a la función actualizarEstado() para actualizar el estado de la tarea en el array tareas. -->
        <td><input type="checkbox" id="checkBox-${tarea.id}" ${tarea.completada ? 'checked' : ''} onchange="actualizarEstado(${tarea.id}, this.checked)"></td>
        <td><a href="#" onclick="eliminarTarea(${tarea.id})"><i class="fa-regular fa-circle-xmark"></i></a></td>
      </tr>
    `;
  }
  actualizarTarea();
}

//se crea una función para eliminar una tarea por el id.
const eliminarTarea = (id) => {
  const indice = tareas.findIndex(tarea => tarea.id === id);
  if (indice !== -1) {
    tareas.splice(indice, 1);
    mostrarTarea();
  }
}

// se crea una función para actualizar el resumen de tareas.
const actualizarTarea = () => {
  // Actualiza el total de tareas.
  totalTareas.innerHTML = tareas.length;

  // se cuentan las tareas completadas.
  const tareasCompletadasCount = tareas.filter(tarea => tarea.completada).length;
  tareasCompletadas.innerHTML = tareasCompletadasCount;
};

// se crea una función para actualizar el estado  al completar una tarea con el checkbox.
const actualizarEstado = (id, completada) => {
  const tarea = tareas.find(tarea => tarea.id === id);
  if (tarea) {
    tarea.completada = completada;
    console.log(tarea);
    mostrarTarea();
  }
}

boton.addEventListener('click', agregarTarea);
mostrarTarea();

