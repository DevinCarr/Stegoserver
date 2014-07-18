var fs = require('fs');
var http = require('http');
var server = stego_server;
var log = stego_console;

var main = function() {
	// Aquire the system variables needed
	args = checkArgs();
	port = args.port;
	blacklist = args.blacklist;
	path = args.path;

	// Start the server
	server.start(port,path,log);
	// Initialize first output
	log.request('info','Stegoserver starting on port:' + port);
};

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
				'The location of the app to serve files from (app folder). Default .' +
				'\n  -b, --blacklist [TYPE]\t' +
				'A request watcher to actively blacklist bad requests. Default: lax');
			process.exit(0);
		} else if (val === '-p') {
			// Check the port value for a number
			if (typeof(+args[index+1]) === 'number')
				portNum = args[index+1];
		} else if  (val === '-b') {
			// Check the blacklist value for a string
			var given = args[index+1];
			if (typeof(given) === 'string') {
				// If not strict, assume lax
				if (given.indexOf('strict') !== -1) {
					blacklist = given;
				}
			}
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
	return { 'port': portNum, 'blacklist': blacklist, 'path': filePath };
};

// Run the main method if called from the console
if (require.main === module) {
	main();
}
