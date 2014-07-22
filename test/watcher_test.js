var server = require('../lib/server.js');
var fs = require('fs');
var http = require('http');

exports.watcher = {
    setUp: function(done) {
        // setup
        server.start(8080,"./test");
        done();
    },
    tearDown: function(done) {
        server.close();
        fs.writeFile('./server.log', '', function(err) {
            fs.writeFile('./blacklist.txt', '', function(err) {
                done();
            });
        });
    },
    urlLength: function(test) {
        test.expect(3);
        var badPath = "/";
        for (var i = 0; i < 90; i++)
            badPath += "a";
        http.get({
            host:'127.0.0.1',
            port:8080,
            path:badPath
            }, function(res) {
                fs.readFile('./blacklist.txt', function(error,data) {
                    test.ifError(error);
                    data = data.toString().indexOf("127.0.0.1");
                    test.notEqual(data, -1); // check to see if it is there
                    http.get({
                        host:'127.0.0.1',
                        port:8080,
                        path:badPath
                    }, function(response) {
                        test.equal(response.statusCode, 503); // check to see if it is there
                        test.done();
                    });
                });
        });
    }
};
