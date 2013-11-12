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

	collides: ig.Entity.COLLIDES.FIXED,

	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},

	animSheet: new ig.AnimationSheet( 'media/sprites/Spike_Trap.png', 8, 8 ),

	awake: false,
	shakeCounter: 0,
	spawnCounter: 0,
	shakeTimer: null,

	gravityFactor: 0,
	falling: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'spikeFall', 1, [0], true );

		this.currentAnim.flip.y = true;

		if (this.falling) {
			this.gravityFactor = ig.game.gravity;
			this.offset.y = 8;
		}
	},

	handleTimers: function() {
		
		// Check if it's time to fall
		if (this.awake && this.shakeTimer.delta() > 0 && this.currentAnim != this.anims.spikeFall) {
			if (this.shakeCounter < 20) {
				this.shakeTimer.set(0.1);
				this.shakeCounter += 1;
			} else {
				this.currentAnim = this.anims.spikeFall;
			}
		}

		this.parent();
	},

	handleAnimations: function() {
		if( this.currentAnim == this.anims.spikeFall && this.spawnCounter < 1 ){
			this.kill();
			this.spawnFallingSpike();
			this.spawnCounter++;
		}
	},

	spawnFallingSpike: function() {
		ig.game.spawnEntity( EntityFallingspikes, this.pos.x, this.pos.y, {falling: true} );
	},

	myUpdate: function() {

		// If not awake yet, check if close enough to start waking up
		if (!this.awake && this.distanceTo(ig.game.player) < 100) {
			this.awake = true;
			this.shakeTimer = new ig.Timer(0.1);
		}

		this.parent();
	},

	handleMovementTrace: function( res ){

		// When it hits the floor
		if( this.falling && res.collision.y ){
			this.currentAnim.stop = true;
			this.flashKill();
			this.falling = false;
		}

		this.parent( res );
	},
	
});

});