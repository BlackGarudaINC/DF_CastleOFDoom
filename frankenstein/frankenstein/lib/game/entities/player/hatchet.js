ig.module(
	'game.entities.player.hatchet'
)
.requires(
	'impact.entity',
	'game.entities.player.playerattack'
)
.defines(function(){

EntityHatchet = EntityPlayerattack.extend({

	size: {x: 12, y: 12},
	offset: {x: 2, y: 2},
	maxVel: {x: 200, y: 0},
		
	animSheet: new ig.AnimationSheet( 'media/sprites/Hatchet_WeaponThrow.png', 16, 16 ),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.gravityFactor = 0;
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.addAnim( 'throwing', 0.1, [4, 5, 6, 7]);
		
		this.currentAnim = this.anims.throwing.rewind();
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		
		// Kill upon collision with any walls
		if( res.collision.x || res.collision.y || res.collision.slope ) {
			this.kill();
		}
	}
});




});
