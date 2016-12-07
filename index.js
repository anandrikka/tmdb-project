var express = require('express');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var ApiUtils = require('./server/ApiUtils');
var tmdbApi = ApiUtils.tmdbApi;

var isServer = process.env.PORT;

/**
 *Middleware for all requests
 */
app.use(logger('dev'));
app.use(cookieParser());

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
        if (isServer) {
            buildUrl = buildUrl + 'https://tmdbredux.herokuapp.com/api/callback';
        } else {
            buildUrl = buildUrl + 'http://localhost/api/callback';
        }
        console.log('buildUrl: ', buildUrl);
        // res.write('<a href="'+buildUrl+'" target="popup" onload="window.open("/api/login", "popup", "width=600,height=600")\"/>')
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
            res.write('<script>window.close();</script>');
            res.redirect('/');
            //res.sendStatus(500).redirect('/');
        })
    } else {
        
    }
})

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
