var fs = require('fs');

exports.request = function(type,info) {
	// Output to the requests.log
	var output = build('request', type, info);
	fs.appendFile('./server.log', output, function(err) {
		if (err) throw err;
	});
};
exports.blacklist = function(type,info) {
	// Output potential blacklist log
	var output = build('blacklist', type, info);
	fs.appendFile('./server.log', output, function(err) {
		if (err) throw err;
	});
};

function build(access, type, info) {
	// Build the log message to be output
	// Default values
	type = type || '[INFO]';
	var date = new Date();

	//Build the string
	var str = date.toUTCString() + ' ';
	if (access !== '')
			str += '[' + access.toUpperCase() + '] ';
	str += '[' + type.toUpperCase() + '] ';
	if (type.indexOf('error') !== -1)
		str += ': ' + info.message;
	else
		str += ': ' + info;
	str += '\n';

	// Return the completed string
	return str;
}
