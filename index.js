'use strict';

let express = require('express');
let app = express();
let movies = require('./server/routes/movies');
let common = require('./server/routes/common');

app.use('/api/movies', movies);
app.use('/api/common', common);
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
