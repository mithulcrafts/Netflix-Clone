const API_KEY = "5e138867bc66fb7e6370cb732ab4f829";
const today = new Date().toISOString().split("T")[0];
const IMG_BASE_URL = `https://image.tmdb.org/t/p/w500/`;
const params = new URLSearchParams(window.location.search);
const endpoint = decodeURIComponent(params.get("endpoint"));
const language = params.get("language");
const sort_by = params.get("sort_by");
const genre = params.get("genre");
let tmdbURL = `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}`;
if (language) tmdbURL += `&with_original_language=${language}`;
if (sort_by) tmdbURL += `&sort_by=${sort_by}`;
tmdbURL += `&primary_release_date.lte=${today}&with_watch_providers=8&watch_region=IN`;
if (genre) tmdbURL += `&with_genres=${genre}`;
function displaymovies(movies) {
  const row = document.querySelector(".display");
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const posterPath = movie.poster_path
      ? IMG_BASE_URL + movie.poster_path
      : null;
    if (!posterPath) return;
    card.style.backgroundImage = `url(${posterPath})`;
    card.title = movie.title;
    card.addEventListener("click", () => {
      window.location.href = `../MovieDisplay/MovieDisplay.html?movie=${movie.id}`;
    });
    row.appendChild(card);
  });
}
let currentpage=1;
let hasPages=true;
async function loadMovies() 
{
  if(!hasPages)return;
  URLwithPage=tmdbURL+`&page=${currentpage}`;
  try {
    const res = await fetch(URLwithPage);
    const data = await res.json();
    console.log("Successfully fetched data");
    displaymovies(data.results);
    if(currentpage>=data.total_pages)hasPages=false;
    currentpage++;
    loadMovies();
  } catch (err) {
    console.error("Error loading API data:", err);
  }
}
loadMovies();