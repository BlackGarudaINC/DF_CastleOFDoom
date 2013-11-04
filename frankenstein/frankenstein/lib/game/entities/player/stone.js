ig.module(
	'game.entities.player.stone'
)
.requires(
	'impact.entity',
	'game.entities.player.playerattack',
	'game.entities.player.stoneparticle'
)
.defines(function(){

EntityStone = EntityPlayerattack.extend({

	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	maxVel: {x: 150, y: 200},
		
	animSheet: new ig.AnimationSheet( 'media/sprites/Stone_WeaponThrow.png', 8, 8 ),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = -this.maxVel.y;
	},

	// Break apart into particles
	kill: function() {
		ig.game.spawnEntity( EntityStoneparticle, this.pos.x, this.pos.y, {image: 1} );
		ig.game.spawnEntity( EntityStoneparticle, this.pos.x, this.pos.y, {image: 1} );
		ig.game.spawnEntity( EntityStoneparticle, this.pos.x, this.pos.y, {image: 2} );
		this.parent();
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
