const productsArray = JSON.parse(localStorage.getItem("product"));

// -Obtener el body de la tabla
const tableBody = document.getElementById("table-body");
const searchInput = document.querySelector("#search");
const productForm = document.querySelector("form#user-form");
const submitBtn = productForm.querySelector("button[type=submit].btn-form");

// Escuchamos el evento submit en el formulario
productForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const el = evt.target.elements;

  // # Operador ternario
  const id = el.id.value ? el.id.value : new Date().getTime();

  const product = {
    producto: el.producto.value,
    precio: el.precio.valueAsNumber, 
    descripcion: el.descripcion.value,
    active: el.active.checked,
    fecha: new Date(el.fecha.value + "T00:00:00-03:00").getTime(),
    id: id,
    image: el.image.value,
  };

  // Tenemos 2 posibles acciones a realizar
  //  a- Al estar editando debería reemplazar el producto a editar con sus información actualizada
  //  b- Agregue un producto nuevo

  // Pregunto si tengo id para saber si estoy editando o no
  if (el.id.value) {
    // -Editando
    const indice = productsArray.findIndex((producto) => {
      if (producto.id === el.id.value) {
        return true;
      }
    });

    productsArray[indice] = product;
    Swal.fire({
      title: "Producto Editado",
      icon: "success",
      timer: 3000,
    });
  } else {
    //-Agregando un producto nuevo
    productsArray.push(product);
    Swal.fire({
      title: "Producto Agregado",
      icon: "success",
      timer: 3000,
    });
  }
  pintarProductos(productsArray);

  actualizarLocalStorage();

  resetearFormulario();
});

//-Resetear Formulario
function resetearFormulario() {
  productForm.reset();
  submitBtn.classList.remove("btn-edit");
  submitBtn.innerText = "Agregar producto";
  productForm.elements.producto.focus();
}

//-Filtro de productos (search)
//Escuchar cuando el usuario presiona una tecla en el input search
searchInput.addEventListener("keyup", (eventito) => {
  const inputValue = eventito.target.value.toLowerCase();

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
debugger;
//Llamo por primera vez que se ejecuta mi script la función pintar usuarios
pintarProductos(productsArray);

function pintarProductos(arrayPintar) {
  // Iterar el array y agregar un tr por cada producto que tengamos.

  tableBody.innerHTML = "";

  arrayPintar.forEach((product, indiceActual) => {
    tableBody.innerHTML += `
        <tr class="table-row">
            <td class="user-image">
                <img src="${product.image}">
            </td>
            <td class="user-producto"> <strong> ${
              product.producto
            } </strong></td>
            <td class="user-descripcion">${product.descripcion}</td>
            <td class="user-precio">$ ${product.precio}</td>
        
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

//-LocalStorage
function actualizarLocalStorage() {
  localStorage.setItem("product", JSON.stringify(productsArray));
}

//-Borrar Productos
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

//-Editar Producto

function editarProducto(idBuscar) {
  const productEdit = productsArray.find((producto) => {
    if (producto.id === idBuscar) {
      return true;
    }
    console.log(typeof producto.id); //number
    console.log(typeof idBuscar); //string
  });

  if (!productEdit) {
    Swal.fire("Error al editar", "No se pudo editar el producto", "error");
    return;
  }

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
