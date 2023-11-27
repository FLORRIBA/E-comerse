const usersArray = JSON.parse(localStorage.getItem("users"));

//-Obtener el body de la tabla
const tableBody = document.getElementById("table-body");
const searchInput = document.querySelector("#search");
const userForm = document.querySelector("form#user-form");
const submitBtn = userForm.querySelector("button[type=submit].btn-form");

// Escuchamos el evento submit en el formulario
userForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const el = evt.target.elements;

  //Debería cortar la ejecución de la función callback del evento submit
  // !Password y password2 sean distintos
  if (el.password.value !== el.password2.value) {
    alert(`Las contraseñas no coiciden`);
    return;
  }

  // !Email ya existe
  const emailExist = usersArray.find((user) => {
    if (user.email === el.email.value) {
      return true;
    }
  });

  if (emailExist && el.id.value !== emailExist.id) {
    Swal.fire({
      title: "El correo ya existe",
      icon: "error",
    });
    return;
  }

  // # Operador ternario
  const id = el.id.value ? el.id.value : new Date().getTime();

  const user = {
    fullname: el.fullname.value,
    age: el.age.valueAsNumber,
    email: el.email.value,
    password: el.password.value,
    active: el.active.checked,
    bornDate: new Date(el.bornDate.value + "T00:00:00-03:00").getTime(),
    location: el.location.value,
    id: id,
    image: el.image.value,
  };

  // Tenemos 2 posibles acciones a realizar
  //  a- Al estar editando debería reemplazar el usuario a editar con sus información actualizada
  //  b- Agregue un usuario nuevo

  // Pregunto si tengo id para saber si estoy editando o no
  if (el.id.value) {
    // -Editando
    const indice = usersArray.findIndex((usuario) => {
      if (usuario.id === el.id.value) {
        return true;
      }
    });
    usersArray[indice] = user;
    Swal.fire({
      title: "Usuario Editado",
      icon: "success",
      timer: 3000,
    });
  } else {
    //-Agregando un usuario nuevo
    usersArray.push(user);
    Swal.fire({
      title: "Usuario Agregado",
      icon: "success",
      timer: 3000,
    });
  }
  pintarUsuarios(usersArray);

  actualizarLocalStorage(usersArray);

  resetearFormulario();
});

//-Resetear Formulario
function resetearFormulario() {
  userForm.reset();
  userForm.elements.password.disabled = false;
  userForm.elements.password2.disabled = false;
  submitBtn.classList.remove("btn-edit");
  submitBtn.innerText = "Agregar usuario";
  userForm.elements.fullname.focus();
}

//-Filtro de usuarios (search)
//Escuchar cuando el usuario presiona una tecla en el input search
searchInput.addEventListener("keyup", (eventito) => {
  const inputValue = eventito.target.value.toLowerCase();

  const usuariosFiltrados = usersArray.filter((usuario) => {
    const nombre = usuario.fullname.toLowerCase();

    if (nombre.includes(inputValue)) {
      return true;
    }
    return false;
  });

  // Pintar solo los usuario que hayan coincido
  pintarUsuarios(usuariosFiltrados);
});
debugger;
//Llamo por primera vez que se ejecuta mi script la función pintar usuarios
pintarUsuarios(usersArray);

function pintarUsuarios(arrayPintar) {
  // Iterar el array y agregar un tr por cada user que tengamos.

  tableBody.innerHTML = "";

  arrayPintar.forEach((user, indiceActual) => {
    tableBody.innerHTML += `
        <tr class="table-row">
            <td class="user-image">
                <img src="${user.image}" alt="${user.fullname} avatar">
            </td>
            <td class="user-name">${user.fullname}</td>
            <td class="user-email">${user.email}</td>
            <td class="user-location">${user.location}</td>
            <td class="user-age">${user.age}</td>
            <td class="user-date">${formatDate(user.bornDate)}</td>

            <td>      
              <button class="action-btn btn-danger" 
                      title="Borrar usuario" 
                      onclick="borrarUsuario(  '${user.id}', '${
      user.fullname
    }'  )" >
                      <i class="fa-solid fa-trash-can"></i>
              </button>

              <button class="action-btn" 
                      title="Editar usuario"
                      onclick="editarUsuario( '${user.id}')">
                      <i class="fa-solid fa-pen-to-square"></i>
              </button>

            </td>
        </tr>`;
  });
}

//-LocalStorage
function actualizarLocalStorage() {
  localStorage.setItem("users", JSON.stringify(usersArray));
}

//-Borrar usuarios
function borrarUsuario(ID, nombre) {
  const confirmDelete = confirm(
    `Realmente desea borrar este usuario ${nombre}`
  );

  if (confirmDelete) {
    const indice = usersArray.findIndex((user) => user.id === ID);

    usersArray.splice(indice, 1);
    pintarUsuarios(usersArray);

    actualizarLocalStorage(usersArray);
  }
}

//-Editar Usuario
function editarUsuario(idBuscar) {
  const userEdit = usersArray.find((usuario) => {
    if (usuario.id === idBuscar) {
      return true;
    }
  });

  if (!userEdit) {
    Swal.fire("Error al editar", "No se pudo editar el usuario", "error");
    return;
  }

  const el = userForm.elements;

  el.id.value = userEdit.id;
  el.age.value = userEdit.age;
  el.fullname.value = userEdit.fullname;
  el.email.value = userEdit.email;
  el.image.value = userEdit.image;
  el.location.value = userEdit.location;
  el.active.checked = userEdit.active;
  el.password.value = userEdit.password;
  el.password.disabled = true;
  el.password2.value = userEdit.password;
  el.password2.disabled = true;
  el.bornDate.value = formatInputDate(userEdit.bornDate);

  // -Cambiar el nombre del botón a editar usuario

  submitBtn.classList.add("btn-edit");
  submitBtn.innerText = "Editar usuario";
}
