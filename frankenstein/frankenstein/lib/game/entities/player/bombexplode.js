ig.module(
	'game.entities.player.bombexplode'
)
.requires(
	'impact.entity',
	'game.entities.player.playerattack'
)
.defines(function(){

EntityBombexplode = EntityPlayerattack.extend({

	size: {x: 64, y: 64},
	offset: {x: 0, y: 0},
	maxVel: {x: 0, y: 0},

	checkAgainst: ig.Entity.TYPE.BOTH, // the player can get hurt in the explosion too
	collides: ig.Entity.COLLIDES.NONE,

	damage: 2,
	bounceback: 3,
	zIndex: -5,
		
	animSheet: new ig.AnimationSheet( 'media/sprites/BombBlast.png', 64, 64 ),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'explode', 0.1, [0, 1], true );
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
