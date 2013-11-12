ig.module(
	'game.entities.trap.fallingspikes'
)
.requires(
	'impact.entity',
	'game.entities.trap.trap'
)
.defines(function(){
	
// Basically, just an unkillable enemy, like spikes or something
EntityFallingspikes = EntityTrap.extend({

	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},

	animSheet: new ig.AnimationSheet( 'media/sprites/Spike_Trap.png', 8, 8 ),

	awake: false,		// Whether or not it's activated yet by the player's proximity
	shakeCounter: 0,	// How many shakes before it falls
	shakeTimer: null,	// Time between vibrations
	shakeToggle: false,	// Shake to the left or right while shaking

	gravityFactor: 0,	// 0 means no gravity, 1 means regular level gravity
	falling: false,		// Whether or not it's currently falling

	tile: 0,			// Allows the designer to specify in Weltmeister which color spike to use.

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [this.tile] );

		this.currentAnim.flip.y = true;

	},

	handleTimers: function() {
		
		// Check if it's time to shake or fall
		if (this.shakeTimer != null && this.shakeTimer.delta() > 0) {
			if (this.shakeCounter < 14) {	// shake 14 times total
				this.pos.x += (this.shakeToggle ? 1 : -1);	// shake back and forth 1 pixel, based on shakeToggle
				this.shakeToggle = !this.shakeToggle;
				this.shakeTimer.reset();
				this.shakeCounter += 1;
			} else {	// stop shaking and start falling
				this.falling = true;
				this.gravityFactor = 1;
				this.shakeTimer = null;
			}
		}

		this.parent();
	},

	myUpdate: function() {

		// If not awake yet, check if close enough to start shaking
		if (!this.awake && this.distanceTo(ig.game.player) < 100) {
			this.awake = true;
			this.shakeTimer = new ig.Timer(0.05);
		}

		this.parent();
	},

	handleMovementTrace: function( res ){

		// When it hits the floor
		if( this.falling && res.collision.y ){
			this.flashKill();		// Flash out and disappear
			this.dead = true;		// this makes it no longer harmful
			this.falling = false;	// set falling to false to eliminate repeat floor collisions
		}

		this.parent( res );
	},
	
});

});