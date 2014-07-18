var stego_console = {
	request: function(type,data) {
		// Output to the requests.log
		var output = this.build(type, 'request', data);
		fs.appendFile('./requests.log', output, function(err) {
			if (err) throw err;
		});
	},
	blacklist: function(type, access, info) {
		// Output potential blacklist log
		var output = this.build(type, access, info);
		fs.appendFile('./potential.log', output, function(err) {
			if (err) throw err;
		});
	},
	build: function(type, access, info) {
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
		str += '\n';

		// Return the completed string
		return str;
	}
};
