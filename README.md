# Network Viz

![Built with Grunt](https://raw.githubusercontent.com/franz-josef-kaiser/network-viz/master/docs/assets/img/grunt-short-flat.png)
![Built with Bower](https://raw.githubusercontent.com/franz-josef-kaiser/network-viz/master/docs/assets/img/bower-short-flat.png)
![Built with Angular](https://raw.githubusercontent.com/franz-josef-kaiser/network-viz/master/docs/assets/img/angular-short-flat.png)
![Built with Git VCS](https://raw.githubusercontent.com/franz-josef-kaiser/network-viz/master/docs/assets/img/git-short-flat.png)
![Runs on Node](https://raw.githubusercontent.com/franz-josef-kaiser/network-viz/master/docs/assets/img/node-short-flat.png)

[![Build Status](https://travis-ci.org/franz-josef-kaiser/network-viz.svg?branch=master)](https://travis-ci.org/franz-josef-kaiser/network-viz)
![NPM Dependencies Status](http://img.shields.io/david/franz-josef-kaiser/network-viz.svg)

A Gexf Network Visualization Web Application.

[![endorse](https://api.coderwall.com/franz-josef-kaiser/endorsecount.png)](https://coderwall.com/franz-josef-kaiser)

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