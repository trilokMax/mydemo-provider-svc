const PROXY_CONFIG =  [
	"/login",
	"/logout",
	"/signup",
	"/account/*"
].reduce(function (config, src) {
	config[src] = {
		"target": "http://localhost:8090",
		"secure": false,
		"logLevel": "debug"
	};
	return config;
}, {
	"/provider/*" : {
		"target": "http://localhost:3001",
		"secure": false,
		"logLevel": "debug"
	}
});

module.exports = PROXY_CONFIG;