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

loadFromJson("MyMovies.json","top_picks","Netflix's choice");