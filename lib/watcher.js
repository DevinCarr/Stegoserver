var fs = require('fs');
var log = require('./log.js');

var strictType = 'lax',
    currentList = [],
    potentialList = [];

exports.inList = function(req) {
    var exist = false;
    ip = returnIP(req).toString();
    for (var i = 0; i < currentList.length; i++) {
        if (currentList[i].toString().indexOf(ip) !== -1) {
            exist = true;
        }
    }
    return exist;
};

exports.checkThis = function(req,err) {
    // Run through a list of checks for 'bad requestors'
    // Check the type of scrutiny for the watcher
    var addTo = false;
    if (strictType.indexOf('lax') !== -1) {
        addTo = laxLength(req,err);
    } else {
        addTo = stcLength(req,err);
    }
    // If the request is bad, return true
    if (addTo) {
        updateBlacklist(req);
    }
};


function updateBlacklist(req) {
    ip = returnIP(req);
    fs.appendFile('./blacklist.txt', ip+'\n', function(err) {
        if (err) throw err;
        log.blacklist('NEW', ip);
        loadBlacklist();
    });
}

function returnIP(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var re = /[0-9]+(?:\.[0-9]+){3}/;
    ip = ip.match(re);
    return ip;
}

function loadBlacklist() {
    fs.readFile('./blacklist.txt', function(error,data) {
        if (error) throw error;
        data = data.toString();
        currentList = data.split("\n");
    });
}

function laxLength(req,err) {
    return (req.url.length > 90);

}

function stcLength(req,err) {
    return (req.url.length > 60);
}
