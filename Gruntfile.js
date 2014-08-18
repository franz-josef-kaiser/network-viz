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
					'*.json',
					'<%= config.config %>/.*rc',
					'<%= config.config %>/*.json'
				]
			}
		},

		clean : {
			install    : [
				'<%= config.assets.bower %>',
				'lib'
			],
			cache_css  : [ '<%= config.cache.root %>/<%= config.cache.css %>/*.css' ],
			cache_js   : [ '<%= config.cache.root %>/<%= config.cache.js %>/*.js' ],
			cache_tmpl : [ '<%= config.cache.root %>/<%= config.cache.tmpl %>/*.html' ],
			deploy     : [
				'<%= config.deploy %>/<%= config.assets.root %>/*.{html,js,css}',
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
						cwd : '<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.bower %>/modernizr'
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
						cwd : '<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.bower %>/sigma'
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
					'<%= config.assets.bower %>/normalize.css/normalize.css',
					'<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.css %>/style.css',
					'<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.css %>/sigma.css'
				],
				dest : '<%= config.cache.root %>/<%= config.cache.css %>/<%= config.css.main %>.css'
			},
			js      : {
				src : [
					'<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.bower %>/angularjs/angular.min.js',
					'<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.bower %>/sigma/build/sigma.min.js',
					//'<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.bower %>/sigma/build/plugins/sigma.plugins.dragNodes.min.js',
					'<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.bower %>/sigma/build/plugins/sigma.plugins.animate.min.js',
					'<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.bower %>/sigma/build/plugins/sigma.parsers.gexf.min.js',
					'<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.js %>/main.js',
					'<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.js %>/sigma.config.js'
				],
				dest : '<%= config.cache.root %>/<%= config.cache.js %>/<%= config.js.main %>.js'
				//dest : '<%= config.deploy %>/<%= config.assets.root %>/<%= config.js.main %>.js'
			}
		},

		uglify : {
			deploy  : {
				options : {
					report           : 'gzip',
					//sourceMap        : true,
					//sourceMapName    : '<%= config.deploy %>/<%= config.assets.root %>/<%= config.js.main %>.min.map',
					preserveComments : false,
					compress         : {
						// drop_console : true
					}
				},
				files: [ {
					expand  : true,
					flatten : true,
					filter  : 'isFile',
					cwd     : '<%= config.cache.root %>/',
					//cwd     : '<%= config.deploy %>/<%= config.assets.root %>',
					src     : '<%= config.cache.js %>/**/*.js',
					//src     : '**/*.js',
					dest    : '<%= config.deploy %>/<%= config.assets.root %>',
					//dest    : '<%= config.deploy %>/<%= config.assets.root %>',
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
				cwd     : '<%= config.dev %>/<%= config.assets.root %>/',
				src     : [ '*.css' ],
				dest    : '<%= config.dev %>/<%= config.assets.root %>',
				ext     : '.css'
			}
		},

		uncss : {
			files : {
				'<%= config.cache.root %>/<%= config.cache.css %>/<%= config.css.main %>.css' : [
					'<%= config.cache.root %>/<%= config.cache.tmpl %>/*.html'
				]
			}
		},

		cssmin : {
			cache : {
				expand  : true,
				flatten : true,
				filter  : 'isFile',
				cwd     : '<%= config.cache.root %>/<%= config.cache.css %>',
				src     : [ '*.css', '!*.min.css' ],
				dest    : '<%= config.deploy %>/<%= config.assets.root %>',
				ext     : '.min.css'
			}
		},


		xml_validator : {
			gexf : {
				src : [ '<%= config.graphs %>/**/*.gexf' ]
			}
		},

		copy : {
			templates : {
				expand  : true,
				flatten : true,
				filter  : 'isFile',
				src     : [ '<%= config.dev %>/<%= config.tmpl.root %>/**/*.html' ],
				dest    : '<%= config.deploy %>'
			},
			img : {
				expand  : true,
				flatten : true,
				filter  : 'isFile',
				src     : [ '<%= config.dev %>/<%= config.assets.root %>/<%= config.assets.img %>/**.*' ],
				dest    : '<%= config.deploy %>/<%= config.assets.root %>/<%= config.assets.img %>'
			},
			graphs : {
				expand  : true,
				flatten : true,
				filter  : 'isFile',
				src     : [ '<%= config.graphs %>/**/*.gexf' ],
				dest    : '<%= config.deploy %>/<%= config.graphs %>'
			},
			// Replacement for 'uglify' task during watch/dev as uglifying is time extensive
			js_dev : {
				expand  : true,
				flatten : true,
				filter  : 'isFile',
				src     : [ '<%= config.cache.root %>/<%= config.cache.js %>/main.js' ],
				dest    : '<%= config.deploy %>/<%= config.assets.root %>',
				ext     : '.min.js'
			}
		},

		watch : {
			options   : {
				spawn         : false,
				cwd           : '<%= config.dev %>',
				debounceDelay : 2500,
				dateFormat    : function( time ) {
					grunt.log.oklns( 'Finished in: ' + time + 'ms <<' );
				}
			},
			styles    : {
				files   : [
					'<%= config.assets.root %>/<%= config.assets.css %>/**/*.css',
					'<%= config.assets.root %>/<%= config.assets.css %>/**/*.less',
					'<%= config.assets.root %>/<%= config.assets.css %>/**/*.scss'
				],
				tasks   : [ 'clean:cache_css', 'jsonlint', 'concat:css', 'csscomb', 'cssmin' ]
			},
			images    : {
				files   : [ '<%= config.assets.root %>/<%= config.assets.img %>/**/*.*' ],
				tasks   : [ /*'clean:cache_img',*/ 'jsonlint', 'copy:img' ]
			},
			scripts   : {
				files   : [ '<%= config.assets.root %>/<%= config.assets.js %>/*.js' ],
				tasks   : [ 'clean:cache_js', 'jsonlint', 'concat:js', 'copy:js_dev', 'copy:graphs' ]
			},
			templates : {
				files   : [ '<%= config.assets.tmpl %>/**/*.html' ],
				tasks   : [ 'clean:cache_tmpl', 'jsonlint', 'copy:templates' ]
			}
		}
	} );

// ====================

	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );

	grunt.loadNpmTasks( 'grunt-bower-task' );
	grunt.loadNpmTasks( 'grunt-shell' );

	grunt.loadNpmTasks( 'grunt-jsonlint' );

	grunt.loadNpmTasks( 'grunt-contrib-concat' );

	//grunt.loadNpmTasks( 'grunt-uncss' );
	grunt.loadNpmTasks( 'grunt-csscomb' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-csslint' );

	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.loadNpmTasks( 'grunt-xml-validator' );

// ====================

	grunt.registerTask( 'install', [ 'clean:install', 'bower', 'shell' ] );

	grunt.registerTask( 'default', [
		'clean:cache_css', 'clean:cache_js', 'clean:cache_tmpl',
		'clean:deploy',
		'jsonlint',
		'concat',
		'uglify',
		'csscomb',
		//'uncss',
		'cssmin',
		'copy:templates',
		'xml_validator',
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