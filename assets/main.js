// Register the worker and worker message object
var myWorker = new Worker("worker.js"),
	workerMessage = {message: "", latestData: false, domain: ""};

// Listen for messages from worker
myWorker.onmessage = function(message) {
	console.log("Message from worker: ", message.data);
	console.log(message);
}

document.addEventListener('DOMContentLoaded', function() {
	// Get latest data on button click
	var requestTrigger = document.getElementById("get-data");
	requestTrigger.addEventListener('click', function() {
		workerMessage.latestData = true;
		myWorker.postMessage(workerMessage);
		workerMessage.latestData = false;
	});
	
	// Update current domain and send to web worker
	workerMessage.domain = window.location.host;
	myWorker.postMessage(workerMessage);
}, false);
