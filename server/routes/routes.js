'use strict';
var common = require('./common');
var movies = require('./movies');
var tv = require('./television');
var authenticate = require('./authentication');

module.exports = {
    movies: movies,
    common: common,
    tv: tv,
    authenticate:authenticate
}