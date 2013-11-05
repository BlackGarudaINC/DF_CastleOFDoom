ig.module(
	'game.entities.player.acid'
)
.requires(
	'impact.entity',
	'game.entities.player.playerattack',
	'game.entities.player.acidfire',
	'game.entities.player.acidparticle'
)
.defines(function(){

EntityAcid = EntityPlayerattack.extend({

	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	maxVel: {x: 250, y: 200},

	damage: 0.1,
	bounceback: 0.2,
		
	animSheet: new ig.AnimationSheet( 'media/sprites/Acid_ThrowWeapon.png', 8, 8 ),

	acidImpact: new ig.Sound( 'media/sounds/Weapons/AcidVile.*' ),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = -this.maxVel.y;
	},

	// Break apart into particles
	kill: function() {
		ig.game.spawnEntity( EntityAcidparticle, this.pos.x, this.pos.y, {image: 1} );
		ig.game.spawnEntity( EntityAcidparticle, this.pos.x, this.pos.y, {image: 2} );
		ig.game.spawnEntity( EntityAcidparticle, this.pos.x, this.pos.y, {image: 3} );
		ig.game.spawnEntity( EntityAcidfire, this.pos.x + 4, this.pos.y, {count: 4, direction: 1} );
		ig.game.spawnEntity( EntityAcidfire, this.pos.x - 4, this.pos.y, {count: 4, direction: -1} );

		this.acidImpact.play();

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
