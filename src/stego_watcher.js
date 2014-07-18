var stego_watcher = {
    strictType: 'lax',
    currentList: [],
    potentialList: [],
    inList: function(req) {
        var exist = false;
        ip = this.returnIP(req).toString();
        for (var i = 0; i < this.currentList.length; i++) {
            if (this.currentList[i].toString().indexOf(ip)) {
                exist = true;
            }
        }
        return exist;
    },
    checkThis: function(req,err) {
        // Run through a list of checks for 'bad requestors'
        // Check the type of scrutiny for the watcher
        var addTo = false;
        if (this.strictType.indexOf('lax') !== -1) {
            addTo = this.laxLength(req,err);
        } else {
            addTo = this.stcLength(req,err);
        }
        // If the request is bad, return true
        if (addTo) {
            this.updateBlacklist(req);
        }
    },
    updateBlacklist: function(req) {
        var self = this;
        ip = this.returnIP(req);
        fs.appendFile('./blacklist.txt', ip+'\n', function(err) {
            if (err) throw err;
            log.blacklist('NEW', ip);
            self.loadBlacklist();
        });
    },
    returnIP: function(req) {
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        var re = /[0-9]+(?:\.[0-9]+){3}/;
        ip = ip.match(re);
        return ip;
    },
    loadBlacklist: function() {
        var self = this;
        fs.readFile('./blacklist.txt', function(error,data) {
            if (error) throw error;
            data = data.toString();
            self.currentList = data.split("\n");
        });
    },
    laxLength: function(req,err) {
        return (req.url.length > 90);

    },
    stcLength: function(req,err) {
        return (req.url.length > 60);
    }
};
