ig.module(
	'game.entities.level.watersplash'
)
.requires(
	'game.entities.particle'
)
.defines(function(){
	
EntityWatersplash = EntityParticle.extend({

	size: {x: 2, y: 2},
	offset: {x: 0, y: 0},

	animSheet: new ig.AnimationSheet( 'media/sprites/WaterSurface.png', 2, 2 ),

	removeAfterAnimation: true,
	gravityFactor: -1,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.1, [0], true );

		this.currentAnim = this.anims.idle.rewind();

		this.vel.x = 10;
		this.vel.y = 10;
		
	},
	
});

});