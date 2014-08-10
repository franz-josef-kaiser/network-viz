/*globals require, process */
var sys         = require( 'sys' ),
	path        = require( 'path' ),
	url         = require( 'url' ),
	fs          = require( 'fs' ),
	connect     = require( 'connect' ),
	serveStatic = require( 'serve-static' ),
	sep         = "----------------------------------------------\n",
	port        = process.env.npm_package_config_port || 8080;

// Start server
connect()
	.use( serveStatic( __dirname + '/www' ) )
	.listen( port, function() {
		"undefined" === port && sys.puts(
			sep
			+ " Please run…\n\n"
			+ " npm config set network-viz:port 8080\n\n"
			+ " …on the command line to (re)define a port.\n"
			+ sep
		);

		sys.puts(
			sep
			+ " Server Running on… http://localhost:" + port + "\n"
			+ sep
		)
	} );