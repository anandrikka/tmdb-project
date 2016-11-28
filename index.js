'use strict';

var express         = require('express');
var app             = express();
var routes          = require('./server/routes/routes');

var routeKeys = Object.keys(routes);

for (let i = 0; i < routeKeys.length; i++) {
    let resourcePath = '/api/' + routeKeys[i];
    console.log('Resources for Path: ' + '\'' + resourcePath + '\'' + ' created');
    app.use(resourcePath, routes[routeKeys[i]]);
}

//static files serving
app.use('/dist', express.static(__dirname + '/dist'));

//serving index.html
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/home.html');
});

var server_port = process.env.PORT || 3000;
app.listen(server_port, function () {
  console.log( "Listening on " + "port " + server_port )
});
