const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");
const indice = document.getElementById("indice");
const formulario = document.getElementById("formulario");
const btnGuardar = document.getElementById("btn-guardar");

let mascotas = [
  {
    tipo: "Perro",
    nombre: "Orion",
    dueno: "Edel",
  },
  {
    tipo: "Gato",
    nombre: "Miau",
    dueno: "Edel",
  },
];

function listarMascotas() {
  const htmlMascotas = mascotas
    .map(
      (mascota, index) => `<tr>
    <th scope="row">${index}</th>
    <td>${mascota.tipo}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.dueno}</td>
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
  listaMascotas.innerHTML = htmlMascotas;

  Array.from(document.getElementsByClassName("editar")).forEach(
    (botonEditar, index) => (botonEditar.onclick = editarMascotas(index))
  );

  Array.from(document.getElementsByClassName("eliminar")).forEach(
    (botonEliminar, index) => (botonEliminar.onclick = eliminarMascotas(index))
  );
}

function enviarDatos(evento) {
  evento.preventDefault();
  const datos = {
    tipo: tipo.value,
    nombre: nombre.value,
    dueno: dueno.value,
  };
  const accion = btnGuardar.innerHTML;

  switch (accion) {
    case "Editar":
      // Editar
      mascotas[indice.value] = datos;
      break;

    default:
      // Crear
      mascotas.push(datos);

      break;
  }
  listarMascotas();
  resetModal();
}

function editarMascotas(index) {
  return function cuandoClickeo() {
    btnGuardar.innerHTML = "Editar";
    // $("#exampleModal").modal("toogle");
    const mascota = mascotas[index];
    nombre.value = mascota.nombre;
    dueno.value = mascota.dueno;
    tipo.value = mascota.tipo;
    indice.value = index;
  };
}

function resetModal() {
  nombre.value = "";
  dueno.value = "";
  tipo.value = "Es un:";
  indice.value = "";
  btnGuardar.innerHTML = "Guardar";
}

function eliminarMascotas(index) {
  return function clickEliminar() {
   // console.log('indice', index);
    mascotas = mascotas.filter((mascota, indiceMascota)=>indiceMascota !== index);
    listarMascotas();
  }
}

listarMascotas();

formulario.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
