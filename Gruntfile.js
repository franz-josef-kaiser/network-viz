/*global module, require, grunt, jQuery, $ */

// Grunt CLI Tasks
module.exports = function( grunt ) {
	"use strict";

	// UTF-8 w/o BOM
	grunt.file.defaultEncoding = 'utf8';
	grunt.file.preserveBOM     = false;

	// Task timer on the CLI
	require( 'time-grunt' )( grunt );

	// Project configuration.
	grunt.initConfig( {
		// All <%= pkg.variables %> are defined here
		pkg : grunt.file.readJSON( 'package.json' ),

		// All <%= site.variables %> are defined here
		config : grunt.file.readJSON( 'config/config.json' ),

		// Meant for CSS files
		// @TODO monitor if the charset doesn't get added a second time
		// by some overprotective parent via LESS or SASS/SCSS
		banner : '@charset "UTF-8";\n/*!*\n' +
			' * Package:     <%= pkg.name %>\n' +
			' * Description: <%= pkg.description %>\n' +
			' * @link        <%= pkg.author.url %>\n' +
			' * @version     <%= pkg.version %>  (<%= grunt.template.today( "yyyy-mm-dd" ) %>)\n' +
			' * @author      <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
			' * Copyright:   <%= grunt.template.today( "yyyy" ) %> <%= pkg.author.name %>\n' +
			' */\n',

		jsonlint : {
			dotfiles : {
				src : [
					'.*rc',
					'<%= config.config %>/.*rc',
					'*.json',
					'<%= config.config %>/*.json'
				]
			}
		},

		clean : {
			install : [
				'<%= config.bower %>',
				'lib'
			],
			cache   : [
				'<%= config.cache.root %>/<%= config.cache.css %>/*.css',
				'<%= config.cache.root %>/<%= config.cache.js %>/*.js'
			],
			deploy  : [
				'<%= config.deploy %>/<%= config.assets %>/*.{js,css}',
				'<%= config.deploy %>/<%= config.graphs %>/*.gexf'
			]
		},

		bower : {
			install : {
				options : {
					install        : true,
					cleanTargetDir : true,
					verbose        : true,
					layout         : 'byComponent'
				}
			}
		},

		shell : {
			modernizr : {
				command : [
					'npm install --force',
					'grunt build-contrib --force'
				].join( '&&' ),
				options: {
					stderr      : false,
					execOptions : {
						cwd : '<%= config.bower %>/modernizr'
					}
				}
			},
			sigma : {
				command : [
					'npm install --force',
					'grunt sed --force',
					'grunt uglify --force'
				].join( '&&' ),
				options: {
					execOptions : {
						cwd : '<%= config.bower %>/sigma'
					}
				}
			}
		},

		concat : {
			options : {
				separator : "\n\n"
			},
			css     : {
				src : [
					'<%= config.bower %>/normalize.css/normalize.css',
					'<%= config.dev %>/<%= config.assets %>/css/style.css',
					'<%= config.dev %>/<%= config.assets %>/css/sigma.css'
				],
				dest : '<%= config.cache.root %>/<%= config.cache.css %>/<%= config.css.main %>.css'
			},
			js      : {
				src : [
					'<%= config.bower %>/angularjs/angular.min.js',
					'<%= config.bower %>/sigma/build/sigma.min.js',
					'<%= config.bower %>/sigma/build/plugins/sigma.plugins.animate.min.js',
					'<%= config.bower %>/sigma/build/plugins/sigma.parsers.gexf.min.js',
					'<%= config.dev %>/<%= config.assets %>/js/main.js',
					'<%= config.dev %>/<%= config.assets %>/js/sigma.config.js'
				],
				//dest : '<%= config.cache.root %>/<%= config.cache.js %>/<%= config.js.main %>.js'
				dest : '<%= config.deploy %>/<%= config.assets %>/<%= config.js.main %>.js'
			}
		},

		uglify : {
			deploy  : {
				options : {
					report           : 'gzip',
					sourceMap        : true,
					sourceMapName    : '<%= config.deploy %>/<%= config.assets %>/<%= config.js.main %>.map',
					preserveComments : false,
					compress         : {
						// drop_console : true
					}
				},
				files: [ {
					expand  : true,
					flatten : true,
					filter  : 'isFile',
					//cwd     : '<%= config.cache.root %>/',
					cwd     : '<%= config.deploy %>/<%= config.assets %>',
					//src     : '<%= config.cache.js %>/**/*.js',
					src     : '**/*.js',
					dest    : '<%= config.deploy %>/<%= config.assets %>',
					ext     : '.min.js'
				} ]
			}
		},

		csscomb : {
			options : {
				config : '<%= config.config%>/.csscomb.json'
			},
			cache : {
				expand  : true,
				flatten : false,
				filter  : 'isFile',
				cwd     : '<%= config.cache.root %>/<%= config.cache.css %>',
				src     : [ '*.css' ],
				dest    : '<%= config.cache.root %>/<%= config.cache.css %>',
				ext     : '.css'
			},
			dev : {
				expand  : true,
				flatten : false,
				filter  : 'isFile',
				cwd     : '<%= config.dev %>/<%= config.assets %>/',
				src     : [ '*.css' ],
				dest    : '<%= config.dev %>/<%= config.assets %>',
				ext     : '.css'
			}
		},

		cssmin : {
			cache : {
				expand  : true,
				flatten : true,
				filter  : 'isFile',
				cwd     : '<%= config.cache.root %>/<%= config.cache.css %>',
				src     : [ '*.css', '!*.min.css' ],
				dest    : '<%= config.deploy %>/<%= config.assets %>',
				ext     : '.min.css'
			}
		},

		copy : {
			templates : {
				expand  : true,
				flatten : true,
				filter  : 'isFile',
				src     : [ '<%= config.dev %>/<%= config.tmpl.root %>/**/*.html' ],
				dest    : '<%= config.deploy %>',
				ext     : '.html'
			},
			graphs : {
				expand  : true,
				flatten : true,
				filter  : 'isFile',
				src     : [ '<%= config.graphs %>/**/*.gexf' ],
				dest    : '<%= config.deploy %>/<%= config.graphs %>',
				ext     : '.gexf'
			},
			img : {
				expand  : true,
				flatten : true,
				filter  : 'isFile',
				src     : [ '<%= config.dev %>/<%= config.assets %>/img/**.*' ],
				dest    : '<%= config.deploy %>/<%= config.assets %>/img'
			}
		}
	} );

// ====================

	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );

	grunt.loadNpmTasks( 'grunt-bower-task' );
	grunt.loadNpmTasks( 'grunt-shell' );
	grunt.loadNpmTasks( 'grunt-bower-postinst' );

	grunt.loadNpmTasks( 'grunt-jsonlint' );

	grunt.loadNpmTasks( 'grunt-contrib-concat' );

	grunt.loadNpmTasks( 'grunt-uncss' );
	grunt.loadNpmTasks( 'grunt-csscomb' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-csslint' );

	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

// ====================

	grunt.registerTask( 'install', [ 'clean:install', 'bower', 'shell' ] );

	grunt.registerTask( 'default', [
		'clean:cache',
		'clean:deploy',
		'jsonlint',
		'concat',
		'uglify',
		'csscomb',
		'cssmin',
		'copy:templates',
		'copy:graphs',
		'copy:img'
	] );

// ====================

	// Let's be a little more verbose
	grunt.event.on( 'watch', function( action, filepath, target ) {
		grunt.log.writeln( target + ': ' + filepath + ' has ' + action );
	} );
	// Watch task: Disabled so it doesn't throw an error
	// and we can run `grunt watch` on the CLI
	// This is only here as a reminder
	// grunt.registerTask( 'change', [ 'watch' ] );
};