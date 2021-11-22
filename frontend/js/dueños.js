const listaDuenos = document.getElementById("lista-duenos");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const identificacion = document.getElementById("identificacion");
const pais = document.getElementById("pais");
const indice = document.getElementById("indice");
const formulario = document.getElementById("formulario");
const btnGuardar = document.getElementById("btn-guardar");

let duenos = [
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

function listarDuenos() {
  const htmlDuenos = duenos
    .map(
      (dueno, index) => `<tr>
    <th scope="row">${index}</th>
    <td>${dueno.nombre}</td>
    <td>${dueno.apellido}</td>
    <td>${dueno.pais}</td>
    <td>${dueno.identificacion}</td>
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
  listaDuenos.innerHTML = htmlDuenos;

  Array.from(document.getElementsByClassName("editar")).forEach(
    (botonEditar, index) => (botonEditar.onclick = editarDueno(index))
  );

  Array.from(document.getElementsByClassName("eliminar")).forEach(
    (botonEliminar, index) => (botonEliminar.onclick = eliminarDueno(index))
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
      duenos[indice.value] = datos;
      break;

    default:
      // Crear
      duenos.push(datos);

      break;
  }
  listarDuenos();
  resetModal();
}

function editarDueno(index) {
  return function cuandoClickeo() {
    btnGuardar.innerHTML = "Editar";
    // $("#exampleModal").modal("toogle");
    const dueno = duenos[index];
    nombre.value = dueno.nombre;
    apellido.value = dueno.apellido;
    pais.value = dueno.pais;
    identificacion.value = dueno.identificacion;
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

function eliminarDueno(index) {
  return function clickEliminar() {
   // console.log('indice', index);
    duenos = duenos.filter((dueno, indiceDueno)=>indiceDueno !== index);
    listarDuenos();
  }
}

listarDuenos();

formulario.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
