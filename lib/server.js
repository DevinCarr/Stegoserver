var fs = require('fs');
var http = require('http');
var log = require('./log.js');
var watcher = require('./watcher.js');

var path = './app';
var live = Object; // http.server object

exports.start = function(port,spath) {
	path = spath;
	live = http.createServer(function (req, res) {
		if (!watcher.inList(req)) {
			if (req.url.indexOf('/', req.url.length-1) !== -1) {
				req.url += 'index.html';
				serveHtml(req,res);
			} else if (req.url.indexOf('html') !== -1) {
				serveHtml(req,res);
			} else {
				serveOther(req,res);
			}
		} else {
			res.writeHead(503);
			res.end();
		}
	}).listen(port);
	// Initialize first output
	log.request('info','Stegoserver starting on port:' + port + ' Serving: ' + path);
};

exports.close = function() {
	live.close();
	log.request('info','Stegoserver shutting down');
};

// Return the html by writing the head and read the file
function serveHtml(req,res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile(path+req.url, function(err, html) {
		if (err) {
			returnFour(req, res, err);
		} else {
			returnTwo(req, res, html);
		}
	});
}

// Return other content such as js and images
function serveOther(req,res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	fs.readFile(path+req.url, function(err, data) {
		if (err) {
			returnFour(req, res, err);
		} else {
			returnTwo(req, res, data);
		}
	});
}

// Check for an existing 404.html within the 'path' folder and display
// or return plain text 404
function returnFour(req,res,err) {
	fs.readFile(path+'/404.html', function(error, html) {
		res.writeHead(404, {'Content-Type': 'text/html'});
		if (error) {
			res.write('Error: 404');
			res.end();
		} else {
			res.write(html);
			res.end();
		}
		watcher.checkThis(req,err);
		log.request('error', err);
	});
}
// Display the requested content
function returnTwo(req,res,data) {
	res.write(data);
	res.end();
	log.request('complete', req.url);
}
