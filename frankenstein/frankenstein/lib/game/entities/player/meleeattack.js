ig.module(
	'game.entities.player.meleeattack'
)
.requires(
	'impact.entity',
	'game.entities.player.playerattack'
)
.defines(function(){

EntityMeleeattack = EntityPlayerattack.extend({

	animSheet: new ig.AnimationSheet( 'media/sprites/TheCreature01.png', 32, 32 ),

	size: {x: 32, y: 28},
	offset: {x: 0, y: 2},

	ignorePhysics: false,
	ignoreCollisions: true,
	gravityFactor: 0,
	visible: false,
	player: null,
	flip: false,
	attackDelayTimer: null,
	// debugDraw: true,
	hit: false,		// once it makes contact, this is true
	alpha: 1,

	// Settings that differ for each melee weapon type
	bounceback: 1,		// How much it knocks enemies back
	attackTime: 0.3,	// How long before the attack disappears completely
	damage: 1,			// How much damage it does
	delay: 0.1,			// How much of a delay before it actually appears
	xoffset: -16,		// How far away from the player's side does it initially start
	yoffset: 0,
	speed: 60,			// How fast it moves before disappearing

	// REQUIRED SETTINGS:
	// weapon: the ID of the given melee weapon
	// flip: which side of the player it's spawned on
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Set everything based on the weapon passed in
		switch(settings.weapon) {
		case 1: // Club
			this.addAnim( 'idle', 1, [152]);
			this.damage = 1.2;
			break;
		case 2: // Pitchfork
			this.addAnim( 'idle', 1, [154]);
			this.bounceback = 0.5;
			this.delay = 0;
			this.size.x = 26;
			this.offset.x = 3;
			this.size.y = 16;
			this.offset.y = 9;
			this.xoffset = -8;
			this.yoffset = 5;
			this.speed = 80;
			break;
		case 3: // Ball and chain
			this.addAnim( 'idle', 1, [155]);
			this.xoffset = 16;
			this.damage = 1.4;
			this.bounceback = 2.0;
			this.delay = 0.3;
			break;
		case 4: // Scythe
			this.addAnim( 'idle', 1, [156]);
			this.damage = 1.8;
			this.speed = 110;
			break;
		case 5: // Hammer
			this.addAnim( 'idle', 1, [153]);
			this.damage = 1.5
			this.bounceback = 1.5
			this.yoffset = -8;
			break;
		default: // No weapon
			// TODO: this is just placeholder for now
			this.addAnim( 'idle', 1, [155]);
			this.speed = 50
			break;
		}

		this.currentAnim = this.anims.idle.rewind();

		this.flip = settings.flip;

		

		// Delay the damage for the given number of seconds
		this.attackDelayTimer = new ig.Timer(this.delay);
	},

	handleTimers: function() {
		if (this.attackDelayTimer != null && this.attackDelayTimer.delta() > 0) {
			this.attackDelayTimer = null;
			this.visible = true;

			// Set the initial position and velocity
			if (this.flip) {
				this.pos.x = ig.game.player.pos.x - this.size.x - this.xoffset;
				this.vel.x = -this.speed;
			} else {
				this.pos.x = ig.game.player.pos.x + ig.game.player.size.x + this.xoffset;
				this.vel.x = this.speed;
			}
			this.pos.y = ig.game.player.pos.y + this.yoffset;

			// Disappear after the given amount of seconds
			this.killTimer = new ig.Timer(this.attackTime);
		}

		this.parent();
	},

	// Always be next to the player
	myUpdate: function() {
		// Check if it made contact, and if so, remove it
		if (this.hit) {
			this.kill();
		}

		this.currentAnim.flip.x = this.flip;

		if (this.visible) {
			this.alpha -= ig.system.tick * 5;
			if (this.alpha < 0.1) {
				this.alpha = 0.1;
			}
			this.currentAnim.alpha = this.alpha;
		}

		this.parent();
	},

	// Only damage if the attack isn't delayed
	dealDamage: function( other ) {
		if (!other.dead && this.attackDelayTimer == null) {
			other.receiveDamage( this.damage, this, this.bounceback, this.flip );
			this.hit = true;
		}
	},
	
});



});
