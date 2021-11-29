const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");
const indice = document.getElementById("indice");
const formulario = document.getElementById("formulario");
const btnGuardar = document.getElementById("btn-guardar");
const url = "http://localhost:5000/mascotas";

let mascotas = [];

async function listarMascotas() {
  try {
    const respuesta = await fetch(url);
    const mascotasDelServer = await respuesta.json();

    if (Array.isArray(mascotasDelServer)) {
      mascotas = mascotasDelServer;
    }

    if (mascotas.length > 0) {
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
      return;
    }
    listaMascotas.innerHTML = `<tr>
    <td colspan = "5">No hay mascotas</td>    
  </tr>`;


  } catch (error) {
    throw error;
  }

}

async function enviarDatos(evento) {
  evento.preventDefault();

  try {
    const datos = {
      tipo: tipo.value,
      nombre: nombre.value,
      dueno: dueno.value,
    };
    let method = 'POST';
    let urlEnviar = url;
    const accion = btnGuardar.innerHTML;

    if (accion === "Editar") {
      // Editar
      method = 'PUT';
      mascotas[indice.value] = datos;
      urlEnviar = url + "/" + indice.value; // solo funciona concatenando asi de otra manera no
    }

    const respuesta = await fetch(urlEnviar, { method, headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(datos) })

    if (respuesta.ok) {
      listarMascotas();
      resetModal();
    }
  } catch (error) {
    throw error;
  }


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
  const urlEnviar = `${url}/${index}`;
  return async function clickEliminar() {
    try {
      // console.log('indice', index);
      const respuesta = await fetch(urlEnviar, { method: 'DELETE' })

      if (respuesta.ok) {
        listarMascotas();
        resetModal();
      }
    } catch (error) {
      throw error;
    }
  };
}

listarMascotas()

formulario.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
