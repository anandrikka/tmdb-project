'use strict';

let express = require('express');
let app = express();

app.use('/dist', express.static(__dirname + '/dist'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
