'use strict';

var express = require('express');
var app = express();
var routes = require('./server/routes/routes');

var routeKeys = Object.keys(routes);

for (let i = 0; i < routeKeys.length; i++) {
    let resourcePath = '/api/' + routeKeys[i];
    console.log('Resources for Path: ' + '\'' + resourcePath + '\'' + ' created');
    app.use(resourcePath, routes[routeKeys[i]]);
}

// app.use('/api/movies', routes.movies);
// app.use('/api/common', routes.common);
//static files serving
app.use('/dist', express.static(__dirname + '/dist')) 



//serving index.html
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/home.html');
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
