// server.js

// modules =================================================
const http           	= require('http');
const express        	= require('express');
const app            	= express();
const path 				= require('path');
const proxy 			= require('express-http-proxy');
const bodyParser 		= require('body-parser');
const db 				= require('./db');

// configuration ===========================================
const LOCAL_API_PREFIX = '/api';
const REMOTE_API_PREFIX = '/api';

let getProxyPath = function(){
	if(process.env.PROXY_URL){
		return process.env.PROXY_URL;
	}
	return 'http://localhost:8090'; //defualt target in proxy config
};

let appRoot = '/dist/app';

let port = process.env.PORT || 3001;

let proxyPath = getProxyPath();

console.log('PROXY_PATH: ' + proxyPath)

app.use(bodyParser.json());

app.use(express.static(__dirname + appRoot));

app.get('/provider/token', function(req, res) {
	res.send(db.token2);
});

// Handle all other api calls
app.use(`${LOCAL_API_PREFIX}`, proxy(proxyPath, {
	proxyReqPathResolver: function(req) {
		return `${REMOTE_API_PREFIX}${require('url').parse(req.url).path}`;
	}
}));

app.get('*', function(req, res){
    res.sendFile('index.html', {root: path.join(__dirname, appRoot)});
});

let server = http.createServer(app);
server.listen(port);

console.log('Server running on port ' + port);

process.on('exit', function(){
  server.stop()
});