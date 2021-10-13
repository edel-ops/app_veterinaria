const listaVeterinarios = document.getElementById("lista-veterinarios");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const identificacion = document.getElementById("identificacion");
const pais = document.getElementById("pais");
const indice = document.getElementById("indice");
const formulario = document.getElementById("formulario");
const btnGuardar = document.getElementById("btn-guardar");

let veterinarios = [
  {
    nombre: "Edel",
    apellido: "Zapata",
    pais: "Nicaragua",
    identificacion: "1234567890"
  },
  {
    nombre: "Cesar",
    apellido: "Tapia",
    pais: "Nicaragua",
    identificacion: "0987654321"
  }
];

function listarVeterinarios() {
  const htmlVeterinarios = veterinarios
    .map(
      (veterinario, index) => `<tr>
    <th scope="row">${index}</th>
    <td>${veterinario.nombre}</td>
    <td>${veterinario.apellido}</td>
    <td>${veterinario.pais}</td>
    <td>${veterinario.identificacion}</td>
    <td>
      <div class="" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-outline-warning editar" data-bs-toggle="modal"
        data-bs-target="#exampleModal">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="btn btn-outline-danger eliminar">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </td>
  </tr>`
    )
    .join("");
  listaVeterinarios.innerHTML = htmlVeterinarios;

  Array.from(document.getElementsByClassName("editar")).forEach(
    (botonEditar, index) => (botonEditar.onclick = editarVeterinario(index))
  );

  Array.from(document.getElementsByClassName("eliminar")).forEach(
    (botonEliminar, index) => (botonEliminar.onclick = eliminarVeterinario(index))
  );
}

function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
    nombre: nombre.value,
    apellido: apellido.value,
    pais: pais.value,
    identificacion: identificacion.value
  };
  const accion = btnGuardar.innerHTML;

  switch (accion) {
    case "Editar":
      // Editar
      veterinarios[indice.value] = datos;
      break;

    default:
      // Crear
      veterinarios.push(datos);

      break;
  }
  listarVeterinarios();
  resetModal();
}

function editarVeterinario(index) {
  return function cuandoClickeo() {
    btnGuardar.innerHTML = "Editar";
    // $("#exampleModal").modal("toogle");
    const veterinario = veterinarios[index];
    nombre.value = veterinario.nombre;
    apellido.value = veterinario.apellido;
    pais.value = veterinario.pais;
    identificacion.value = veterinario.identificacion;
    indice.value = index;
  };
}

function resetModal() {
  nombre.value = "";
  apellido.value = "";
  pais.value = "País:";
  identificacion.value = "";
  indice.value = "";
  btnGuardar.innerHTML = "Guardar";
}

function eliminarVeterinario(index) {
  return function clickEliminar() {
   // console.log('indice', index);
    veterinarios = veterinarios.filter((veterinario, indiceVeterinario)=>indiceVeterinario !== index);
    listarVeterinarios();
  }
}

listarVeterinarios();

formulario.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
