"use strict";

angular.module( 'networkviz', [] )
	.controller( 'NetworkVizCtrl', [ '$scope', function( $scope ) {
		$scope.container = {
			id : 'sigma-container'
		};

		angular.element( document ).ready( function () {

			sigma.classes.graph.addMethod( 'neighbors', function( nodeId ) {
				var k,
					neighbors = {},
					index = this.allNeighborsIndex[ nodeId ] || {};

				for ( k in index )
					neighbors[ k ] = this.nodesIndex[ k ];

				return neighbors;
			} );

			sigma.parsers.gexf(
				'../gexf/Untitled.gexf',
				{
					container : 'sigma-container'
				},
				function( s ) {
					var lines = 15,
						prefix = 'file_';

					// Sort nodes:
					/*s.graph.nodes = s.graph.nodes().sort( function( a, b ) {
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
					} );*/

					function animate( p ) {
						if ( p !== prefix ) {
							prefix = p || ( prefix === 'grid_' ? 'file_' : 'grid_' );
							sigma.plugins.animate(
								s,
								{
									color : prefix + 'color',
									x     : prefix + 'x',
									y     : prefix + 'y'
								}
							);
						}
					}

					var isDown = false,
						frameID;

					/*angular.element( '#graph-container' )
						.bind( 'mouseenter', function() {
							animate( 'grid_' );
						} )
						.bind( 'mouseleave', function() {
							animate( 'file_' );
						} )
						.bind( 'touchstart', function() {
							isDown = true;
							clearTimeout( frameID );
							frameID = setTimeout( function() {
								isDown = false;
							}, 100 );
						} )
						.bind( 'touchend', function() {
							if ( isDown ) {
								animate();
							}
							isDown = false;
						} );*/

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

	} ] )
	.directive( 'graph', [ '$log', function( $log ) {
		return {
			restrict    : 'E',
			templateUrl : 'graph.html'
		}
	} ] );