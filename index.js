var https = require('https');
var express = require('express');
var path = require('path');
var app = express();
var port = 8080;


/*
 * Start web server
 */

app.use(express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(port, function() {
    console.log('Server running on port ' + port);
});