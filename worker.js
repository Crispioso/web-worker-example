var domain,
	url,
	domainSet;

/* Request data */

// Function to perform Ajax request
var ajax = function(url, data, callback, type) {
	var data_array, data_string, idx, req, value;
	if (data == null) {
		data = {};
	}
	if (callback == null) {
		callback = function() {};
	}
	if (type == null) {
		//default to a GET request
		type = 'GET';
	}
	data_array = [];
	for (idx in data) {
		value = data[idx];
		data_array.push("" + idx + "=" + value);
	}
	data_string = data_array.join("&");
	req = new XMLHttpRequest();
	req.open(type, url, false);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.onreadystatechange = function() {
		if (req.readyState === 4 && req.status === 200) {
		  return callback(req.responseText);
		}
	};
	req.send(data_string);
	return req;
};

// Perform ajax request and send response back to window	
function requestLatestData(url, response) {
	ajax(url, null, function(data) {
	   // self.postMessage(data);
	   response(data);
	});	
}

// Store latest data for first time on load
// url = "https://www.ons.gov.uk/data";
// requestLatestData(url, response = function(data) {
	
// });


// Listen for messages from window
onmessage = function(e) {
	// Update domain from window
	if (!domainSet && e.data.domain !== "") {
		domain = e.data.domain;
		// setupWebsocket(domain);
	}
	
	// Return latest data on request
	if (e.data.latestData) {
		// url = "//" + domain + "/data";
		url = "https://www.ons.gov.uk/data"
		requestLatestData(url, response = function(data) {
			self.postMessage(data);
		});
	}
}


/* Websocket */

function setupWebsocket(domain) {
	var connection = new WebSocket('ws://' + domain + '/zebedee', ['soap', 'xmpp']);
	
	// When the connection is open, send some data to the server
	connection.onopen = function () {
		connection.send('Ping'); // Send the message 'Ping' to the server
	};
	
	// Log errors
	connection.onerror = function (error) {
		console.log('WebSocket Error ', error);
	};
	
	// Log messages from the server
	connection.onmessage = function (e) {
		console.log('Server: ', e.data);
	};
	
	// Only allow domain to be set once (on initial load)
	domainSet = true;
}

