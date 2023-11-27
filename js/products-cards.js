const productsArray = JSON.parse(localStorage.getItem("product"));
const cardSection = document.querySelector(".card-section");

function pintarProductos(arrayPintar) {

  cardSection.innerHTML = "";

  arrayPintar.forEach((product, indiceActual) => {
    cardSection.innerHTML += `
      
      <article class="card">
  
      <div class="imgBx">
  
          <img src="${product.image}"  alt="" class="card-img" loading="lazy">
      </div>
  
      <div class="card-container">
          <div class="card-info">
              <h2 class="card-info-title">${product.producto}</h2>
              <p class="card-info-text">${product.descripcion}</p>
          </div>
  
          <div class="card-values">
              <div class="card-date"> ${formatDate(product.fecha)}</div>
              <div class="card-price"> $ ${product.precio}</div>
          </div>
  
          <footer class="card-footer">
              <a class="card-button">Ver más</a>
              <button class="card-btn">Comprar</button>
          </footer>
  
      </div>
  </article>
  `;
  });
}

pintarProductos(productsArray);
