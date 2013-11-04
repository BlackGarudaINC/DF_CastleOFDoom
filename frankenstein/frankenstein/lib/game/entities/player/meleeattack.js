ig.module(
	'game.entities.player.meleeattack'
)
.requires(
	'impact.entity',
	'game.entities.player.playerattack'
)
.defines(function(){

EntityMeleeattack = EntityPlayerattack.extend({

	ignorePhysics: true,	
	visible: false,
	player: null,
	flip: false,
	attackDelayTimer: null,
	debugDraw: false,

	// REQUIRED SETTINGS:
	// flip: player's flip setting at time of attack
	// attackTime: how long the attack stays before disappearing
	// damage: How much damage the attack deals
	// width: How wide the attack box is
	// bounceback: Multiplier for how much the enemy bounces back (if applicable, 1=normal bounceback for that enemy)
	// delay: Number of seconds of a delay before the attack does anything (for slower attack animations)
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.flip = settings.flip;
		this.damage = settings.damage;
		this.size.x = settings.width;
		this.bounceback = settings.bounceback;

		// Disappear after the given amount of seconds
		this.killTimer = new ig.Timer(settings.attackTime);

		// Delay the damage for the given number of seconds
		this.attackDelayTimer = new ig.Timer(settings.delay);
	},

	handleTimers: function() {
		if (this.attackDelayTimer != null && this.attackDelayTimer.delta() > 0) {
			this.attackDelayTimer = null;
		}

		this.parent();
	},

	// Always be next to the player
	myUpdate: function() {
		if (this.flip) {
			this.pos.x = ig.game.player.pos.x - this.size.x;
		} else {
			this.pos.x = ig.game.player.pos.x + ig.game.player.size.x;
		}
		this.pos.y = ig.game.player.pos.y;

		this.parent();
	},

	// Only damage if the attack isn't delayed
	dealDamage: function( other ) {
		if (!other.dead && this.attackDelayTimer == null) {
			other.receiveDamage( this.damage, this, this.bounceback, this.flip );
			this.kill();
		}
	},
	
});



});
