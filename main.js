// Register the worker and worker message object
var myWorker = new Worker("worker.js"),
	workerMessage = {message: "", latestData: false};

// Listen for messages from worker
myWorker.onmessage = function(message) {
	console.log("Message from worker: ", message.data);
}

// Test worker by sending a message
workerMessage.message = "Testing testing 1, 2, 3";
myWorker.postMessage(workerMessage);
workerMessage.message = "";

document.addEventListener('DOMContentLoaded', function() {
	// Get latest data
	var requestTrigger = document.getElementById("get-data");
	requestTrigger.addEventListener('click', function() {
		workerMessage.latestData = true;
		myWorker.postMessage(workerMessage)
		workerMessage.latestData = false;
	});
}, false);

