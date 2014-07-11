var stego_server = {
	start: function(port,path,s_console) {
		this.path = path;
		this.s_console = s_console;
		var self = this;
		http.createServer(function (req, res) {
			self.s_console.log('info','request', req.url);
			if (req.url === '/') {
				res.writeHead(200, {'Content-Type': 'text/html'});
				fs.readFile(path+'/index.html', function(err, html) {
					if (err) {
						self.returnFour(res, err);
					} else {
						res.write(html);
						res.end();
					}
				});
			} else if (req.url.indexOf('html') !== -1) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				fs.readFile(path+req.url, function(err, html) {
					if (err) {
						self.returnFour(res, err);
					} else {
						res.write(html);
						res.end();
					}
				});
			} else if (req.url.indexOf('/', req.url.length-1) !== -1) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				fs.readFile(path+req.url+'/index.html', function(err, html) {
					if (err) {
						self.returnFour(res, err);
					} else {
						res.write(html);
						res.end();
					}
				});
			} else {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				fs.readFile(path+req.url, function(err, data) {
					if (err) {
						self.returnFour(res, err);
					} else {
						res.write(data);
						res.end();
					}
				});
			}
		}).listen(port);
	},
	// Check for an existing 404.html within the 'path' folder and display
	// or return plain text 404
	returnFour: function(res, err) {
		this.s_console.log('error', 'request', err);
		fs.readFile(path+'404.html', function(err, html) {
			if (err) {
				res.write('Error: 404');
				res.end();
			} else {
				res.write(html);
				res.end();
			}
		});
	},
	s_console: '',
	path: './app/'
};
