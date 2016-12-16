module.exports = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apis: {
        authentication: [
            {
                resource: '/authentication/token/new',
                method: 'GET',
                name: 'requestToken'
            },
            {
                resource: '/authentication/token/validate_with_login',
                method: 'GET',
                name: 'validateRequestToken'
            },
            {
                resource: '/authentication/session/new',
                method: 'GET',
                name: 'createSession'
            }
        ],
        user: [
            {
                resource: '/account',
                method: 'GET',
                name: 'getAccountDetails'
            },
            {
                resource: '/account/:accountId/list',
                method: 'GET',
                name: 'getCreatedLists'
            },
            {
                resource: '/account/:accountId/favorite/movies',
                method: 'GET',
                name: 'getFavoriteMovies'
            },
            {
                resource: '/account/:accountId/favorite/tv',
                method: 'GET',
                name: 'getFavoriteTvShows'
            },
            {
                resource: '/account/:accountId/rated/movies',
                method: 'GET',
                name: 'getRatedMovies'
            },
            {
                resource: '/account/:accountId/rated/tv',
                method: 'GET',
                name: 'getRatedTvShows'
            },
            {
                resource: '/account/:accountId/rated/tv/episodes',
                method: 'GET',
                name: 'getRatedTvEpisodes'
            },
            {
                resource: '/account/:accountId/watchlist/movies',
                method: 'GET',
                name: 'getMoviesWatchlist'
            },
            {
                resource: '/account/:accountId/watchlist/tv',
                method: 'GET',
                name: 'getTvWatchlist'
            },
            {
                resource: '/account/:accountId/favorite',
                method: 'POST',
                name: 'markAsFavorite'
            },
            {
                resource: '/account/:accountId/watchlist',
                method: 'POST',
                name: 'addToWatchlist'
            }
        ],
        timezones: [
            {
                resource: 'timezones/list',
                method: 'GET',
                name: 'getSupportedTimezones'
            }
        ],
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
                name: 'discoverMovie'
            },
            {
                resource: 'discover/tv',
                method: 'GET',
                name: 'discoverTv'
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
                name: 'getMovieDetails'
            },
            {
                resource: 'movie/:movieId/account_states',
                method: 'GET',
                name: 'getMovieAccountStates'
            },
            {
                resource: 'movie/:movieId/alternative_titles',
                method: 'GET',
                name: 'getMovieAlternativeTitles'
            },
            {
                resource: 'movie/:movieId/changes',
                method: 'GET',
                name: 'getMovieChanges'
            },
            {
                resource: 'movie/:movieId/credits',
                method: 'GET',
                name: 'getMovieCredits'
            },
            {
                resource: 'movie/:movieId/images',
                method: 'GET',
                name: 'getMovieImages'
            },
            {
                resource: 'movie/:movieId/keywords',
                method: 'GET',
                name: 'getMovieKeywords'
            },
            {
                resource: 'movie/:movieId/release_dates',
                method: 'GET',
                name: 'getMovieReleaseDates'
            },
            {
                resource: 'movie/:movieId/videos',
                method: 'GET',
                name: 'getMovieVideos'
            },
            {
                resource: 'movie/:movieId/translations',
                method: 'GET',
                name: 'getMovieTranslations'
            },
            {
                resource: 'movie/:movieId/recommendations',
                method: 'GET',
                name: 'getMovieRecommendations'
            },
            {
                resource: 'movie/:movieId/similar',
                method: 'GET',
                name: 'getSimilarMovies'
            },
            {
                resource: 'movie/:movieId/reviews',
                method: 'GET',
                name: 'getMovieReviews'
            },
            {
                resource: 'movie/:movieId/lists',
                method: 'GET',
                name: 'getMovieListofLists'
            }
        ],
        tvShowDetailsId: [
            {
                resource: 'tv/:tvId',
                method: 'GET',
                name: 'getTvShowDetails'
            },
            {
                resource: 'tv/:tvId/account_states',
                method: 'GET',
                name: 'getTvShowAccountStates'
            },
            {
                resource: 'tv/:tvId/alternative_titles',
                method: 'GET',
                name: 'getTvShowAlternativeTitles'
            },
            {
                resource: 'tv/:tvId/changes',
                method: 'GET',
                name: 'getTvShowChanges'
            },
            {
                resource: 'tv/:tvId/content_ratings',
                method: 'GET',
                name: 'getTvShowContentRatings'
            },
            {
                resource: 'tv/:tvId/credits',
                method: 'GET',
                name: 'getTvShowCredits'
            },
            {
                resource: 'tv/:tvId/external_ids',
                method: 'GET',
                name: 'getTvShowExternalIds'
            },
            {
                resource: 'tv/:tvId/images',
                method: 'GET',
                name: 'getTvShowImages'
            },
            {
                resource: 'tv/:tvId/keywords',
                method: 'GET',
                name: 'getTvShowKeywords'
            },
            {
                resource: 'tv/:tvId/recommendations',
                method: 'GET',
                name: 'getTvShowRecommendations'
            },
            {
                resource: 'tv/:tvId/similar',
                method: 'GET',
                name: 'getTvShowsSimilar'
            },
            {
                resource: 'tv/:tvId/translations',
                method: 'GET',
                name: 'getTvShowTranslations'
            },
            {
                resource: 'tv/:tvId/videos',
                method: 'GET',
                name: 'getTvShowVidoes'
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
        ],
        tvShows: [
            {
                resource: 'tv/latest',
                method: 'GET',
                name: 'getLatestTvShowCreated'
            },
            {
                resource: 'tv/airing_today',
                method: 'GET',
                name: 'tvShowsAiringToday'
            },
            {
                resource: 'tv/on_the_air',
                method: 'GET',
                name: 'getTvShowsCurrentlyAiring'
            },
            {
                resource: 'tv/popular',
                method: 'GET',
                name: 'getPopularTvShows'
            },
            {
                resource: 'tv/top_rated',
                method: 'GET',
                name: 'getTopRatedTvShows'
            }
        ],
        tvSeasons: [
            {
                resource: 'tv/:tvId/season/:seasonNumber',
                method: 'GET',
                name: 'getTvSerialSeasonDetails'
            },
            {
                resource: 'tv/season/:seasonId/changes',
                method: 'GET',
                name: 'getChangesForSeason'
            },
            {
                resource: 'tv/:tvId/season/:seasonNumber/account_states',
                method: 'GET',
                name: 'getTvSerialSeasonAccountStates'
            },
            {
                resource: 'tv/:tvId/season/:seasonNumber/credits',
                method: 'GET',
                name: 'getTvSerialSeasonCredits'
            },
            {
                resource: 'tv/:tvId/season/:seasonNumber/external_ids',
                method: 'GET',
                name: 'getTvSerialSeasonExternalIds'
            },
            {
                resource: 'tv/:tvId/season/:seasonNumber/images',
                method: 'GET',
                name: 'getTvSerialSeasonImages'
            },
            {
                resource: 'tv/:tvId/season/:seasonNumber/videos',
                method: 'GET',
                name: 'getTvSerialSeasonVideos'
            }
        ],
        tvSeasonEpisodes: [
            {
                resource: 'tv/:tvId/season/:seasonNumber/episode/:episodeNumber',
                method: 'GET',
                name: 'getTvSerialEpisodeDetails'
            },
            {
                resource: 'tv/episode/:episodeId/changes',
                method: 'GET',
                name: 'getChangesForEpisode'
            },
            {
                resource: 'tv/:tvId/season/:seasonNumber/episode/:episodeNumber/account_states',
                method: 'GET',
                name: 'getTvSerialEpisodeAccountStates'
            },
            {
                resource: 'tv/:tvId/season/:seasonNumber/episode/:episodeNumber/credits',
                method: 'GET',
                name: 'getTvSerialEpisodeCredits'
            },
            {
                resource: 'tv/:tvId/season/:seasonNumber/episode/:episodeNumber/external_ids',
                method: 'GET',
                name: 'getTvSerialEpisodeExternalIds'
            },
            {
                resource: 'tv/:tvId/season/:seasonNumber/episode/:episodeNumber/images',
                method: 'GET',
                name: 'getTvSerialEpisodeImages'
            },
            {
                resource: 'tv/:tvId/season/:seasonNumber/episode/:episodeNumber/videos',
                method: 'GET',
                name: 'getTvSerialEpisodeVideos'
            }
        ],
        people: [
            {
                resource: 'person/:personId',
                method: 'GET',
                name: 'getPersonDetails'
            },
            {
                resource: 'person/:personId/movie_credits',
                method: 'GET',
                name: 'getPersonMovieCredits'
            },
            {
                resource: 'person/:personId/tv_credits',
                method: 'GET',
                name: 'getPersonTvCreditsCredits'
            },
            {
                resource: 'person/:personId/combined_credits',
                method: 'GET',
                name: 'getPersonCombinedCredits'
            },
            {
                resource: 'person/:personId/external_ids',
                method: 'GET',
                name: 'getPersonExternalIds'
            },
            {
                resource: 'person/:personId/images',
                method: 'GET',
                name: 'getPersonImages'
            },
            {
                resource: 'person/:personId/tagged_images',
                method: 'GET',
                name: 'getPersonTaggedCredits'
            },
            {
                resource: 'person/:personId/changes',
                method: 'GET',
                name: 'getChangesDoneToPerson'
            },
            {
                resource: 'person/latest',
                method: 'GET',
                name: 'getLatestCreatedPersons'
            },
            {
                resource: 'person/popular',
                method: 'GET',
                name: 'getPopularPersons'
            }
        ],
        reviews: [
            {
                resource: 'review/:reviewId',
                method: 'GET',
                name: 'getDetailedReview'
            }
        ],
        network: [
            {
                resource: 'network/:networkId',
                method: 'GET',
                name: 'getNetworkDetails'
            }
        ],
        lists: [
            {
                resource: 'list/:listId',
                method: 'GET',
                name: 'getListDetails'
            },
            {
                resource: 'list/:listId/item_status',
                method: 'GET',
                name: 'getListItemStatus'
            }
        ],
        keywords: [
            {
                resource: 'keyword/:keywordId',
                method: 'GET',
                name: 'getKeywordDetails'
            },
            {
                resource: 'keyword/:keywordId/movies',
                method: 'GET',
                name: 'getMoviesByKeyword'
            }
        ],
        jobs: [
            {
                resource: 'job/list',
                method: 'GET',
                name: 'getJobList'
            }
        ],
        find: [
            {
                resource: 'find/:externalId',
                method: 'GET',
                name: 'findByExternalId'
            }
        ],
        credits: [
            {
                resource: 'credit/:creditId',
                method: 'GET',
                name: 'getCreditDetails'
            }
        ],
        configuration: [
            {
                resource: 'configuration',
                method: 'GET',
                name: 'getAPIConfiguration'
            }
        ],
        companies: [
            {
                resource: 'company/:companyId',
                method: 'GET',
                name: 'getCompanyDetails'
            },
            {
                resource: 'company/:companyId/movies',
                method: 'GET',
                name: 'getMoviesByCompany'
            }
        ],
        collections: [
            {
                resource: 'collection/:collectionId',
                method: 'GET',
                name: 'getCollectionDetails'
            },
            {
                resource: 'collection/:collectionId/images',
                method: 'GET',
                name: 'getImagesForCollection'
            }
        ],
        changes: [
            {
                resource: 'movie/changes',
                method: 'GET',
                name: 'getLatestMovieChanges'
            },
            {
                resource: 'tv/changes',
                method: 'GET',
                name: 'getLatestTvChanges'
            },
            {
                resource: 'person/changes',
                method: 'GET',
                name: 'getLatestPersonChanges'
            }
        ],
        certifications: [
            {
                resource: 'certification/movie/list',
                method: 'GET',
                name: 'getMovieCertifications'
            },
            {
                resource: 'certification/tv/list',
                method: 'GET',
                name: 'getTvCertifications'
            }
        ]
    }
}