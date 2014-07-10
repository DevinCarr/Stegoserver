var http = require('http');
var fs = require('fs');

module.exports = {
	start: function(port,logName,stego_console) {
		http.createServer(function (req, res) {
			stego_console.log('info','request', req.url);
			if (req.url === '/') {
				res.writeHead(200, {'Content-Type': 'text/html'});
				fs.readFile('./index.html', function(err, html) {
					if (err) {
						returnFour(stego_console, req, err);
					} else {
						res.write(html);
						res.end();
					}
				});
			} else if (req.url.indexOf('html') !== -1) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				fs.readFile('.'+req.url, function(err, html) {
					if (err) {
						returnFour(stego_console, req, err);
					} else {
						res.write(html);
						res.end();
					}
				});
			} else if (req.url.indexOf('/', req.url.length-1) !== -1) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				fs.readFile('.'+req.url+'/index.html', function(err, html) {
					if (err) {
						returnFour(stego_console, req, err);
					} else {
						res.write(html);
						res.end();
					}
				});
			} else {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				fs.readFile('.'+req.url, function(err, data) {
					if (err) {
						returnFour(stego_console, req, err);
					} else {
						res.write(data);
						res.end();
					}
				});
			}
		}).listen(port);
	}
}

var returnFour = function(stego_console, res, err) {
	stego_console.log('error', 'request', err);
	res.write('Error: 404');
	res.end();
}
