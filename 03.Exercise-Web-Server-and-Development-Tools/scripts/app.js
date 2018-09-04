function appendMovies(db) {
    const moviesHtml = $('#movies');
    for (let movie of db) {
        moviesHtml.append(`<div class="movie"><img class="moviePoster" src="${decodeURIComponent(movie.moviePoster)}"></div>`)
    }
}

function appendAddMovieMessage(isValid) {
    const message = $('#message');

    if (isValid) {
        message.append('<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>')
    } else {
        message.append('<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>')
    }
}