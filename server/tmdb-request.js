'use strict'

var es6Promise = require('es6-promise')
var request = require('superagent')
var queryString = require('querystring')
var objectAssign = require('object-assign')
var PromiseFn
var tmdbResources = require('./tmdb-resource')

if (typeof Promise === 'undefined') {
    PromiseFn = Promise
} else {
    //noinspection JSUnresolvedVariable
    PromiseFn = es6Promise.Promise
}

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
  return this;
}

Object.keys(tmdbResources.apis).forEach(function (api) {
    var apiList = tmdbResources.apis[api];
    for (var i = 0; i < apiList.length; i++) {
        var a = apiList[i];
        TmdbApi.prototype[a.name] = function (query, params, body) {
            console.log(a.name);
            params = params || {};
            a.resource = a.resource
                .replace(':genreId', 150);
            console.log(a.resource);
            return makeRequest.call(this, a.resource, a.method, query, body);
        }
    }
})

function makeRequest(resource, method, query, body) {
    var url = this.baseUrl + resource
    query = objectAssign({}, query);
    query.api_key = this.apiKey;
    var qs
    if (query) {
        qs = queryString.stringify(query)
    }
    console.log('qs', qs);
    var headers = headers || {} 
    var options = {
        url: url,
        method: method,
        headers: headers,
        qs: qs,
        body: body
    }
    return new PromiseFn(function (resolve, reject) {
        var req = request('GET', url).query(query).set('Accept', 'application/json');
        var params = {};
        request(options, function (err, res) {
        if (err) {
            reject({
                status: { code: 400, message: 'Bad Request' },
                error: err
            })
        } else {
            if (res.statusCode >= 400) {
                reject(constructResponse(res))
            } else {
                resolve(constructResponse(res))
            }
        }
        })
    })
}

function constructResponse (response) {
    var obj = {
        headers: response.headers,
        status: {
        code: response.statusCode,
        message: response.statusMessage
        }
    }
    if (response.statusCode < 400) {
        obj.data = JSON.parse(response.body)
    } else {
        obj.error = JSON.parse(response.body)
    }
    return obj
}