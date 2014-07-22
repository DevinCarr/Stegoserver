var log = require('../lib/log.js');
var fs = require('fs');

exports.log = {
    setUp: function(done) {
        // setup
        fs.writeFile('./server.log', '', function(err) {
            done();
        });
    },
    tearDown: function(done) {
        fs.writeFile('./server.log', '', function(err) {
            done();
        });
    },
    request: function(test) {
        test.expect(2);
        log.request('info', 'testing tests');
        fs.readFile('./server.log', {encoding: 'utf8'}, function(error,data) {
            test.ifError(error);
            data = data.toString().indexOf("[REQUEST] [INFO] : testing tests");
            test.notEqual(data, -1); // check to see if it is there
            test.done();
        });
    },
    blacklist: function(test) {
        test.expect(2);
        log.blacklist('NEW', '0.0.0.0');
        fs.readFile('./server.log', {encoding: 'utf8'}, function(error,data) {
            test.ifError(error);
            data = data.toString().indexOf("[BLACKLIST] [NEW] : 0.0.0.0");
            test.notEqual(data, -1); // check to see if it is there
            test.done();
        });
    }
};
