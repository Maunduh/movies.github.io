document.addEventListener("DOMContentLoaded", function () {
    const api_url =
        "https://api.themoviedb.org/3/discover/movie?api_key=8c428d12cd39a89cbf5c7d1347ece57d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    getMovies(api_url);
    function getMovies(url) {
        
        fetch(url)
            .then((res) => res.json())
            .then((results) => renderMovies(results.results))
            .catch((error)=>{
                console.log(error)
            });
    }
    function renderMovies(movies) {
        
        const img = "https://image.tmdb.org/t/p/w1280";
        main.innerHTML = "";
        movies.map((movie) => {
            const { poster_path, release_date, title, vote_average, overview } =
                movie;
            const movieDisplay = document.createElement("div");
            movieDisplay.classList.add("movie");
            movieDisplay.innerHTML = `<img src="${img + poster_path}" alt="${title}"/>
            <div class="movie_info">
                <h2>${title}</h2>
                <span class="vote_average">Rating: ${vote_average}</span>
                <span class="release_date">Release date: ${release_date}</span>
            </div>
            <div class="overview">
                <h2>Overview:</h2>
                ${overview}
            </div>
        `;
            main.appendChild(movieDisplay);
        });
    }
    
    let form= document.querySelector("#form"); 
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    
        const search = document.querySelector("#search");
        const searchItem = search.value;
        let search_api=
            "https://api.themoviedb.org/3/search/movie?api_key=8c428d12cd39a89cbf5c7d1347ece57d&language=en-US&include_adult=false&include_video=false&page=1&query="+searchItem;
       
        
        if (searchItem) {
            getMovies(search_api);
            search.value = "";
        }
   
    })
});
