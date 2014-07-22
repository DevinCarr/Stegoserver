var server = require('../lib/server.js');
var http = require('http');
var fs = require('fs');

exports.server = {
    setUp: function(done) {
        // setup
        server.start(8080,"./test");
        done();
    },
    tearDown: function(done) {
        server.close();
        fs.writeFile('./server.log', '', function(err) {
            done();
        });
    },
    getTesting: function(test) {
        test.expect(1);
        http.get({
            host:'127.0.0.1',
            port:8080,
            path:'/testing.txt'
            }, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (data) {
                    test.equal(data, 'testing stegoserver!\n');
                    test.done();
                });
        });
    },
    get404: function(test) {
        test.expect(1);
        http.get({
            host:'127.0.0.1',
            port:8080,
            path:'/error'
            }, function(res) {
                test.equal(res.statusCode, 404);
                test.done();
        });
    }
};
