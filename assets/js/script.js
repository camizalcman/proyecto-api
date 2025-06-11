const myAPIKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTQ0YWQ2MmQ2NTZkY2Q3YjRkM2U2ZmZhYjE5MWRiNCIsIm5iZiI6MTc0ODIwMjIwMy45MTUsInN1YiI6IjY4MzM3MmRiYWIzNzcyN2ExNjJiNzFjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9XeM-ZOVzNNuggdysdtNInc7duRx1KzF3BFLKRzYrkQ";

//request pelis
const myHeaders = {
    "Authorization": "Bearer " + myAPIKey, //envio la clave de autorización
    "Content-Type": "application/json", //declaro el tipo de contenido
    "Accept": "application/json" //declaro el tipo de contenido que acepto en la respuesta
}

//armo la URL
const moviesURL = new URL("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc");

const myRequestParams = {
  method: "GET",
  headers: myHeaders
};

//hago la request
const myRequestMovies = new Request(moviesURL, myRequestParams);
const myDataMovies = fetch(myRequestMovies);

fetch(myRequestMovies)
    .then(response => {
        //manejo la respuesta
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
  .then(data => {
    //llamo a la funcion para mostrar las pelis y le pongo un tiempo de carga para mostrar el estado pendiente
    setTimeout(()=> {
      cargarDataPeli(data)
    }, 1000)
  })
  //manejo el error
  .catch(error => {
    console.error("Ocurrió un error:", error);
    loadingDiv.innerHTML=""
    mostrarError("error")
  });

//div en el que se mustra el estado pendiente, de carga
const loadingDiv = document.getElementById("loading");

function cargarDataPeli(data){
    const movies = data.results;
    console.log(movies);

    const container = document.getElementById("movies-container");
    container.classList.add("w90","df", "wrap", "centerX", "centerY", "spaceb");

    //le saco el contenido al div de carag
    loadingDiv.innerHTML=""

    movies.forEach(movie => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("w24", "movieDiv", "df", "centerY" , "columna", "w100m", "w30t", "articulos")
      movieDiv.innerHTML = `
        <div class="fotoContainer w100m">
          <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.title}" class="movie-image posRel">
        </div>
        <div class="df pt0-5 puntaje posAb">
            <i class='bx  bxs-star amarillo pr0-5'></i> 
            <p class="dm-sans">${movie.vote_average.toFixed(1)}</p>
        </div>
        <div class="divTexto w100">
          <h3 class="dm-sansBold">${movie.title}</h3>
          <p class="dm-sans pt0-5 fecha">Estreno: ${movie.release_date}</p>
        </div>
      `;

        //al hacer click, te lleva a la pag detalle, le paso el ID por URL y si es serie o película
        movieDiv.addEventListener("click", () => {
        window.location.href = `detalle.html?id=${movie.id}&tipo=pelicula`;
        });

      container.appendChild(movieDiv);
    });
}

//funcion para mostrar el error
function mostrarError(contenedor){
  const divError =document.getElementById(contenedor);
  divError.innerHTML = ` 
  <p class="dm-sans">Ocurrió un error</p>
   <img src="assets/imgs/advertencia.png" width="90px" class="pt1 pl2">
  `;
}

//request series
const seriesURL = new URL("https://api.themoviedb.org/3/discover/tv?include_adult=false&language=es-ES&page=1&sort_by=popularity.desc");

const myRequestSeries = new Request(seriesURL, myRequestParams);
const myDataSeries = fetch(myRequestSeries);

fetch(myRequestSeries)
    .then(response => {
        //manejo la respuesta
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
  .then(data => {
    //llamo a la funcion para mostrar las series y le pongo un tiempo de carga para mostrar el estado pendiente
    setTimeout(()=> {
      cargarDataSerie(data)
    }, 1000) 
  })
  .catch(error => {
    //manejo el error
    console.error("Ocurrió un error:", error);
    loadingDivS.innerHTML=""
    mostrarError("error1")
  });

const loadingDivS = document.getElementById("loadingS");

function cargarDataSerie(data){
  const series = data.results;
    console.log(series);

    const seriesContainer = document.getElementById("series-container");
    seriesContainer.classList.add("w90", "df", "wrap", "centerX", "centerY", "spaceb");

    loadingDivS.innerHTML=""

    series.forEach(serie => {
      const serieDiv = document.createElement("div");
      serieDiv.classList.add("w24", "movieDiv", "df", "centerY", "columna", "w100m", "w30t", "articulos");
      serieDiv.innerHTML = `
        <div class="fotoContainer w100m">
          <img src="https://image.tmdb.org/t/p/w500${serie.backdrop_path}" alt="${serie.name}" class="movie-image posRel>
        </div>
        <div class="df pt0-5 puntaje posAb">
            <i class='bx  bxs-star amarillo pr0-5'></i> 
            <p class="dm-sans">${serie.vote_average.toFixed(1)}</p>
        </div>
        <div class="divTexto w100">
          <h3 class="dm-sansBold">${serie.name}</h3>
          <p class="dm-sans pt0-5 fecha">Estreno: ${serie.first_air_date}
        </div>
      `;

       //al hacer click, te lleva a la pag detalle, le paso el ID por URL y si es serie o película
        serieDiv.addEventListener("click", () => {
        window.location.href = `detalle.html?id=${serie.id}&tipo=serie`;
        });
        
      seriesContainer.appendChild(serieDiv);
    });
}

//ANIMACIONES

//rotar el rollo para el estado pendiente
  const rotar = [
    { transform: "rotate(0deg)" },
    { transform: "rotate(360deg)" }
  ];

   const rotarTiming = {
    duration: 1000,
    easing: "linear",
  };

 function girarRollo() {
    const rollos = document.querySelectorAll(".rollo");

    rollos.forEach(rollo => {
      const animacionRollo = rollo.animate(rotar, rotarTiming);
    });
  }

  girarRollo()

  
 function escribirTexto(elemento, texto) {
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.textContent += texto[i];
    i++;
    if (i >= texto.length) clearInterval(intervalo);
  }, 80);
}

const parrafo = document.querySelector('#texto');
escribirTexto(parrafo, 'Nuevos estrenos');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show"); // entry.target para el elemento
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden"); // el selector de clase lleva punto
hiddenElements.forEach((el) => observer.observe(el));


