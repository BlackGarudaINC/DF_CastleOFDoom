ig.module(
	'game.entities.level.torch'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
EntityTorch = EntityBase.extend({

	collides: ig.Entity.COLLIDES.NEVER,

	gravityFactor: 0, // Just floats in place
	ignoreCollisions: true,

	size: {x: 8, y: 16},
	offset: {x: 0, y: 0},
	animSheet: new ig.AnimationSheet( 'media/sprites/Torch01.png', 8, 16 ),
	zIndex: -50,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.2, [0, 1, 2] );

	},
	
});

});