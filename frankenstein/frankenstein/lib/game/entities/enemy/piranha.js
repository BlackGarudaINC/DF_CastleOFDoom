ig.module(
	'game.entities.enemy.piranha'
)
.requires(
	'game.entities.enemy.enemy'
)
.defines(function(){
	
EntityPiranha = EntityEnemy.extend({
	size: {x: 18, y: 16},
	offset: {x: 3, y: 4},
	maxVel: {x: 100, y: 300},

	attackTimer: null, 
	idleTimer: null,

	damageFlash: true, // flash when damaged
	knockback: true,
	killWhenDead: false, // use death animation
	edgeReverse: false,
	speed: 16, 		
	attackSpeed: 140,
	chargeX: 0,			// Velocity for charging at the player
	chargeY: 0,
	attackRange: 150,	// Only switch to attack mode if the player is within this distance
	gravityFactor: 0,	// Float (don't use gravity)
	isCharging: false,	// Whether or not it's charging at you while attacking
	waterEnemy: true,
	underWater: true,

	animSheet: new ig.AnimationSheet( 'media/sprites/Piranha.png', 24, 24 ),
	
	health: 4,

	// debugDraw: true,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.2, [0,1] );
		this.addAnim( 'attack', 0.1, [2,3] );
		this.addAnim( 'death', 1, [3], true);

	},

	handleTimers: function() {

		// Check if it's time to switch between moving and not moving
		if (this.attackTimer != null && this.attackTimer.delta() > 0 && this.currentAnim != this.anims.death) {
			if (!this.isCharging) {

				// Charge at the player for a few seconds
				this.attackTimer.set(3);
				this.attack();

			} else {

				// Return to normal
				this.currentAnim = this.anims.idle;
				this.attackTimer = null;
				this.wallReverse = true;
				this.isCharging = false;
				this.chargeX = 0;
				this.chargeY = 0;

				this.attackTimer = null;
				this.idleTimer = new ig.Timer(1);
			}
		}

		// Check if you're allowed to start attacking again
		if (this.idleTimer != null && this.idleTimer.delta() > 0) {
			this.idleTimer = null;
		}

		this.parent();
	},

	// Charge at the player
	attack: function() {
		this.isCharging = true;
		this.wallReverse = false;

		var xdiff = ig.game.player.pos.x - this.pos.x;
		var ydiff = ig.game.player.pos.y - this.pos.y;
		var dist  = this.distanceTo(ig.game.player);

		if (dist == 0) { dist = 0.0001; }

		this.chargeX = (xdiff / dist) * this.attackSpeed;
		this.chargeY = (ydiff / dist) * this.attackSpeed;
	},

	// Figure out how it's moving, given its current state
	setMovement: function() {
		if (this.currentAnim == this.anims.idle && this.idleTimer == null && (this.flip && ig.game.player.pos.x < this.pos.x || !this.flip && ig.game.player.pos.x > this.pos.x) && this.distanceTo(ig.game.player) < 150) {

			// Start spinning to look at the player
			this.currentAnim = this.anims.attack;
			this.attackTimer = new ig.Timer(1);

		} else if (this.currentAnim == this.anims.attack && !this.isCharging) {

			// Spin in place to face the player
			this.vel.x = 0;
			if (this.underWater) {
				this.vel.y = 0;
			}
			this.flip = (this.pos.x > ig.game.player.pos.x);
			var angle = this.angleTo(ig.game.player);
			if (this.flip) {
				angle += Math.PI;
			}
			this.currentAnim.angle = angle;
			
		} else if (this.currentAnim == this.anims.attack && this.isCharging) {

			this.vel.x = this.chargeX;
			if (this.underWater) {
				this.vel.y = this.chargeY;
			}

		} else { // Normal patrolling
			if (this.underWater) {
				this.vel.y = 0;
			}
			this.vel.x = this.flip ? -this.speed : this.speed;
		}

	},
	
	myUpdate: function() {
		
		if (!this.tempInvincible && !this.dead) {
			this.setMovement();
		}
		
		this.parent();

		this.currentAnim.flip.x = this.flip;
	},

	deathCallback: function() {
		this.vel.x = 0;
		this.gravityFactor = 0.6;

		this.parent();
	}
});

});