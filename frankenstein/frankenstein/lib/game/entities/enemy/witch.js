ig.module(
	'game.entities.enemy.witch'
)
.requires(
	'game.entities.enemy.enemy'
)
.defines(function(){
	
EntityWitch = EntityEnemy.extend({
	size: {x: 20, y: 30},
	offset: {x: 6, y: 2},
	maxVel: {x: 100, y: 100},

	collides: ig.Entity.COLLIDES.NEVER,

	attackTimer: null, // countdown to when it attacks or goes back to moving
	shootTimer: null,	// countdown to shooting when preparing to shoot

	damageFlash: true, // flash when damaged
	knockback: false,
	killWhenDead: false, // use death animation
	wallReverse: false, // Don't reverse when you hit a wall
	levelReverse: false,
	speed: 80, 		
	alphaMin: 0.2, 		// How transparent it is while moving
	currAlpha: 0.2,		// Current transparency value
	ignoreCollisions: true,
	gravityFactor: 0,	// Float (don't use gravity)
	target: {x: 0, y: 0}, // Where it wants to move to
	fireCount: 0,		// How many shots remain while shooting at the player

	defaultAnim: null,

	animSheet: new ig.AnimationSheet( 'media/sprites/Witch.png', 32, 32 ),

	// debugDraw: true,
	
	health: 8,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.2, [0, 1, 2] );
		this.addAnim( 'attack', 0.2, [4, 5, 6] );
		this.addAnim( 'pain', 1, [3], true);
		this.addAnim( 'death', 1, [3], true);

		this.defaultAnim = this.anims.idle;
	},

	startUpdate: function() {
		this.newTarget();
		this.parent();
	},

	defaultAnimation: function() {
		return this.defaultAnim;
	},

	// Calculate the vectors needed to move towards a new target
	newTarget: function() {

		this.target.x = (Math.random()*(ig.game.levelWidth - 60)) + 30;
		this.target.y = (Math.random()*(ig.game.levelHeight - 60)) + 30;

		var xdiff = this.target.x - this.pos.x;
		var ydiff = this.target.y - this.pos.y;
		var dist = 0.0001;
		if (xdiff != 0 || ydiff != 0) {
			dist  = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2));
		} 

		this.vel.x = (xdiff / dist) * this.speed;
		this.vel.y = (ydiff / dist) * this.speed;

		this.flip = (this.target.x > this.pos.x);
	},

	handleTimers: function() {

		// Check if it's time to attack (or just move around again)
		if (this.attackTimer != null && this.attackTimer.delta() > 0 && this.currentAnim != this.anims.death) {
			if (Math.random() > 0.5) {
				this.currentAnim = this.anims.attack;
				this.defaultAnim = this.currentAnim;
				this.shootTimer = new ig.Timer(2);
				this.fireCount = 1;
			} else {
				this.newTarget();
			}
			this.attackTimer = null;
		}

		if (this.shootTimer != null && this.shootTimer.delta() > 0 && this.currentAnim != this.anims.death) {
			if (this.fireCount > 0) {
				this.shootTimer.reset();
				this.fireCount -= 1;
			} else {
				this.newTarget();
				this.shootTimer = null;
				this.currentAnim = this.anims.idle;
				this.defaultAnim = this.currentAnim;
			}
		}

		this.parent();
	},

	
	myUpdate: function() {
		this.parent();
		
		// Standing still vs. moving
		if (this.vel.x == 0 && this.vel.y == 0) {
			this.flip = (this.pos.x < ig.game.player.pos.x);

			if (this.currAlpha < 1) {
				this.currAlpha += 0.1;
				if (this.currAlpha > 1) {
					this.currAlpha = 1;
				}
			}
		} else {

			// Check if it reached the destination
			if (this.pos.x > this.target.x - 4 && this.pos.x < this.target.x + 4 && this.pos.y > this.target.y - 4 && this.pos.y < this.target.y + 4) {
				// If it's in a wall, move to a new target
				if( ig.game.collisionMap.getTile(this.pos.x + 10, this.pos.y) || ig.game.collisionMap.getTile(this.pos.x + 10, this.pos.y + this.size.y) ) {
					this.newTarget();
				} else {
					this.vel.x = 0;
					this.vel.y = 0;
					this.attackTimer = new ig.Timer(2);
				}
			}

			if (this.currAlpha > this.alphaMin) {
				this.currAlpha -= 0.1;
				if (this.currAlpha < this.alphaMin) {
					this.currAlpha = this.alphaMin;
				}
			}
		}

		this.currentAnim.alpha = this.currAlpha;
		this.currentAnim.flip.x = !this.flip;
	},

	// Stop moving when dead
	deathCallback: function() {
		this.vel.x = 0;
		this.vel.y = 0;

		this.parent();
	}
});

});