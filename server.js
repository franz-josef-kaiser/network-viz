/*globals require, process */
var sys         = require( 'sys' ),
	path        = require( 'path' ),
	url         = require( 'url' ),
	fs          = require( 'fs' ),
	connect     = require( 'connect' ),
	serveStatic = require( 'serve-static' ),
	sep         = "-------------------------\n",
	port        = process.env.npm_package_config_port || 8080;

// Annoy user
if ( "undefined" === port ) {
	sys.puts(
		sep
		+ "Please run…\n"
		+ "\tnpm config set network-viz:port 8080"
		+ "…on the command line to define a port for the local server.\n"
		+ sep + "\n"
	);
}

// Start server
connect()
	.use( serveStatic( __dirname ) )
	.listen( port );

sys.puts( sep + " Server Running on " + port + "\n" + sep );