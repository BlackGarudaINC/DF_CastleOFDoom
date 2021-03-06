ig.module(
	'game.entities.player.playerattack'
)
.requires(
	'game.entities.base',
	'game.entities.enemy.enemyprojectile'
)
.defines(function(){

EntityPlayerattack = EntityBase.extend({

	_wmIgnore: true, // This entity will not be available in Weltmeister

	size: {x: 24, y: 24},
	offset: {x: 6, y: 6},
	maxVel: {x: 800, y: 400},
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/sprites/PlayerAttack.png', 24, 32 ),

	visible: true,
	damage: 1,
	killTimer: null, // Used if it just disappears eventually
	bounceback: 1, // Multiplier for how far the enemy bounces back (if applicable)
	stayAfterDamage: false, // Don't die as soon as you deal damage
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		
	},

	handleTimers: function() {
		// Check if it's time to kill this
		if (this.killTimer != null && this.killTimer.delta() > 0) {
			this.killTimer = null;
			this.kill();
		}

		this.parent();
	},

	// Give damage to the other entity on a collision
	dealDamage: function( other ) {
		if (!other.dead) {
			var dir = undefined;
			if (this.vel.x > 0) {
				dir = false;
			} else if (this.vel.x < 0) {
				dir = true;
			}
			other.receiveDamage( this.damage, this, this.bounceback, dir );
			if (!this.stayAfterDamage) {
				this.kill();
			}
		}
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		// It doesn't count when you hit an enemy projectile
		if (!(other instanceof EntityEnemyprojectile)) {
			this.dealDamage(other);
		}
		this.parent();
	}	
});



});
