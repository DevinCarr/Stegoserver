var fs = require('fs');
var http = require('http');

var main = function() {
	var server = stego_server;
	var s_console = stego_console;
	// Aquire the system variables needed
	args = checkArgs();
	port = args.port;
	log = args.log;
	path = args.path;

	// Start the console logging
	s_console.start(log);

	// Start the server
	server.start(port,path,s_console);
	// Initialize first output
	var date = new Date();
	s_console.log('info', 'initialization', 'Stegoserver starting on port:' + port);
};

var checkArgs = function() {
	var args = process.argv.slice(2);
	var portNum = 8080;
	var logName = '';
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
				'The location of the app to serve files from (app folder). Default .' +
				'\n  -d, --debug [FILE_NAME]\t' +
				'The name of the log file. Default: Console');
			process.exit(0);
		} else if (val === '-p') {
			// Check the port value for a number
			if (typeof(+args[index+1]) === 'number')
				portNum = args[index+1];
		} else if  (val === '-d') {
			// Check the log value for a string
			var given = args[index+1];
			if (typeof(given) === 'string') {
				if (given.indexOf('.log') !== -1) {
					logName = given + '.log';
				} else {
					logName = given;
				}
			}
		} else if (val === '-l') {
			// Check the webapp file location
			var input = args[index+1];
			console.log('here');
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
			console.log('back');
		}
	});
	return { 'port': portNum, 'log': logName, 'path': filePath };
};

// Run the main method if called from the console
if (require.main === module) {
	main();
}