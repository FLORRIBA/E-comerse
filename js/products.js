const productsArray = JSON.parse(localStorage.getItem("product"));

// Obtener el body de la tabla
const tableBody = document.getElementById("table-body");
const searchInput = document.querySelector("#search");
const productForm = document.querySelector("form#user-form");
const submitBtn = productForm.querySelector("button[type=submit].btn-form");

// Escuchamos el evento submit en el formulario
productForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const el = evt.target.elements;

  // # Operador ternario
  //          condicion       true        false
  const id = el.id.value ? el.id.value : new Date().getTime();

  //-----objeto product----------------------
  const product = {
    producto: el.producto.value,
    precio: el.precio.valueAsNumber, //Obtengo el valor numérico
    descripcion: el.descripcion.value,
    active: el.active.checked,
    fecha: new Date(el.fecha.value +'T00:00:00-03:00').getTime(),
    id: id,
    image: el.image.value,
  };

  // Tenemos 2 posibles acciones a realizar
  //  a- Al estar editando debería reemplazar el producto a editar con sus información actualizada
  //  b- Agregue un producto nuevo

  // Pregunto si tengo id para saber si estoy editando o no
  if (el.id.value) {

// --------Editando producto------------------------
    const indice = productsArray.findIndex((producto) => {
      if (producto.id === el.id.value) {
        return true;
      }
    });
  //reemplazo el producto con los datos nuevos del formulario
    productsArray[indice] = product;

    Swal.fire({
      title: "Producto Editado",
      icon: "success",
      timer: 3000,
    });

    //al modificar el array necesito refrescar la vista
  } else {

//---------Agregando un producto nuevo--------------------
    productsArray.push(product);
    Swal.fire({
      title: "Producto Agregado",
      icon: "success",
      timer: 3000,
    });
  }
  pintarProductos(productsArray);
  // -Actualizo el localStorage
  actualizarLocalStorage();

  resetearFormulario();
});

//---------Resetear Formulario-------------------
function resetearFormulario() {
  productForm.reset(); //Reseteo el formulario
  submitBtn.classList.remove("btn-edit"); //Remuevo la clase editar
  submitBtn.innerText = "Agregar producto"; //Vuelvo el texto del botón a su valor por defecto
  productForm.elements.producto.focus();
}

//--------Filtro de productos (search)---------------------

//Escuchar cuando el usuario presiona una tecla en el input search
searchInput.addEventListener("keyup", (eventito) => {
  // Obtener el valor del input y lo pasamos a minúsculas
  const inputValue = eventito.target.value.toLowerCase();
  // Buscar en todos los productos aquellos donde su nombre tengan este texto
  const productosFiltrados = productsArray.filter((prod) => {

    const nombre = prod.producto.toLowerCase();

    if (nombre.includes(inputValue)) {
      return true;
    }
    return false;
  });

  // Pintar solo los usuario que hayan coincidido.
  pintarProductos(productosFiltrados);
});

//Llamo por primera vez que se ejecuta mi script la función pintar usuarios
pintarProductos(productsArray);

//--------Pintar Poductos----------------------------
function pintarProductos(arrayPintar) {
  // Iterar el array y agregar un tr por cada producto que tengamos.

  // let tableBody = document.getElementById('userTable')
  tableBody.innerHTML = "";

  arrayPintar.forEach((product, indiceActual) => {
    tableBody.innerHTML += `
        <tr class="table-row">
            <td class="user-image">
                <img src="${product.image}">
            </td>
            <td class="user-producto">${product.producto}</td>
            <td class="user-descripcion">${product.descripcion}</td>
            <td class="user-precio">${product.precio}</td>
        
            <td class="user-fecha">${formatDate(product.fecha)}</td>

            <td>      
              <button class="action-btn btn-danger" 
                      title="Borrar producto" 
                      onclick="borrarProducto(  '${product.id}', '${
      product.producto
    }'  )" >
                      <i class="fa-solid fa-trash-can"></i>
              </button>

              <button class="action-btn" 
                      title="Editar Producto"
                      onclick="editarProducto( '${product.id}')">
                      <i class="fa-solid fa-pen-to-square"></i>
              </button>

            </td>
        </tr>`;
  });
}


function actualizarLocalStorage() {
  localStorage.setItem("product", JSON.stringify(productsArray));
}

//---------Borrar Productos----------------------------------------------------
function borrarProducto(ID, producto) {
  const confirmDelete = confirm(
    `Realmente desea borrar este producto ${producto}`
  );

  if (confirmDelete) {
    const indice = productsArray.findIndex((product) => product.id === ID);

    productsArray.splice(indice, 1);
    pintarProductos(productsArray);

    actualizarLocalStorage();
  }
}

// ------- Editar Producto -----------------------
function editarProducto(idBuscar) {
  // Buscar un producto con id y obtenerlo
  const productEdit = productsArray.find((producto) => {
    //deberia devolver un true, según la condición id que me enviaron === al del producto que estoy iterando
    if (producto.id === idBuscar) {
      return true;
     
    }
  });
console.log(productEdit)
  //Indicar que el producto no fue encontrado
  if (!productEdit) {
    Swal.fire("Error al editar", "No se pudo editar el producto", "error");
    return
  }
  // console.log(productEdit)
  // Rellenar el formulario con los datos del producto a editar

  const el = productForm.elements;
  el.id.value = productEdit.id;
  el.precio.value = productEdit.precio;
  el.producto.value = productEdit.producto;
  el.image.value = productEdit.image;
  el.descripcion.value = productEdit.descripcion;
  el.active.checked = productEdit.active;
  el.fecha.value = formatInputDate(productEdit.fecha);

  // -Cambiar el nombre del botón a editar usuario

  submitBtn.classList.add("btn-edit");
  submitBtn.innerText = "Editar producto";
  
}
