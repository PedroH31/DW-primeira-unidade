let defaultMovieList = []
const movieSearchForm = document.getElementById("movie-search-form")

const movieData = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6100bddb3f750ab9ba35c21920848b03&sort_by=popularity`)
    const data = await res.json()

    defaultMovieList.push( ...data.results.slice(0, 10) )
    renderApp()
}

movieData()

const handleSearch = async (query) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=6100bddb3f750ab9ba35c21920848b03&query=${query}`
      )

      if (!res.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await res.json()
      defaultMovieList = [...data.results.slice(0, 10)]
      renderApp()
    }catch(error) {
      console.error("Error fetching data:", error)
    }
}

movieSearchForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const searchInput = document.querySelector("#search-input")
    const searchQuery = searchInput.value.trim()

    if (searchQuery) {
        handleSearch(searchQuery)
    }

    searchInput.value = ""
})

function renderMovieElements() {

    const movieListCards = defaultMovieList.map(movie => {
        const { title, release_date, vote_average:rating, overview:description, poster_path } = movie
        const poster = poster_path  
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "https://t3.ftcdn.net/jpg/03/01/83/28/360_F_301832885_XSg1F3ba571JjJ1RCrSnXs5VFvyopVMD.jpg"
    
        return `
            <div class="movie-card">
                <img src="${poster}" class="movie-poster-img" alt="movie poster"/>
                <div class="movie-description-container">
                    <h2 class="movie-title">${title}</h2>
                    <span>${release_date ? release_date : "Coming Soon"}</span>
                    <span>RATING: ${Math.round(rating).toFixed(1)}</span>
                    <p>${description}</p>
                </div>
            </div>
        `
    })

    return movieListCards
}


function renderApp() {
    document.getElementById("movie-list").innerHTML = renderMovieElements()
}


console.log(defaultMovieList)