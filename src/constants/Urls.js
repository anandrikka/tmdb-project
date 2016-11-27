'use strict';

let baseUrl = '/api';
let constructUrl = (path) => (baseUrl + path);

export const RESOURCE_AUTHENTICATE = constructUrl('/authenticate');

//movies
export const RESOURCE_PLAYING_MOVIES = constructUrl('/movies/nowPlaying');
export const RESOURCE_UPCOMING_MOVIES = constructUrl('/movies/upcoming');

//tv
export const RESOURCE_TODAY_SERIALS = constructUrl('/tv/airingToday');

//common
export const RESOURCE_TIMEZONES = constructUrl('/common/timezones');
export const RESOURCE_MOVIE_GENRES = constructUrl('/common/movieGenres');
export const RESOURCE_TV_GENRES = constructUrl('/common/tvGenres')



