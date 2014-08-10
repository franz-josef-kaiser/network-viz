# Network Viz [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![Build Status](https://travis-ci.org/franz-josef-kaiser/network-viz.svg?branch=master)](https://travis-ci.org/franz-josef-kaiser/network-viz)

A Gexf Network Visualization Web Application.

## How to

The repository has a `gexf` directory. Simply put a file named `Untitled.gexf` there and
run the steps mentioned in [install](#install).

## Install

First download the repository with

	$ git clone https://github.com/franz-josef-kaiser/network-viz.git

To install, you need [Nodejs](nodejs.org/). Open your Terminal / Bash / Shell / Console and
enter the following (without the preceding `$`):

	$ cd network-viz

	$ npm install
	$ npm run setup
	$ npm run build

This gives you a built application. To start your local server, please run

	$ npm start

or directly run

	$ node server.js

(where the former actually just runs the later).

Your server should then be reachable on `http://localhost:8080`. If you have a port conflict,
please redefine your port to a different one than `8080`.

	$ npm config set network-viz:port 12345