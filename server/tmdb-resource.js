module.exports = {
    baseUrl: 'https://api.themoviedb.org/3/',
    authentication: {
        requestToken: 'authentication/token/new',
        sessionId: 'authentication/session/new'
    },
    apis: {
        genre: [
            {
                resource: 'genre/movie/list',
                method: 'GET',
                name: 'getListOfGenreForMovies'
            },
            {
                resource: 'genre/tv/list',
                method: 'GET',
                name: 'getListOfGenreForTv'
            },
            {
                resource: 'genre/:genreId/movies',
                method: 'GET',
                name: 'getMoviesByGenreId'
            }
        ]
    }
}