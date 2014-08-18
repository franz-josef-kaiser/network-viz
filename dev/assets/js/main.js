/*globals angular, sigma */
"use strict";

angular.module( 'networkviz', [] )
	.directive( 'graph', [ '$log', function( $log ) {
		return {
			restrict    : 'E',
			templateUrl : 'graph.html',
			link        : function( $scope, elem, attr ) {
				elem
					.on( 'mouseenter', function( e ) {
						e.stopPropagation();
						e.preventDefault();
						//console.log( 'IN!' );
					} )
					.on( 'mouseleave', function( e ) {
						e.stopPropagation();
						e.preventDefault();
						//console.log( 'LEAVE' );
					} );
			}
		}
	} ] )
	.controller( 'NetworkVizCtrl', [ '$scope', function( $scope ) {
		$scope.container = {
			id : 'sigma-container'
		};

		angular.element( document ).ready( function () {
			var container = angular.element( document.querySelector( 'graph-container' ) );
			//var files = [];
			// Check if the File APIs are supported.
			/*if ( window.File && window.FileReader && window.FileList && window.Blob ) {
				// Browser engine specific targetting
				window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
				window.directoryEntry    = window.directoryEntry || window.webkitDirectoryEntry;

				var files = [];
				// Read .gexf files @TODO
				window.requestFileSystem( window.TEMPORARY, 1024*1024,
					function( fs ) {
						fs.root.getDirectory(
							'/gexf/',
							{ create : false },
							function( dirEntry ) {
								var dirReader = dirEntry.createReader();
								dirReader.readEntries( function( entries ) {
									for( var i = 0; i < entries.length; i++ ) {
										var entry = entries[i];
										if ( entry.isDirectory ) {
											console.log( 'Directory: ' + entry.fullPath );
										}
										else if ( entry.isFile ) {
											console.log( 'File: ' + entry.fullPath );
										}
									}
								} );
							},
							function( e ) {
								console.log( '.gexf source folder | ' + e.message );
							}
						);
						//console.log( this.files, fs );
					},
					function( e ) {
						console.log( 'window.requestFileSystem | ' + e.message );
					}
				);
			}
			else {
				console.log( 'The File APIs are not fully supported in this browser.' );
			}*/


			/*sigma.classes.graph.addMethod( 'neighbors', function( nodeId ) {
				var k,
					neighbors = {},
					index = this.allNeighborsIndex[ nodeId ] || {};

				for ( k in index )
					neighbors[ k ] = this.nodesIndex[ k ];

				return neighbors;
			} );*/

			sigma.parsers.gexf(
				'../gexf/Untitled.gexf',
				{
					container : 'sigma-container'
				},
				function( s ) {
					var lines  = 15,
						prefix = 'file_',
						isDown = false,
						frameID;


					// Sort by size
					s.graph.nodes = s.graph.nodes().sort( function( a, b ) {
						return + ( b.size - a.size ) * 2 - 1;
					} );

					// Set views:
					s.graph.nodes.forEach( function( node, i ) {
						node.grid_x = 100 * ( i % lines );
						node.grid_y = 100 * Math.floor( i / lines );
						node.grid_color = '#ccc';
						node.x
							= node.file_x
							= node.x;
						node.y
							= node.file_y
							= node.y;
						node.color
							= node.file_color
							= node.color;
					} );

					function animate( p ) {
						if ( p !== prefix ) {
							prefix = p || ( prefix === 'grid_' ? 'file_' : 'grid_' );

							sigma.plugins.animate( s,
								{
									color : prefix + 'color',
									x     : prefix + 'x',
									y     : prefix + 'y'
								},
								{}
							);
						}
					}

					// Initialize sigma:
					/*var s = new sigma({
						graph: graph,
						renderer: {
							container: document.getElementById('graph-container'),
							type: 'canvas'
						},
						settings: {
							enableCamera: false,
							enableHovering: false,
							mouseEnabled: false,
							drawLabels: false,
							animationsTime: 500
						}
					});*/

					$('#sigma-container').bind('mouseenter', function() {
						animate('grid_');
					}).bind('mouseleave', function() {
						animate('file_');
					}).bind('touchstart', function() {
						isDown = true;
						clearTimeout(frameID);
						frameID = setTimeout(function() {
							isDown = false;
						}, 100);
					}).bind('touchend', function() {
						if (isDown)
							animate();
						isDown = false;
					});
					return;

					// click rightClick mousedown mouseup mousemove mouseout doubleclick rightclick render
					// clickStage doubleClickStage rightClickStage
					// clickNode clickNodes doubleClickNode doubleClickNodes rightClickNode rightClickNodes
					// overNode overNodes
					// outNode
					// clickEdge doubleClickEdge doubleClickEdges
					s
						.bind( 'click', function() {
							console.log( 'mouse click' );
						} )
						.bind( 'mouseenter', function() {
							console.log( 'mouseenter' );
						} )
						.bind( 'mouseleave', function() {
							console.log( 'mouseleave' );
						} )
						.bind( 'touchstart', function() {
							console.log( 'touchstart' );
						} );

					s.graph.nodes().forEach( function( n ) {
						n.originalColor = n.color;
					} );
					s.graph.edges().forEach( function( e ) {
						e.originalColor = e.color;
					} );

					s.bind( 'clickNode', function( e ) {
						var nodeId = e.data.node.id,
							toKeep = s.graph.neighbors( nodeId );

						toKeep[ nodeId ] = e.data.node;

						s.graph.nodes().forEach( function( n ) {
							if ( toKeep[ n.id ] )
								n.color = n.originalColor;
							else
								n.color = '#eee';
						} );

						s.graph.edges().forEach( function( e ) {
							if ( toKeep[ e.source ] && toKeep[ e.target ] )
								e.color = e.originalColor;
							else
								e.color = '#eee';
						} );

						s.refresh();
					} );

					s.bind( 'clickStage', function( e ) {
						s.graph.nodes().forEach( function( n ) {
							n.color = n.originalColor;
						} );

						s.graph.edges().forEach( function( e ) {
							e.color = e.originalColor;
						} );

						s.refresh();
					} );
				}
			);
		} );

	} ] );