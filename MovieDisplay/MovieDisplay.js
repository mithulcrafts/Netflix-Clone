const API_KEY="5e138867bc66fb7e6370cb732ab4f829";
const params=new URLSearchParams(window.location.search);
const movieid=params.get("movie");
display(movieid);
async function display(movieid) {
    let tmdbURL = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${API_KEY}`;
    const res=await fetch(tmdbURL);
    const data=await res.json();  
    document.querySelector("h2").innerText=data.title;
}