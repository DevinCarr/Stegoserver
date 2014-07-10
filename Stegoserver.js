var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
	var time = new Date();
	console.log(time.toUTCString() + ' ~ req : ' + req.url)
	if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('./index.html', function(err, html) {
            if (err) {
				console.log('error: ' + err);
				res.write("Error: 404");
				res.end();
			} else {
	            res.write(html);
	            res.end();
			}
        });
    } else if (req.url.indexOf('html') !== -1) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('.'+req.url, function(err, html) {
            if (err) {
				console.log('error: ' + err);
				res.write("Error: 404");
				res.end();
			} else {
				res.write(html);
				res.end();
			}
        });
    } else if (req.url.indexOf('/', req.url.length-1) !== -1) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('.'+req.url+'/index.html', function(err, html) {
            if (err) {
				console.log('error: ' + err);
				res.write("Error: 404");
				res.end();
			} else {
				res.write(html);
				res.end();
			}
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        fs.readFile('.'+req.url, function(err, data) {
            if (err) {
                console.log('error: ' + err);
				res.write("Error: 404");
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    }
}).listen(80);

var date = new Date();
console.log(date.toUTCString() + ' ~ INITIALIZE SERVER : 0.0.0.0:80');
