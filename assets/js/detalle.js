const myAPIKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTQ0YWQ2MmQ2NTZkY2Q3YjRkM2U2ZmZhYjE5MWRiNCIsIm5iZiI6MTc0ODIwMjIwMy45MTUsInN1YiI6IjY4MzM3MmRiYWIzNzcyN2ExNjJiNzFjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9XeM-ZOVzNNuggdysdtNInc7duRx1KzF3BFLKRzYrkQ";

const params = new URLSearchParams(window.location.search); //lee los parámetros de la URL
const id = params.get("id"); // obtiene el valor de id
console.log("ID:", id)

//armo la url con el id puntual de la película/serie
const detalleURL = `https://api.themoviedb.org/3/movie/${id}?language=es-ES`;
//postURL

const myHeaders = {
  "Authorization": "Bearer " + myAPIKey,
  "Content-Type": "application/json",
  "Accept": "application/json"
};

const myRequestParams = {
  method: "GET",
  headers: myHeaders
};

const myRequestDetalle = new Request(detalleURL, myRequestParams);

fetch(myRequestDetalle) 
  .then(response => response.json())
  //manejar este posible error http
  .then(data => {
    console.log("Detalle de película:", data);

    armarDetalle(data)
  })
  .catch(error => {
    console.error("Ocurrió un error:", error);
  });


  function armarDetalle(data){
    const container = document.getElementById("detalle-container");
    container.classList.add("w90","centerX", "centerY", "spaceb")

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("df", "spaceb")
    movieDiv.innerHTML = `
        <div class="w50 vh60">
          <img src="https://image.tmdb.org/t/p/w500${data.backdrop_path}" alt="${data.title}" class="detalle-image posRel">
        </div>
        <div class="df pt0-5 puntaje posAb">
            <i class='bx  bxs-star amarillo pr0-5'></i> 
            <p class="dm-sans">${data.vote_average.toFixed(1)}</p>
        </div>
        <div class="w48">
          <h3 class="dm-sansBold">${data.title}</h3>
          <p class="dm-sans pt0-5 fecha">${data.overview}</p>
          <p class="dm-sans pt0-5 fecha">Género: ${data.genres.map(genre => genre.name).join(', ')}</p>
          <p class="dm-sans pt0-5 fecha">Estreno: ${data.release_date}</p>
        </div>
      `;

      container.appendChild(movieDiv);
  }
    