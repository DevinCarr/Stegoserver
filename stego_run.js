#!/usr/bin/env node

var main = function() {
	var server = require('./stego_server.js');
	var stego_console = require('./stego_console.js');
	// Aquire the system variables needed
	args = checkArgs();
	port = args['port'];
	log = args['log'];

	// Start the console logging
	stego_console.start(log);

	// Start the server
	server.start(port,log,stego_console)
	// Initialize first output
	var date = new Date();
	stego_console.log('info', 'initialization', 'Stegoserver starting on port:' + port);
}

var checkArgs = function() {
	var args = process.argv.slice(2);
	var portNum = 8080;
	var logName = '';

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
				'\n  -l, --log [NAME]\t' +
				'The name of the log file to output to. Default: Console');
			process.exit(0);
		} else if (val === '-p') {
			// Check the port value for a number
			if (typeof(+args[index+1]) === 'number')
				portNum = args[index+1];
		} else if  (val == '-l') {
			// Check the log value for a string
			var input = args[index+1];
			if (typeof(input) === 'string') {
				if (input.indexOf('.log') !== -1) {
					logName = input + '.log';
				} else {
					logName = input;
				}
			}
		}
	});
	return { 'port': portNum, 'log': logName };
}

// Run the main method if called from the console
if (require.main === module) {
    main();
}
