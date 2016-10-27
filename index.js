'use strict';

let express = require('express');
let app = express();
let movies = require('./server/routes/movies');

app.use('/api/movies', movies);

//static files serving
app.use('/dist', express.static(__dirname + '/dist'))



//serving index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/home.html');
});

app.listen(process.env.PORT || 3000);
