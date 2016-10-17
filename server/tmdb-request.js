'use strict'
var axios = require('axios');
var queryString = require('querystring');

var tmdbResources = require('./tmdb-resource');

module.exports = function (apiKey) {
    if (apiKey) {
        return new TmdbApi(apiKey);
    } else {
        throw new Error('No Api Key Passed while Instantiating API');
    } 
}

function TmdbApi(apiKey) {
  this.apiKey = apiKey;
  this.baseUrl = tmdbResources.baseUrl;
  this.axiosInstance = axios.create({
    baseURL: this.baseUrl
  });
  return this;
}

Object.keys(tmdbResources.apis).forEach(function (api) {
    var apiList = tmdbResources.apis[api];
    apiList.forEach(function (apiItem) {
        if (apiItem.method === 'GET') {
            TmdbApi.prototype[apiItem.name] = function (query, params, body) {
                query = query || {};
                query.api_key = this.apiKey;
                params = params || {};
                if (params.genreId) {
                    apiItem.resource.replace(':genreId', params.genreId);
                }
                return this.axiosInstance.get(apiItem.resource + '?' + queryString.stringify(query));
            }
        }
    })
})