ig.module(
	'game.entities.player.bombexplode'
)
.requires(
	'impact.entity',
	'game.entities.player.playerattack'
)
.defines(function(){

EntityBombexplode = EntityPlayerattack.extend({

	size: {x: 16, y: 16},
	offset: {x: 0, y: 0},
	maxVel: {x: 0, y: 0},

	checkAgainst: ig.Entity.TYPE.BOTH, // the player can get hurt in the explosion too

	damage: 2,
	bounceback: 3,
		
	animSheet: new ig.AnimationSheet( 'media/sprites/Bomb_WeaponThrow.png', 16, 16 ),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'explode', 0.1, [3, 4, 5, 6, 7, 8], true );
		this.currentAnim = this.anims.explode.rewind();
	},

	// Only animate once and then die
	handleAnimations: function() {
		if (this.currentAnim.loopCount > 0) {
			this.kill();
		}
		this.parent();
	},

	// Override the damage dealing so that it doesn't get removed when it hits an enemy
	dealDamage: function( other ) {
		if (!other.dead) {
			other.receiveDamage( this.damage, this, this.bounceback );
		}
	}
});




});
