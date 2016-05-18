var https = require('https');
var express = require('express');
var path = require('path');
var app = express();
var ws = require('nodejs-websocket');
var port = 8081;

// Variable to store object that'll be requested by web worker
var json = {"intro":{"title":"Welcome to the Office for National Statistics","markdown":"The UK\u0027s largest independent producer of official statistics and the recognised national statistical institute of the UK."},"sections":[{"theme":{"uri":"/economy"},"statistics":{"uri":"/economy/inflationandpriceindices/timeseries/d7g7"}},{"theme":{"uri":"/employmentandlabourmarket"},"statistics":{"uri":"/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/timeseries/lf24"}},{"theme":{"uri":"/employmentandlabourmarket"},"statistics":{"uri":"/employmentandlabourmarket/peoplenotinwork/unemployment/timeseries/mgsx"}},{"theme":{"uri":"/economy"},"statistics":{"uri":"/economy/grossdomesticproductgdp/timeseries/ihyq"}},{"theme":{"uri":"/peoplepopulationandcommunity"},"statistics":{"uri":"/peoplepopulationandcommunity/populationandmigration/populationestimates/timeseries/ukpop"}}],"serviceMessage":"","type":"home_page","uri":"/","description":{"title":"Home","summary":"The UK\u0027s largest independent producer of official statistics and the recognised national statistical institute of the UK.","keywords":["statistics","economy","census","population","inflation","employment"],"metaDescription":"The UK\u0027s largest independent producer of official statistics and the recognised national statistical institute of the UK.","unit":"","preUnit":"","source":""}};

// Regularly update the data with slightly different data
setInterval(function(){
	var n = Math.floor(Math.random() * 100) + 1  ;
	json['nonsenseNode'] = n;
}, 5000);

/* Web server */
// app.get('/', function (req, res) {
// 	res.send(json);
// });

// app.listen(port, function() {
//     console.log('Server running on port ' + port);
// });

/* Web sockets */
var options = {
	
}


// Scream server example: "hi" -> "HI!!!" 
var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
		console.log("Received "+str)
		conn.sendText(str.toUpperCase()+"!!!")
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
}).listen(8081, '127.0.0.1')
