ig.module(
	'game.entities.level.movingplatform'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
EntityMovingplatform = EntityBase.extend({

	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,

	gravityFactor: 0,
	ignoreCollisions: true,

	size: {x: 24, y: 8},
	offset: {x: 0, y: 0},
	animSheet: new ig.AnimationSheet( 'media/sprites/MovingPlatforms.png', 24, 8 ),
	zIndex: -5,

	speed: 20,
	stopTimer: null,

	tileImage: true,

	// The ranges for these are -1, 0, and 1, meaning negative, none, or positive movement for this platform.
	// By default, there is no movement, and you specify the directions in weltmeister
	xMove: 0,	
	yMove: 0,

	// These are the mix/max positions in either direction, defined in weltmeister
	xMin: 32,
	xMax: 288,
	yMin: 32,
	yMax: 208,

	// This is the wait time once it gets to its destination
	waitTime: 1,

	// This is the tile to use for the platform
	tile: 0,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [this.tile] );

		this.startMoving();
	},

	startMoving: function() {
		this.vel.x = this.xMove * this.speed;
		this.vel.y = this.yMove * this.speed;
	},

	myUpdate: function() {

		if (this.stopTimer == null && (this.pos.x >= this.xMax || this.pos.x <= this.xMin || this.pos.y >= this.yMax || this.pos.y <= this.yMin)) {
			this.vel.x = 0;
			this.vel.y = 0;
			this.pos.x = this.last.x;
			this.pos.y = this.last.y;
			this.xMove = -this.xMove;
			this.yMove = -this.yMove;
			if (this.waitTime > 0) {
				this.stopTimer = new ig.Timer(this.waitTime);
			} else {
				this.startMoving();
			}
		}

		this.parent();

	},

	handleTimers: function() {
		if (this.stopTimer != null && this.stopTimer.delta() > 0) {
			this.startMoving();
			this.stopTimer = null;
		}

		this.parent();
	},


	// If falling, check for crashing into the floor
	handleMovementTrace: function( res ){

		// When it hits the floor
		// if( this.falling && res.collision.y ){
		// 	this.currentAnim.stop = true;
		// 	this.flashKill();
		// 	this.falling = false;

		// 	// Spawn some random candles
		// 	ig.game.spawnEntity( EntityCandle, this.pos.x+14, this.pos.y-5, {} );
		// 	if (Math.random() < 0.66) {
		// 		ig.game.spawnEntity( EntityCandle, this.pos.x, this.pos.y-5, {} );
		// 	}
		// 	if (Math.random() < 0.66) {
		// 		ig.game.spawnEntity( EntityCandle, this.pos.x+28, this.pos.y-5, {} );
		// 	}
		// }

		this.parent( res );
	},

	// Check for the player bumping into it
	check: function( other ) {
		// if (this.currentAnim == this.anims.idle) {
		// 	this.currentAnim = this.anims.moving.rewind();
		// }
	},
	
});

});