function appendMovies(db) {
    const moviesHtml = $('#movies');
    for (let movie of db) {
        moviesHtml.append(`<div class="movie"><img class="moviePoster" src="${decodeURIComponent(movie.moviePoster)}"></div>`)
    }
}