ig.module(
	'game.entities.player.bomb'
)
.requires(
	'impact.entity',
	'game.entities.player.playerattack',
	'game.entities.player.bombexplode'
)
.defines(function(){

EntityBomb = EntityPlayerattack.extend({

	size: {x: 16, y: 16},
	offset: {x: 0, y: 0},
	maxVel: {x: 180, y: 250},

	damage: 0.1,
	bounceback: 0.6,
		
	animSheet: new ig.AnimationSheet( 'media/sprites/Bomb_WeaponThrow.png', 16, 16 ),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'lit', 0.15, [1, 2] );
		this.currentAnim = this.anims.lit.rewind();

		// Light the fuse...
		this.killTimer = new ig.Timer(2.5);

		this.friction.x = 200;
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = -150;
	},

	// Break apart into particles
	kill: function() {
		ig.game.spawnEntity( EntityBombexplode, this.pos.x, this.pos.y );
		this.parent();
	},

	// Override the check so that it doesn't get removed when it hits an enemy
	// and it only hurts if it's moving
	dealDamage: function( other ) {
		if (!other.dead && (Math.abs(this.vel.x) > 1 || Math.abs(this.vel.y) > 1)) {
			other.receiveDamage( this.damage, this, this.bounceback );
		}
	}
});




});
