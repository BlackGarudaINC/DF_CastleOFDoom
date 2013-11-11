ig.module(
	'game.entities.player.dust'
)
.requires(
	'game.entities.particle'
)
.defines(function(){
	
EntityDust = EntityParticle.extend({

	// Dust from player sliding

	animSheet: new ig.AnimationSheet( 'media/sprites/Dust01.png', 32, 32 ),
	size: {x: 32, y: 32},
	offset: {x: 0, y: 0},

	removeAfterAnimation: true,
	gravityFactor: 0,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.1, [0, 1, 2, 3], true);
		this.currentAnim = this.anims.idle.rewind();

		this.vel.x = 0;
		this.vel.y = 0;
	},
	
	
});

});