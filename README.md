# Network Viz [![Build Status](http://img.shields.io/travis/franz-josef-kaiser/network-viz.svg?style=flat)](https://travis-ci.org/franz-josef-kaiser/network-viz)
 [![Dependency Status](https://david-dm.org/franz-josef-kaiser/network-viz.svg?style=flat)](https://david-dm.org/franz-josef-kaiser/network-viz)
 [![devDependency Status](https://david-dm.org/franz-josef-kaiser/network-viz/dev-status.svg?style=flat)](https://david-dm.org/franz-josef-kaiser/network-viz#info=devDependencies)

A Gexf Network Visualization Web Application.

## Technology

The software used to build this application.

[![Built with Grunt](https://raw.githubusercontent.com/franz-josef-kaiser/network-viz/master/docs/assets/img/grunt-short-flat.png)](http://gruntjs.com)
 [![Built with Bower](https://raw.githubusercontent.com/franz-josef-kaiser/network-viz/master/docs/assets/img/bower-short-flat.png)](http://bower.io)
 [![Built with Angular](https://raw.githubusercontent.com/franz-josef-kaiser/network-viz/master/docs/assets/img/angular-short-flat.png)](http://angularjs.org)
 [![Built with Git VCS](https://raw.githubusercontent.com/franz-josef-kaiser/network-viz/master/docs/assets/img/git-short-flat.png)](http://msysgit.github.io/)
 [![Runs on Node](https://raw.githubusercontent.com/franz-josef-kaiser/network-viz/master/docs/assets/img/node-short-flat.png)](http://nodejs.org)

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

This gives you a built application.

## Server

To start your local server, please run

	$ npm start

or directly run

	$ node server.js

(where the former actually just runs the later).

Your server should then be reachable on `http://localhost:8080`. If you have a port conflict,
please redefine your port to a different one than `8080`.

	$ npm config set network-viz:port 12345