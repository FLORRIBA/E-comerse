const users = JSON.parse(localStorage.getItem("users")) || [];
console.log(users);
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const email = evt.target.elements.email.value;
  const password = evt.target.elements.password.value;
  const user = users.find((usr) => {
    console.log(usr.email);

    if (usr.email.toLowerCase() === email.toLowerCase()) {
      return true;
    }
  });

  if (!user || user.password !== password) {
    Swal.fire({
      title: "Login Incorrecto",
      text: "Datos ingresados incorrectos",
      icon: "ERROR",
      timer: 2000,
    });
    return;
  }

  user.password = undefined;

  localStorage.setItem("currentUser", JSON.stringify(user));

  Swal.fire({
    title: "Login Correcto",
    text: "Sera redireccionado en un momento",
    icon: "SUCCES",
    timer: 2000,
  });
  setTimeout(function () {
    window.location.href = "../../index.html";
  }, 1500);
});
