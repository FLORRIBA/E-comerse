
/*Para que lo redireccione a HOME si SABEel la direccion...  */
const currentUser=JSON.parse(localStorage.getItem('currentUser'))

if(!currentUser  || currentUser.role !== 'ADMIN_ROLE'){ //si no tengo un usuario(null) || que tengo un usuario pero la propiedad role de mi currentUser no es el ADMIN ROLE
window.location.href='index.html'

}

