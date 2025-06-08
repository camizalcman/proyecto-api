const myAPIKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTQ0YWQ2MmQ2NTZkY2Q3YjRkM2U2ZmZhYjE5MWRiNCIsIm5iZiI6MTc0ODIwMjIwMy45MTUsInN1YiI6IjY4MzM3MmRiYWIzNzcyN2ExNjJiNzFjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9XeM-ZOVzNNuggdysdtNInc7duRx1KzF3BFLKRzYrkQ";

const params = new URLSearchParams(window.location.search); //lee los parámetros de la URL
const id = params.get("id"); // obtiene el valor de id
const tipo = params.get("tipo"); // "pelicula" o "serie"

console.log("ID:", id);
console.log("Tipo:", tipo);


//verifico si es película o serie y armo la URL con su ID correspondiente
let postURL;

if (tipo === "pelicula") {
  postURL = `https://api.themoviedb.org/3/movie/${id}?language=es-ES`;
} else if (tipo === "serie") {
  postURL = `https://api.themoviedb.org/3/tv/${id}?language=es-ES`;
}

const myHeaders = {
  "Authorization": "Bearer " + myAPIKey,
  "Content-Type": "application/json",
  "Accept": "application/json"
};

const myRequestParams = {
  method: "GET",
  headers: myHeaders
};

const myRequestDetalle = new Request(postURL, myRequestParams);
const loadingDiv = document.getElementById("loading");

fetch(myRequestDetalle) 
  .then(response => response.json())
  //manejar este posible error http
  .then(data => {
    console.log("Detalle de película:", data);

    setTimeout(()=> {
      armarDetalle(data, tipo)
    }, 200) 
  })
  .catch(error => {
    loadingDiv.innerHTML=""
    console.error("Ocurrió un error:", error);
    mostrarError("error")
  });


  function armarDetalle(data, tipo){
    const container = document.getElementById("detalle-container");
    container.classList.add("w90","centerX", "centerY", "spaceb")

    loadingDiv.innerHTML=""

    //en la API llaman de manera distinta al título y la fecha de estreno en pelis que en series, por eso hago esta diferenciación. El resto de los datos se llaman igual
    let titulo = "";
    let fecha = "";

    if (tipo === "pelicula") {
      titulo = data.title;
      fecha = data.release_date;
    } else if (tipo === "serie") {
      titulo = data.name;
      fecha = data.first_air_date;
    }

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("df", "spaceb")
    movieDiv.innerHTML = `
        <div class="w50 vh60">
          <img src="https://image.tmdb.org/t/p/w500${data.backdrop_path}" alt="${titulo}" class="detalle-image posRel">
        </div>
        <div class="df pt0-5 puntaje posAb">
            <i class='bx  bxs-star amarillo pr0-5'></i> 
            <p class="dm-sans">${data.vote_average.toFixed(1)}</p>
        </div>
        <div class="w48 pt0-5">
          <h3 class="dm-sansBold tituloDetalle">${titulo}</h3>
          <p class="dm-sans pt0-5 fecha mt1">${data.overview}</p>
          <p class="dm-sans pt0-5 fecha mt1">Género: ${data.genres.map(genre => genre.name).join(', ')}</p>
          <p class="dm-sans pt0-5 fecha mt1">Estreno: ${fecha}</p>
        </div>
      `;

      container.appendChild(movieDiv);
  }

const botonVotar = document.getElementById("votar");
botonVotar.addEventListener("click", modalVoto);
let valorSeleccionado;

function modalVoto(){
    const modal = document.getElementById("miModal");
    modal.classList.add("modalEstilo")

    modal.innerHTML = "";

    //Crear contenedor
    const contenedor = document.createElement("div");
    contenedor.style.position = "relative";
    contenedor.style.padding = "20px";

    contenedor.innerHTML=`
    <div class="w90 pt0-5">
          <h3 class="dm-sansBold tituloDetalle">Agregá tu valoración</h3>
          <p class="dm-sans pt0-5 fecha mt1">Elegí un puntaje del 1 al 10</p>
    </div>
    `;

    // Crear botón de cierre (la X)
    const botonCerrar = document.createElement("span");
    botonCerrar.innerHTML=`
    <i class='bx  bx-x'></i> 
    `;

    botonCerrar.style.position = "absolute";
    botonCerrar.style.top = "5px";
    botonCerrar.style.right = "10px";
    botonCerrar.style.cursor = "pointer";
    botonCerrar.style.fontSize = "26px";

    botonCerrar.addEventListener("click", () => {
      modal.close();
    });

  // Select del 1 al 10
  const select = document.createElement("select");
  select.style.width = "70%";
  select.style.padding = "10px";
  select.style.marginTop = "20px";
  select.style.marginRight = "20px";
  select.style.borderRadius = "6px"

  for (let i = 1; i <= 10; i++) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    select.appendChild(opcion);
  }

  // Botón enviar
  const botonEnviar = document.createElement("button");
  botonEnviar.textContent = "Enviar";
  botonEnviar.classList.add=("dm-sans")
  botonEnviar.style.marginTop = "20px";
  botonEnviar.style.padding = "10px 40px";
  botonEnviar.style.cursor = "pointer";
  botonEnviar.style.fontSize = "14px";
  botonEnviar.style.borderRadius = "6px";
  botonEnviar.style.backgroundColor = "#000213";
  botonEnviar.style.color = "white";
  botonEnviar.addEventListener("click", () => {
    valorSeleccionado = select.value;
    console.log("Valor seleccionado:", valorSeleccionado);
    modal.close();
  });

  // Agregar elementos al contenedor y mostrar
  contenedor.appendChild(botonCerrar);
  contenedor.appendChild(select);
  contenedor.appendChild(botonEnviar);
  modal.appendChild(contenedor);
  modal.showModal();
}
  
    
function mostrarError(contenedor){
  const divError =document.getElementById(contenedor);
  divError.innerHTML = ` 
  <p class="dm-sans">Ocurrió un error</p>
   <img src="assets/imgs/advertencia.png" width="90px" class="pt1 pl2">
  `;
}