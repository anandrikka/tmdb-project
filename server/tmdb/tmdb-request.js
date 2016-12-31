'use strict'

var axios = require('axios');
var queryString = require('querystring');

var tmdbResources = require('./tmdb-resource');

module.exports = function (apiKey, baseUrl) {
    if (apiKey) {
        return new TmdbApi(apiKey, baseUrl);
    } else {
        throw new Error('No Api Key Passed while Instantiating API');
    } 
}

function TmdbApi(apiKey, baseUrl) {
  this.apiKey = apiKey;
  this.baseUrl = baseUrl || tmdbResources.baseUrl;
  this.axiosInstance = axios.create({
    baseURL: this.baseUrl
  });
  return this;
}

Object.keys(tmdbResources.apis).forEach(function (api) {
    var apiList = tmdbResources.apis[api];
    apiList.forEach(function (apiItem) {
        TmdbApi.prototype[apiItem.name] = function (query, params, body) {
            query = query || {};
            query.api_key = this.apiKey;
            params = params || {};
            // Deep copy resource, so that apiItem resource will not be changed
            var resource = JSON.parse(JSON.stringify(apiItem.resource));
            //replace all the params with the params from input
            resource = resource
                .replace(':genreId', params.genreId)
                .replace(':externalId', params.externalId)
                .replace(':movieId', params.movieId)
                .replace(':tvId', params.tvId)
                .replace(':seasonNumber', params.seasonNumber)
                .replace(':seasonId', params.seasonId)
                .replace(':episodeNumber', params.episodeNumber)
                .replace(':episodeId', params.episodeId)
                .replace(':personId', params.personId)
                .replace(':reviewId', params.reviewId)
                .replace(':networkId', params.networkId)
                .replace(':listId', params.listId)
                .replace(':keywordId', params.keywordId)
                .replace(':externalId', params.externalId)
                .replace(':creditId', params.creditId)
                .replace(':companyId', params.companyId)
                .replace(':collectionId', params.collectionId)
                .replace(':accountId', params.accountId);
            console.log('Server Query: ', resource + '?' + queryString.stringify(query));
            if (apiItem.method === 'GET') {
                return this.axiosInstance.get(resource + '?' + queryString.stringify(query));
            } else {
                return this.axiosInstance.post(resource + '?' + queryString.stringify(query), body);
            }
        }
    })
})