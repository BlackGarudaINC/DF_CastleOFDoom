ig.module(
	'game.entities.enemy.spidereye'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){
	
EntitySpidereye = EntityEnemy.extend({
	size: {x: 24, y: 16},
	offset: {x: 4, y: 16}, // WARNING: Do not change unless you change in the rotate function as well
	maxVel: {x: 100, y: 100},

	knockback: false,
	killWhenDead: false, // use death animation
	wallReverse: false, // Don't reverse when you hit a wall
	levelReverse: false, // Don't reverse when leaving the level
	debugDraw: false,

	// This starts on the ground, moving to the right.
	// For both values, 1 means move forward in that direction, -1 means backwards, 0 means no movement
	xdir: 1,
	ydir: 0,

	// Positions in the last frame
	lastx: 0,
	lasty: 0,

	currAngle: 0, // Current rotation of the sprite
	rotateTimer: null, // After rotating, you can't rotate again for x seconds

	animSheet: new ig.AnimationSheet( 'media/sprites/SpiderEye.png', 32, 32 ),
	
	health: 5,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.2, [0,1] );
		this.addAnim( 'walk', 0.1, [0, 2, 0, 3] );
		this.addAnim( 'pain', 1, [4] );
		this.addAnim( 'death', 0.1, [4, 5, 6, 7], true);

		this.currentAnim = this.anims.walk;

		// This crawls on walls, so don't use gravity
		this.gravityFactor = 0;

		this.lastx = this.pos.x;
		this.lasty = this.pos.y;
	},

	// Check if it's time to allow rotations again
	handleTimers: function() {
		if (this.rotateTimer != null && this.rotateTimer.delta() > 0) {
			this.rotateTimer = null;
		}
		this.parent();
	},

	// Rotate to walk on a new surface, either clockwise or counterclockwise
	rotate: function(clockwise) {
		var mult = (clockwise ? 1 : -1);

		// Change the movement direction
		var tmp = this.xdir;
		this.xdir = this.ydir * -mult;
		this.ydir = tmp * mult;

		// Change the angle
		this.currAngle += ig.game.HALFPI * mult;

		// Keep it between 0 and TWOPI
		if (this.currAngle > ig.game.TWOPI) {
			this.currAngle -= ig.game.TWOPI;
		} else if (this.currAngle < 0) {
			this.currAngle += ig.game.TWOPI;
		}

		// Change the collision box and move square to the wall
		tmp = this.size.x;
		this.size.x = this.size.y;
		this.size.y = tmp;
		if (this.xdir == 1) {
			this.offset.x = 4;
			this.offset.y = 16;
			this.pos.y += (clockwise ? 8 : 16);
		} else if (this.xdir == -1) {
			this.offset.x = 4;
			this.offset.y = 0;
			this.pos.y -= (clockwise ? 0 : 8);
			this.pos.x -= 8;
		} else if (this.ydir == 1) {
			this.offset.x = 0;
			this.offset.y = 4;
			this.pos.x -= (clockwise ? 0 : 8);
		} else if (this.ydir == -1) {
			this.offset.x = 16;
			this.offset.y = 4;
			this.pos.x += (clockwise ? 8 : 16);
			// this.pos.y -= 8;
		}

		// Set the rotate timer so that we're not endlessly rotating
		this.rotateTimer = new ig.Timer(0.5);
	},
	
	myUpdate: function() {
		
		// Walk forward, whichever direction that may be at the moment
		if (this.currentAnim != this.anims.pain && !this.dead) {
			this.vel.x = this.speed * this.xdir;
			this.vel.y = this.speed * this.ydir;
		} else {
			this.vel.x = 0;
			this.vel.y = 0;
		}

		// If we're allowed to rotate again, check for rotation conditions
		if (this.rotateTimer == null) {

			// Calculate the locations directly in front of you and below you
			var xfront = this.pos.x;
			var yfront = this.pos.y;
			// Check 3 below positions: either end and the middle
			var xbelow = this.pos.x;
			var ybelow = this.pos.y;
			var xbelow2 = this.pos.x + (this.size.x / 2);
			var ybelow2 = this.pos.y + (this.size.y / 2);
			var xbelow3 = this.pos.x + this.size.x;
			var ybelow3 = this.pos.y + this.size.y;
			if (this.xdir == 1) {
				xfront += this.size.x + 4;
				ybelow += this.size.y + 8;
				ybelow2 = ybelow;
				ybelow3 = ybelow;
			} else if (this.xdir == -1) {
				xfront -= 4;
				ybelow -= 8;
				ybelow2 = ybelow;
				ybelow3 = ybelow;
			} else if (this.ydir == 1) {
				yfront += this.size.y + 4;
				xbelow -= 8;
				xbelow2 = xbelow;
				xbelow3 = xbelow;
			} else if (this.ydir == -1) {
				yfront -= 4;
				xbelow += this.size.x + 8;
				xbelow2 = xbelow;
				xbelow3 = xbelow;
			}

			// Rotate counter-clockwise when you run into a wall
			if( ig.game.collisionMap.getTile(xfront, yfront) ) {
				this.rotate(false);
			} 

			// Rotate clockwise when there's nothing below you
			if( !ig.game.collisionMap.getTile(xbelow, ybelow) && !ig.game.collisionMap.getTile(xbelow2, ybelow2) && !ig.game.collisionMap.getTile(xbelow3, ybelow3)) {
				this.rotate(true);
			} 
		}

		this.currentAnim.angle = this.currAngle;

		this.lastx = this.pos.x;
		this.lasty = this.pos.y;
		
		this.parent();
	}
});

});