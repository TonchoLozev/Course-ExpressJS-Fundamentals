function validateMovie(movie) {
    return movie.movieTitle.length === 0 || movie.movieTitle === null || movie.moviePoster.length === 0 || movie.moviePoster === null;
}

module.exports = validateMovie;