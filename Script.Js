const IMG_BASE_URL = `https://image.tmdb.org/t/p/w500/`;
const today = new Date().toISOString().split("T")[0];
function displaymovies(movies, rowid, isapi = false) {
  const row = document.getElementById(rowid);
  row.innerHTML = "";
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const posterPath = isapi
      ? movie.poster_path
        ? IMG_BASE_URL + movie.poster_path
        : null
      : `./src/posters/${movie.poster}`;
    if (!posterPath) return;
    card.style.backgroundImage = `url(${posterPath})`;
    card.title = movie.title;
    console.log(`Successfully displayed ${rowid}`);
    card.addEventListener("click", () => {
      window.location.href = `./MovieDisplay/MovieDisplay.html?movie=${movie.id}`;
    });
    row.appendChild(card);
  });
}
async function loadFromJson(jsonFile, rowid, categoryKey) {
  try {
    const res = await fetch(jsonFile);
    const data = await res.json();
    displaymovies(data[categoryKey], rowid);
  } catch (err) {
    console.error("Error loading json:", err);
  }
}

async function loadFromApi(
  endpoint,
  rowid,
  language = null,
  sort_by = null,
  genre = null,
  numberofmovies = 20
) {
  const API_KEY = "5e138867bc66fb7e6370cb732ab4f829";
  let tmdbURL = `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}`;
  if (language) tmdbURL += `&with_original_language=${language}`;
  if (sort_by) tmdbURL += `&sort_by=${sort_by}`;
  tmdbURL += `&primary_release_date.lte=${today}&with_watch_providers=8&watch_region=IN`;
  if (genre) tmdbURL += `&with_genres=${genre}`;
  let url = `https://corsproxy.io/raw?url=${encodeURIComponent(tmdbURL)}`;
  try {
    const number = numberofmovies;
    const res = await fetch(url);
    const data = await res.json();
    const movies = data.results.slice(0, number);
    console.log(`Successfully fetched ${rowid} data`);
    displaymovies(movies, rowid, true);
  } catch (err) {
    console.error("Error loading API data:", err);
  }
  const row=document.getElementById(rowid);
  const container=row.closest(".moviescontainer");
  const viewMore = container.querySelector(".viewAllButton");
  let newurl = `./SeeMore/SeeMore.html`;
  newurl += `?endpoint=${encodeURIComponent(endpoint)}`;
  if (language) newurl += `&language=${language}`;
  if (sort_by) newurl += `&sort_by=${sort_by}`;
  if (genre) newurl += `&genre=${genre}`;
  viewMore.href = newurl;
}

document.querySelectorAll(".moviescontainer").forEach((container) => {
  const row = container.querySelector(".row");
  const leftbutton = row.parentElement.querySelector(".scrollbutton.left");
  const rightbutton = row.parentElement.querySelector(".scrollbutton.right");
  leftbutton.addEventListener("click", () => {
    row.scrollBy({ left: -300, behavior: "smooth" });
  });
  rightbutton.addEventListener("click", () => {
    row.scrollBy({ left: 300, behavior: "smooth" });
  });
});
function banner(movie_id) {
  const banner = document.querySelector(".banner");
  banner.addEventListener("click", () => {
    window.location.href = `./MovieDisplay/MovieDisplay.html?movie=${movie_id}`;
  });
}
loadFromJson("MyMovies.json", "top_picks", "Netflix's choice");
loadFromApi("/trending/movie/week", "trending", null, null, null, 10);
loadFromApi(
  "/discover/movie",
  "new_telugu_movies",
  "te",
  "release_date.desc",
  null,
  15
);
loadFromApi(
  "/discover/movie",
  "popular_telugu_movies",
  "te",
  "popularity.desc"
);
loadFromApi("/discover/tv", "popular_shows", null, "popularity.desc", null);
loadFromApi("/discover/movie", "telugu_action", "te", "rating.desc", 28, 15);
loadFromApi("/discover/movie", "horror", null, "popularity.desc", 27, 15);
loadFromApi("/discover/movie", "telugu_comedy", "te", "popularity.desc", 35, 8);
loadFromApi("/discover/movie", "sci_fi", null, "popularity.desc", 878, 18);
loadFromApi("/discover/movie", "telugu_thriller", "te", "rating.desc", 53, 20);
loadFromApi("/discover/movie", "animation", null, "popularity.desc", 16, 10);
loadFromApi(
  "/discover/movie",
  "telugu_old",
  "te",
  "release_date.asc",
  null,
  20
);
banner("770906");
