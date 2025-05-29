const myAPIKey = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTQ0YWQ2MmQ2NTZkY2Q3YjRkM2U2ZmZhYjE5MWRiNCIsIm5iZiI6MTc0ODIwMjIwMy45MTUsInN1YiI6IjY4MzM3MmRiYWIzNzcyN2ExNjJiNzFjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9XeM-ZOVzNNuggdysdtNInc7duRx1KzF3BFLKRzYrkQ";

const myHeaders = {
    "Authorization": myAPIKey, //envio la clave de autorización
    "Content-Type": "application/json", //declaro el tipo de contenido
    "Accept": "application/json" //declaro el tipo de contenido que acepto en la respuesta
}

const moviesURL = new URL("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc");

const myRequestParams = {
  method: "GET",
  headers: myHeaders
};

const myRequestMovies = new Request(moviesURL, myRequestParams);
const myDataMovies = fetch(myRequestMovies);

fetch(myRequestMovies)
  .then(response => response.json())
  .then(data => {
  
    const movies = data.results;
    console.log(movies);
    const container = document.getElementById("movies-container");
    container.classList.add("w90","df", "wrap", "centerX", "centerY", "spaceb")

    movies.forEach(movie => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("w24", "movieDiv", "df", "centerY" , "columna")
      movieDiv.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.title}" class="movie-image">
        <h3 class="poppins">${movie.title}</h3>
      `;
      container.appendChild(movieDiv);
    });
  })
  .catch(error => {
    console.error("Ocurrió un error:", error);
  });


const seriesURL = new URL("https://api.themoviedb.org/3/discover/tv?include_adult=false&language=es-ES&page=1&sort_by=popularity.desc");

const myRequestSeries = new Request(seriesURL, myRequestParams);
const myDataSeries = fetch(myRequestSeries);

fetch(myRequestSeries)
  .then(response => response.json())
  .then(data => {
    const series = data.results;
    const seriesContainer = document.getElementById("series-container");
    seriesContainer.classList.add("w90", "df", "wrap", "centerX", "centerY", "spaceb");

    series.forEach(serie => {
      const serieDiv = document.createElement("div");
      serieDiv.classList.add("w24", "movieDiv", "df", "centerY", "columna");
      serieDiv.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${serie.backdrop_path}" alt="${serie.name}" class="movie-image">
        <h3 class="poppins">${serie.name}</h3>
      `;
      seriesContainer.appendChild(serieDiv);
    });
  })
  .catch(error => {
    console.error("Ocurrió un error:", error);
  });