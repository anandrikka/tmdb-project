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
        ],
        externalId: [
            {
                resource: 'find/:externalId',
                method: 'GET',
                name: 'findByExternalId'
            }
        ],
        discover: [
            {
                resource: 'discover/movie',
                method: 'GET',
                name: 'searchMovie'
            },
            {
                resource: 'discover/tv',
                method: 'GET',
                name: 'searchTv'
            }
        ],
        search: [
            {
                resource: 'search/company',
                method: 'GET',
                name: 'searchCompanies'
            },
            {
                resource: 'search/collection',
                method: 'GET',
                name: 'searchCollections'
            },
            {
                resource: 'search/keyword',
                method: 'GET',
                name: 'searchKeywords'
            },
            {
                resource: 'search/movie',
                method: 'GET',
                name: 'searchMovies'
            },
            {
                resource: 'search/multi',
                method: 'GET',
                name: 'searchMulti'
            },
            {
                resource: 'search/people',
                method: 'GET',
                name: 'searchPeople'
            },
            {
                resource: 'search/tv',
                method: 'GET',
                name: 'searchTv'
            }
        ],
        moviesDetailsId: [
            {
                resource: 'movie/:movieId',
                method: 'GET',
                name: 'getMovieDetailsById'
            },
            {
                resource: 'movie/:movieId/account_states',
                method: 'GET',
                name: 'getMovieAccountStatesById'
            },
            {
                resource: 'movie/:movieId/alternative_titles',
                method: 'GET',
                name: 'getMovieAlternativeTitlesById'
            },
            {
                resource: 'movie/:movieId/changes',
                method: 'GET',
                name: 'getMovieChangesById'
            },
            {
                resource: 'movie/:movieId/credits',
                method: 'GET',
                name: 'getMovieCreditsById'
            },
            {
                resource: 'movie/:movieId/images',
                method: 'GET',
                name: 'getMovieImagesById'
            },
            {
                resource: 'movie/:movieId/keywords',
                method: 'GET',
                name: 'getMovieKeywordsById'
            },
            {
                resource: 'movie/:movieId/release_dates',
                method: 'GET',
                name: 'getMovieReleaseDatesById'
            },
            {
                resource: 'movie/:movieId/videos',
                method: 'GET',
                name: 'getMovieVideosById'
            },
            {
                resource: 'movie/:movieId/translations',
                method: 'GET',
                name: 'getMovieTranslationsById'
            },
            {
                resource: 'movie/:movieId/recommendations',
                method: 'GET',
                name: 'getMovieRecommendationsById'
            },
            {
                resource: 'movie/:movieId/similar',
                method: 'GET',
                name: 'getSimilarMoviesById'
            },
            {
                resource: 'movie/:movieId/reviews',
                method: 'GET',
                name: 'getMovieReviewsById'
            },
            {
                resource: 'movie/:movieId/lists',
                method: 'GET',
                name: 'getMovieListofListsById'
            }
        ],
        movies: [
            {
                resource: 'movie/latest',
                method: 'GET',
                name: 'getLatestMovies'
            },
            {
                resource: 'movie/now_playing',
                method: 'GET',
                name: 'getMoviesNowPlaying'
            },
            {
                resource: 'movie/popular',
                method: 'GET',
                name: 'getPopularMovies'
            },
            {
                resource: 'movie/top_rated',
                method: 'GET',
                name: 'getTopRatedMovies'
            },
            {
                resource: 'movie/upcoming',
                method: 'GET',
                name: 'getUpcomingMovies'
            }
        ]
    }
}