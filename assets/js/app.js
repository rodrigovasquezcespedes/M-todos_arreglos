let tareas = [];

const entrada = document.querySelector("#entrada-tarea");
const boton = document.querySelector("#boton");
const totalTareas = document.querySelector("#total-tareas");
const tareasCompletadas = document.querySelector("#tareas-completadas");
const listaTareas = document.querySelector("#lista-tareas");
const check = document.querySelector("#checkBox");


                                                /* funcion de agregar datos */
const agregarTarea = () => {
  const descripcion = entrada.value.trim();
  if (descripcion !== "") {// si es distinto a vacio
    const id = tareas.length + 1;// la cantidad de elementos mas 1
    tareas.push({ id, descripcion, completada: false });
    entrada.value = ""
    mostrarTarea();
    entrada.value = "";//limpia el input
  } else {
    alert("Ingresar Datos");// si es vacio se activa el alerta 
  }
}


                                                      /* mostrar datos */
const mostrarTarea = () => {

  listaTareas.innerHTML = ""; // Limpiar el contenido previo

  // Crear la tabla y su encabezado
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

  // Obtener la referencia de la tabla recién creada
  const tabla = listaTareas.querySelector('table');

  // Iterar sobre cada tarea y agregarla a la tabla
  for (let i = 0; i < tareas.length; i++) {
    const tarea = tareas[i];

    // Agregar una fila para cada tarea
    tabla.innerHTML += `
      <tr>
        <td>${tarea.id}</td>
        <td>${tarea.descripcion}</td>
        <td><input type="checkbox" id="checkBox" onclick="actualizarResumen(${tarea.id})"></td>
        <td><a href="#" onclick="eliminarTarea(${tarea.id})"><i class="fa-regular fa-circle-xmark"></i></a></td>
      </tr>
    `;
  }

  // Actualizar el resumen (si es necesario)
  actualizarTarea();
}



                                                      /* Eliminar Tarea */
const eliminarTarea = (id) => {
  // Encontrar el índice de la tarea con el id dado
  const indice = tareas.findIndex(tarea => tarea.id === id);
  
  // Si se encuentra la tarea (el índice no es -1), se elimina del array
  if (indice !== -1) {
    tareas.splice(indice, 1);
    mostrarTarea();
  } 
}

                                                      /* actualizar Datos */
// const actualizarTarea= ()=> {
//   totalTareas.innerHTML = tareas.length;
//   tareasCompletadas.innerHTML = tareas.findIndex(tarea => tareasCompletada).length;
// }
const actualizarTarea = () => {
  // Actualizar el total de tareas
  totalTareas.innerHTML = tareas.length;

  // Contar las tareas completadas
  const tareasCompletadasCount = tareas.filter(tarea => tarea.completada).length;
  tareasCompletadas.textContent = tareasCompletadasCount;
};


boton.addEventListener('click', agregarTarea);
// Renderizado inicial 
mostrarTarea();
actualizarTarea();
