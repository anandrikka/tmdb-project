const baseUrl = '/api';
const constructUrl = path => (baseUrl + path);

// account
export const USER_DETAILS = constructUrl('/account/getAccountDetails');
export const RESOURCE_REQ_AUTH_TOKEN = constructUrl('/authenticate/loginReqToken');
export const REQ_LOGIN_WITH_AUTH_TOKEN = constructUrl('/authenticate/dialogWithReqToken');

// movies
export const PLAYING_MOVIES = constructUrl('/movies/nowPlaying');
export const UPCOMING_MOVIES = constructUrl('/movies/upcoming');
export const POPULAR_MOVIES = constructUrl('/movies/popular');
export const TOP_RATED_MOVIES = constructUrl('/movies/topRated');
export const SEARCH_MOVIES = constructUrl('/movies/search');
export const DISCOVER_MOVIES = constructUrl('/movies/discover');

// tv
export const TODAY_SERIALS = constructUrl('/tv/airingToday');
export const TV_POPULAR = constructUrl('/tv/popular');
export const TV_TOP_RATED = constructUrl('/tv/topRated');
export const TV_ON_AIR = constructUrl('/tv/airingNow');
export const SEARCH_TV = constructUrl('/tv/search');
export const DISCOVER_TV = constructUrl('/tv/discover');

// people
export const PEOPLE_POPULAR = constructUrl('/people/popular');

// common
export const RESOURCE_TIMEZONES = constructUrl('/common/timezones');
export const MOVIE_GENRES = constructUrl('/common/movieGenres');
export const TV_GENRES = constructUrl('/common/tvGenres');
export const CONFIG = constructUrl('/common/configuration');
