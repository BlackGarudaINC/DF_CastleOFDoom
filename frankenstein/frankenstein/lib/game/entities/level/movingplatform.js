ig.module(
	'game.entities.level.movingplatform'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
EntityMovingplatform = EntityBase.extend({

	_wmScalable: true, // ONLY SCALE IN THE X DIRECTION! LEAVE Y AT 8!

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
	active: true,		// in weltmeister, you can start it as inactive and make a trigger activate it.

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

		if (this.active) {
			this.startMoving();
		}
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

	// Triggers can activate platforms that aren't initially active
	triggeredBy: function( entity, trigger ) {
		if (!this.active) {
			this.active = true;
			this.startMoving();
		}
	}
	
});

});