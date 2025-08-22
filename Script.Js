const IMG_BASE_URL=`https://image.tmdb.org/t/p/w500/`;
const today = new Date().toISOString().split("T")[0];
function displaymovies(movies,rowid,isapi=false)
{
    const row=document.getElementById(rowid);
    row.innerHTML="";
    movies.forEach(movie=>{
        const card=document.createElement("div");
        card.classList.add("card");
        const posterPath = isapi? IMG_BASE_URL + movie.poster_path : `./src/posters/${movie.poster}`;
        card.style.backgroundImage=`url(${posterPath})`;
        card.title=movie.title;
        row.appendChild(card);
    })
}
async function loadFromJson(jsonFile,rowid,categoryKey)
{
    try{
        const res=await fetch(jsonFile);
        const data=await res.json();
        displaymovies(data[categoryKey],rowid);
    }
    catch(err)
    {
        console.error("Error loading json:",err);
    }
}

async function loadFromApi(endpoint,rowid,language,sort_by)
{
    const API_KEY="5e138867bc66fb7e6370cb732ab4f829";
    const url = `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&with_original_language=${language}&sort_by=${sort_by}&primary_release_date.lte=${today}&with_watch_providers=8&watch_region=IN`;
    try{
        const res=await fetch(url);
        const data=await res.json();
        const movies=data.results.slice(0,6);
        displaymovies(movies,rowid,true);
    }
    catch(err){
        console.error("Error loading API data:",err);
    }
}
loadFromJson("MyMovies.json","top_picks","Netflix's choice");
loadFromApi("/discover/movie","new_telugu_movies","te","release_date.desc");