var fs = require('fs');

module.exports = {
	log: function(type, access, info) {
		var output = buildLog(type, access, info);
		// Check whether to send to console or a log file
		if (fileName) {
			writeLog(output);
		} else {
			outLog(output);
		}
	},
	start: function(file) {
		fileName = file
	}
}

// For checking to use the console.log or not
var fileName;

// Output to the given filename
var writeLog = function(output) {
	fs.appendFile(fileName, output, function(err) {
		if (err) throw err;
	});
}

// Output to the console JS object
var outLog = function(output) {
	console.log(output);
}

// Build the log message to be output
var buildLog = function(type, access, info) {
	// Default values
	type = type || '[INFO]';
	var date = new Date();

	//Build the string
	var str = date.toUTCString() + ' ';
	str += '[' + type.toUpperCase() + '] ';
	if (access !== '')
			str += '[' + access.toUpperCase() + '] ';
	str += ': ' + info;

	// Return the completed string
	return str;
}
