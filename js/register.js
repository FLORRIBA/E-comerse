const usersArray = JSON.parse(localStorage.getItem("users"));

// Obtener el body de la tabla
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
  //          condicion       true        false
  const id = el.id.value ? el.id.value : new Date().getTime();

  const user = {
    fullname: el.fullname.value,
    age: el.age.valueAsNumber, //Obtengo el valor numérico
    email: el.email.value,
    password: el.password.value,
    active: el.active.checked,
    bornDate: new Date(el.bornDate.value +'T00:00:00-03:00').getTime(),
    location: el.location.value,
    id: id,
    image: el.image.value,
    // role: "CLIENT_ROLE",
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
    //reemplazo el usuario con los datos nuevos del formulario
    usersArray[indice] = user;
    Swal.fire({
      title: "Usuario Editado",
      icon: "success",
      timer: 3000,
    });
  
    //al modificar el array necesito refrescar la vista
  } else {
    //Agregando un usuario nuevo
    usersArray.push(user);
    Swal.fire({
      title: "Usuario Agregado",
      icon: "success",
      timer: 3000,
    });
  }

  // -Actualizo el localStorage
  actualizarLocalStorage(usersArray);

  resetearFormulario();
});

function resetearFormulario() {
  userForm.reset(); //Reseteo el formulario
  userForm.elements.password.disabled = false; //Activo si estaban desactivados los input password
  userForm.elements.password2.disabled = false;
  submitBtn.classList.remove("btn-edit"); //Remuevo la clase editar
  submitBtn.innerText = "Agregar usuario"; //Vuelvo el texto del botón a su valor por defecto
  userForm.elements.fullname.focus();
}

function actualizarLocalStorage() {
    localStorage.setItem("users", JSON.stringify(usersArray));
  }
  