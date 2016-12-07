const baseUrl = '/api';
const constructUrl = path => (baseUrl + path);

export const RESOURCE_AUTHENTICATE = constructUrl('/authenticate/login');
export const RESOURCE_REQ_AUTH_TOKEN = constructUrl('/authenticate/loginReqToken');
export const REQ_LOGIN_WITH_AUTH_TOKEN = constructUrl('/authenticate/dialogWithReqToken');

// movies
export const RESOURCE_PLAYING_MOVIES = constructUrl('/movies/nowPlaying');
export const RESOURCE_UPCOMING_MOVIES = constructUrl('/movies/upcoming');
export const RESOURCE_POPULAR_MOVIES = constructUrl('/movies/popular');
export const RESOURCE_TOP_RATED_MOVIES = constructUrl('/movies/topRated');

// tv
export const RESOURCE_TODAY_SERIALS = constructUrl('/tv/airingToday');
export const RESOURCE_TV_POPULAR = constructUrl('/tv/popular');
export const RESOURCE_TV_TOP_RATED = constructUrl('/tv/topRated');
export const RESOURCE_TV_ON_AIR = constructUrl('/tv/airingNow');

// people
export const RESOURCE_PEOPLE_POPULAR = constructUrl('/people/popular');

// common
export const RESOURCE_TIMEZONES = constructUrl('/common/timezones');
export const RESOURCE_MOVIE_GENRES = constructUrl('/common/movieGenres');
export const RESOURCE_TV_GENRES = constructUrl('/common/tvGenres');
