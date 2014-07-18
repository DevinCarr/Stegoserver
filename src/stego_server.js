var stego_server = {
	start: function(port,path) {
		this.path = path;
		var self = this;
		http.createServer(function (req, res) {
			if (!watcher.inList(req)) {
				if (req.url.indexOf('/', req.url.length-1) !== -1) {
					req.url += 'index.html';
					self.serveHtml(req,res);
				} else if (req.url.indexOf('html') !== -1) {
					self.serveHtml(req,res);
				} else {
					self.serveOther(req,res);
				}
			} else {
				res.writeHead(503);
				res.end();
			}
		}).listen(port);
	},
	// Return the html by writing the head and read the file
	serveHtml: function(req,res) {
		var self = this;
		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.readFile(this.path+req.url, function(err, html) {
			if (err) {
				self.returnFour(req, res, err);
			} else {
				self.returnTwo(req, res, html);
			}
		});
	},
	// Return other content such as js and images
	serveOther: function(req,res) {
		var self = this;
		res.writeHead(200, {'Content-Type': 'text/plain'});
		fs.readFile(this.path+req.url, function(err, data) {
			if (err) {
				self.returnFour(req, res, err);
			} else {
				self.returnTwo(req, res, data);
			}
		});
	},
	// Check for an existing 404.html within the 'path' folder and display
	// or return plain text 404
	returnFour: function(req,res,err) {
		var self = this;
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
	},
	// Display the requested content
	returnTwo: function(req,res,data) {
		res.write(data);
		res.end();
		log.request('complete', req.url);
	},
	path: './app/'
};
