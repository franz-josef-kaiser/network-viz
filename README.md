# Network Viz

A Gexf Network Visualization Webapplication.

## Install

To install, you need [Nodejs](nodejs.org/). Clone or download the application. Then open your
Terminal / Bash / Shell / Console and enter the following (without the preceding `$`):

	$ npm install
	$ npm run setup
	$ npm run build

This gives you a built application. To start your local server, please run

	$ npm start

Your server should then be reachable on `http://localhost:8080`. If you have a port conflict,
please redefine your port to a different one than `8080`.

	$ npm config set network-viz:port 12345