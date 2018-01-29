var express = require('express');
var app = express();
var fs = require('fs');
var zlib = require('zlib');
var gzip = zlib.createGzip();


app.get('/', function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain; charset=utf8'
	});
	fs.stat("/Alfresco/log/alfresco.log", function(error, stats) {
		var readStream = fs.createReadStream("/Alfresco/log/	alfresco.log");
		readStream.pipe(res);
	});
});

app.get('/lastNBytes', function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain; charset=utf8'
	});
	fs.stat("/Alfresco/log/alfresco.log", function(error, stats) {
		var readStream = fs.createReadStream("/Alfresco/log/alfresco.log", {
			start: stats.size - req.query.last,
			end: stats.size
		});
		readStream.pipe(res);
	});
});

app.get('/gzip', function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain; charset=utf8'
	});
	var readStream = fs.createReadStream("/Alfresco/log/alfresco.log");
	readStream.pipe(gzip).pipe(res);
});

var server = app.listen(1339, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Started!');
});