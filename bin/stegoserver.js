#!/usr/bin/env node
var fs = require('fs');
var http = require('http');
var server = require('../lib/server.js');

function main() {
	// Aquire the system variables needed
	args = checkArgs();
	port = args.port;
	path = args.path;

	// Start the server
	server.start(port,path);

	// catches ctrl+c event
	process.on('SIGINT', function() { close() });
	process.on('SIGTERM', function() { close() });
};

// Watch for close commands
var close = function () {
	server.close();
	process.exit(0);
}

var checkArgs = function() {
	var args = process.argv.slice(2);
	var portNum = 8080;
	var blacklist = 'lax';
	var filePath = './app';

	// Check the input console args for -h, -p, -l
	args.forEach(function(val, index) {
		if (val === '-h' || val === '--help') {
			// Display the help
			console.log(
				'Usage: Stegoserver.js [options]\n' +
				'\nA simple static Nodejs webserver\n' +
				'\nOptions:' +
				'\n  -p, --port [PORT]\t' +
				'The port number to bind the webservice to. Default: 8080' +
				'\n  -l, --location [FILE_PATH]\t' +
				'The location of the app to serve files from (app folder). Default .');
			process.exit(0);
		} else if (val === '-p') {
			// Check the port value for a number
			if (typeof(+args[index+1]) === 'number')
				portNum = args[index+1];
		} else if (val === '-l') {
			// Check the webapp file location
			var input = args[index+1];
			stats = fs.statSync(input);
			if (!stats.isDirectory()) {
				console.log('ERROR: path doesn\'t exist');
				process.exit(0);
			} else {
				if (input.indexOf('/', input.length-1) === -1)
					filePath = input;
				else
					filePath = input.substring(0,input.length-1);
			}
		}
	});
	return { 'port': portNum, 'path': filePath };
};

// Run the main method if called from the console
if (require.main === module) {
	main();
}
