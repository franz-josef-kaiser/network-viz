/*globals require, process */
var sys    = require( 'sys' ),
	server = require( 'http' ),
	path   = require( 'path' ),
	url    = require( 'url' ),
	fs     = require( 'fs' ),
	sep    = "-------------------------\n",
	port   = process.env.npm_package_config_port;

// Annoy user
if ( "undefined" === port ) {
	var msg =
		sep
		+ "Please run…\n"
		+ "\tnpm config set network-viz:port 8080"
		+ "…on the command line to define a port for the local server.\n"
		+ sep + "\n";
	port = 8080;
	sys.puts( msg );
}

// Start server
server.createServer( function( request, response ) {
	var path_curr = url.parse(request.url).pathname,
		path_full = path.join( process.cwd(), path_curr );

	fs.exists( path_full, function( exists ) {
		if ( ! exists ) {
			response.writeHeader( 404, { "Content-Type" : "text/plain" } );
			response.write( sep + " Error: 404 / Not Found\n" + sep );
			sys.puts( " (log) [404] " + path_full );
			response.end();
		}
		else {
			fs.readFile( path_full, "binary", function( err, file ) {
				if ( err ) {
					response.writeHeader( 500, { "Content-Type": "text/plain" } );
					response.write( sep + " " + err + "\n" + sep );
					sys.puts( " (log) [500] " + path_full );
					response.end();

				}
				else {
					response.writeHeader( 200 );
					response.write( file, "binary" );
					sys.puts( " …reloaded…" );
					response.end();
				}
			} );
		}
	} );
} ).listen( port );

sys.puts( sep + " Server Running on " + port + "\n" + sep );