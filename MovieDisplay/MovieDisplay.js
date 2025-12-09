const API_KEY="5e138867bc66fb7e6370cb732ab4f829";
const params=new URLSearchParams(window.location.search);
const movieid=params.get("movie");
display(movieid);
async function display(movieid) {
    let tmdbURL = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${API_KEY}`;
    const res=await fetch(tmdbURL);
    const data=await res.json();  
    document.querySelector(".banner")
      .style.setProperty("--banner-image",
        `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
      );
    document.querySelector(".poster").style.backgroundImage=`url(https://image.tmdb.org/t/p/original${data.poster_path})`;
    document.querySelector(".Tagline").innerText=data.tagline;
    if(!data.tagline)
    {
        document.querySelector(".banner").style.setProperty("--genres-top","18.5vh");
    }
    document.querySelector(".genres").innerText=data.genres.map(g=>g.name).join(", ");
    document.querySelector(".Title").innerText=data.title;
    document.querySelector(".Description").innerText=data.overview;
    document.title=data.title;
}