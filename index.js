'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var ApiUtils = require('./server/ApiUtils');
var tmdbApi = ApiUtils.tmdbApi;

var isServer = process.env.PORT;

app.use(logger('dev'));
app.use(cookieParser());

var routes = require('./server/routes/routes');

var routeKeys = Object.keys(routes);

for (let i = 0; i < routeKeys.length; i++) {
    let resourcePath = '/api/' + routeKeys[i];
    console.log('Resources for Path: ' + '\'' + resourcePath + '\'' + ' created');
    app.use(resourcePath, routes[routeKeys[i]]);
}

app.get('/api/login', function (req, res) {
    tmdbApi.requestToken().then(function (tokenResult) {
        res.redirect('https://www.themoviedb.org/authenticate/' + tokenResult.data.request_token +
            '?redirect_to=' + isServer ? 'https://tmdbredux.herokuapp.com/api/callback' : 'http://localhost/api/callback');
    }, function (error) {
        
    })
});

app.get('/api/callback', function (req, res) {
    alert('came here');
})

//static files serving
app.use('/dist', express.static(__dirname + '/dist'));

//serving index.html
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/home.html');
});

var server_port = process.env.PORT || 80;
app.listen(server_port, function () {
  console.log( "Listening on " + "port " + server_port )
});
