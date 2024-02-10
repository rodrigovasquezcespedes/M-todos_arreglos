// Declaramos un array vacío para almacenar las tareas.
let tareas = [];

// Seleccionamos los elementos del DOM con los que vamos a interactuar.
const entrada = document.querySelector("#entrada-tarea");
const boton = document.querySelector("#boton");
const totalTareas = document.querySelector("#total-tareas");
const tareasCompletadas = document.querySelector("#tareas-completadas");
const listaTareas = document.querySelector("#lista-tareas");

// Función para agregar una tarea al array de tareas.
const agregarTarea = () => {
  // Obtenemos el valor del input y eliminamos espacios en blanco al inicio y al final.
  const descripcion = entrada.value.trim();
  if (descripcion !== "") { // Verificamos que la descripción no esté vacía.
    // Generamos un ID único para la tarea y la añadimos al array de tareas.
    const id = tareas.length + 1;
    tareas.push({ id, descripcion, completada: false });
    // Limpiamos el valor del input.
    entrada.value = ""
    // Mostramos la tarea en la interfaz.
    mostrarTarea();
  } else {
    alert("Ingresar Datos"); // Alerta si la descripción está vacía.
  }
}

// Función para mostrar las tareas en la interfaz.
const mostrarTarea = () => {
  // Limpiamos el contenido anterior de la lista de tareas.
  listaTareas.innerHTML = "";

  // Creamos la estructura de la tabla con su encabezado.
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

  // Obtenemos una referencia a la tabla recién creada.
  const tabla = listaTareas.querySelector('table');

  // Iteramos sobre cada tarea y la añadimos a la tabla.
  for (let i = 0; i < tareas.length; i++) {
    const tarea = tareas[i];
    // Añadimos una fila para cada tarea.
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

  // Actualizamos el resumen de tareas.
  actualizarTarea();
}

// Función para eliminar una tarea.
const eliminarTarea = (id) => {
  // Encontramos el índice de la tarea con el ID proporcionado.
  const indice = tareas.findIndex(tarea => tarea.id === id);
  // Si se encuentra la tarea, se elimina del array.
  if (indice !== -1) {
    tareas.splice(indice, 1);
    // Mostramos nuevamente las tareas actualizadas.
    mostrarTarea();
  } 
}

// Función para actualizar el resumen de tareas.
const actualizarTarea = () => {
  // Actualizamos el total de tareas.
  totalTareas.textContent = tareas.length;

  // Contamos las tareas completadas.
  const tareasCompletadasCount = tareas.filter(tarea => tarea.completada).length;
  tareasCompletadas.textContent = tareasCompletadasCount;
};

// Función para actualizar el estado de completado de una tarea.
const actualizarEstado = (id, completada) => {
  // Encontramos la tarea en el array de tareas.
  const tarea = tareas.find(tarea => tarea.id === id);
  if (tarea) {
    // Actualizamos el estado de completado de la tarea.
    tarea.completada = completada;
    // Mostramos las tareas actualizadas.
    mostrarTarea();
  }
}

// Escuchamos el evento 'click' en el botón y llamamos a la función agregarTarea.
boton.addEventListener('click', agregarTarea);

// Mostramos las tareas iniciales al cargar la página.
mostrarTarea();

