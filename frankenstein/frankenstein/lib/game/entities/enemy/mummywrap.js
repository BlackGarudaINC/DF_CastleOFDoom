ig.module(
	'game.entities.enemy.mummywrap'
)
.requires(
	'impact.entity',
	'game.entities.enemy.bone'
)
.defines(function(){

EntityMummywrap = EntityBone.extend({

	animSheet: new ig.AnimationSheet( 'media/sprites/Mummy.png', 32, 32 ),
	size: {x: 16, y: 16},
	offset: {x: 0, y: 0},
	bounciness: 0.1,

	init: function( x, y, settings ){
		this.parent( x, y, settings );

		// Mummy Wraps
		this.addAnim( 'one', 0.3, [12] );
		this.addAnim( 'two', 0.3, [13] );
		this.addAnim( 'three', 0.3, [9] );

		// Sarcophagus Pieces
		this.addAnim( 'four', 0.3, [10] );
		this.addAnim( 'five', 0.3, [11] );

	}

});

});