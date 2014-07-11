var stego_console = {
	log: function(type, access, info) {
		var output = this.buildLog(type, access, info);
		// Check whether to send to console or a log file
		if (this.fileName) {
			this.writeLog(output);
		} else {
			this.outLog(output);
		}
	},
	start: function(file) {
		this.fileName = file;
	},
	writeLog: function(output) {
		// Output to the given filename
		fs.appendFile(this.fileName, output, function(err) {
			if (err) throw err;
		});
	},
	outLog: function(output) {
		// Output to the console JS object
		console.log(output);
	},
	buildLog: function(type, access, info) {
		// Build the log message to be output
		// Default values
		type = type || '[INFO]';
		var date = new Date();

		//Build the string
		var str = date.toUTCString() + ' ';
		str += '[' + type.toUpperCase() + '] ';
		if (access !== '')
				str += '[' + access.toUpperCase() + '] ';
		if (type.indexOf('error') !== -1)
			str += ': ' + info.message;
		else
			str += ': ' + info;

		// Return the completed string
		return str;
	},
	fileName: ''	// For checking to use the console.log or not
};
