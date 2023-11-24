const users = JSON.parse(localStorage.getItem("users")) || []; //sino encontras nada por lo menos generame un array vacio---users=array vacio
console.log(users);
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (evt) => {
  evt.preventDefault(); //prevenir el comportamiento por defecto sino se recarga la pg!

  const email = evt.target.elements.email.value; //     = const email = loginForm.elements.email
  const password = evt.target.elements.password.value; // = const password= loginForm.elements.password
  const user = users.find((usr) => {
    //find recorre 1 x 1 los usuarios
    console.log(usr.email);

    //el email ingresado coincide con el usuario que estoy recorriendo ?
    if (usr.email.toLowerCase() === email.toLowerCase()) {
      return true;
    }

    // return usr.email===email
  });

  // return false
  //--cortamos el submit ya que no existe el correo y el password es distinto.
  if (!user || user.password !== password) {
    Swal.fire({
      title: "Login Incorrecto",
      text: "Datos ingresados incorrectos",
      icon: "ERROR",
      timer: 3000,
    });
    return;
  }

  // delete user.password (propiedad orientada a objetos) =>no se guarda la prop.password = user.password=undefined
  user.password = undefined;

  localStorage.setItem("currentUser", JSON.stringify(user)); //voy a guardar con key-currentUser el usuario que encontre, el user es un objeto (necesitamos setearlo Json)

  Swal.fire({
    title: "Login Correcto",
    text: "Sera redireccionado en un momento", // lo redireccionamos al home una vez que se loguea correctamente
    icon: "SUCCES",
    timer: 2000,
  });
  setTimeout(function () {
    //setTimeout recibia una funcion (ejecuta)en 1500ml segundos
    window.location.href = "../../index.html"; //cambiamos la localizacion de su posiscion
  }, 1500);
});
