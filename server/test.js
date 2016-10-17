var TmdbApi = require('./tmdb-request')('a7109af86b1d09cb5ae4087d834988d7');

TmdbApi.getUpcomingMovies().then(function (result) {
    console.log(result.data)
}, function (error) {
    console.log('error', error);
})