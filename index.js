'use strict';

var express = require('express');
var app = express();
var logger = require('morgan');
var Cookies = require('cookies');
var bodyParser = require('body-parser');
var ApiUtils = require('./server/ApiUtils');
var tmdbApi = ApiUtils.tmdbApi;

var isProd = process.env.PORT ? true : false;

/**
 *Middleware for all requests
 */
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

/**
 *Routes for all resources are created here
 */
var routes = require('./server/routes/routes');
var routeKeys = Object.keys(routes);
for (let i = 0; i < routeKeys.length; i++) {
    let resourcePath = '/api/' + routeKeys[i];
    console.log('Resources for Path: ' + '\'' + resourcePath + '\'' + ' created');
    app.use(resourcePath, routes[routeKeys[i]]);
}

/**
 *Api from front-end to authenticate TMDB users
 */
app.get('/api/login', function (req, res) {
    tmdbApi.requestToken().then(function (tokenResult) {
        var buildUrl = 'https://www.themoviedb.org/authenticate/' +
            tokenResult.data.request_token + '?redirect_to=';
        if (isProd) {
            buildUrl = buildUrl + 'https://filmtalkies.herokuapp.com/api/callback';
        } else {
            buildUrl = buildUrl + 'http://localhost/api/callback';
        }
        res.redirect(buildUrl);
    }, function (error) {
        
    })
});

/**
 *Callback called when user authenticated our app.all
 *This is where we need to save a cookie.
 */
app.get('/api/callback', function (req, res) {
    if (req.query.approved) {
        tmdbApi.createSession({ request_token: req.query.request_token }).then(function (sessionResult) {
            var cookies = new Cookies(req, res);
            var encryptedSessionId = ApiUtils.encrypt(sessionResult.data.session_id);
            var oneDayMilliSeconds = 24 * 60 * 60 * 1000;
            var expiryDateInMilliSeconds = Date.now() + oneDayMilliSeconds;
            var cookieOptions = {
                http: true
                //expires: new Date(expiryDateInMilliSeconds),
                //secure: isProd ? true : false
            };
            try {
                cookies.set('filmtalkies', encryptedSessionId, cookieOptions);
            } catch (e) {
                console.log(e)
                res.sendStatus(500);
                return;
            }
            res.redirect('/');
        }, function (error) {
            console.log(error);
        })
    } else {
        res.redirect('/');
    }
})

app.get('/api/logout', function (req, res) {
    res.clearCookie('filmtalkies');
    res.redirect('/');
});

/**
 *Static file serving from dist folder with /dist path
 */
app.use('/dist', express.static(__dirname + '/dist'));

/**
 *Home page when user open application
 */
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/home.html');
});

var server_port = process.env.PORT || 80;
app.listen(server_port, function () {
  console.log( "Listening on " + "port " + server_port )
});
