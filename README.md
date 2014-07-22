Stegoserver
============
>*A static Nodejs webserver*

Stegoserver is a static hosting webserver that serves up files from a target directory.
It can serve JS, CSS, and HTML, along with images and extra files. It is targeted to serve
html pages for now.

Getting Started
============

### Usage

```shell
$ stegoserver
```
Runs with default settings as described below.



Options
============
Configurable options for the webserver.

#### port (`-p`)

**Accepts: `number`  
Default: `8080`  
Desciption:**  
The port number to connect the node webserver to.  
**Example:**  
```shell
$ stegoserver -p 80
```

#### location (`-l`)
**Accepts: `string`  
Default: `./app/`  
Description:**  
The target directory for the webserver to serve files from.  
**Example:**  
```shell
$ stegoserver -l ~/Documents/website/
```

Contributing
============
Stegoserver uses [grunt](http://gruntjs.com/) (`^4.5.0`) to use jshint and test.

#### Grunt
```shell
$ npm install -g grunt-cli
```
#### Stegoserver Setup:
```shell
git clone https://github.com/DevinCarr/Stegoserver.git
cd Stegoserver
npm install
```
#### Grunt Commands:

To check and run tests:
```shell
$ grunt
```


Notes
============
While Stegoserver is still in alpha phases, it is mostly stable, feel free to post
issues that arise.

License
============
MIT
