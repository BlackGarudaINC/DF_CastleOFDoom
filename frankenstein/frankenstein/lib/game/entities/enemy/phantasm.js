ig.module(
	'game.entities.enemy.phantasm'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){
	
EntityPhantasm = EntityEnemy.extend({
	size: {x: 20, y: 16},
	offset: {x: 6, y: 8},
	maxVel: {x: 100, y: 100},

	collides: ig.Entity.COLLIDES.NEVER,

	attackTimer: null, // countdown to when it moves (attacks) or stands still

	damageFlash: true, // flash when damaged
	knockback: false,
	killWhenDead: false, // use death animation
	instantDeath: true, // disappear after death animation rather than flashing out
	wallReverse: false, // Don't reverse when you hit a wall
	speed: 16, 		
	alphaMin: 0.5, 		// Limit to how transparent it can get
	currAlpha: 1, 		// Current transparency value
	ignoreCollisions: true,
	attackRange: 150,	// Only switch to attack mode if the player is within this distance
	gravityFactor: 0,	// Float (don't use gravity)

	animSheet: new ig.AnimationSheet( 'media/sprites/Phantasm01.png', 32, 32 ),
	
	health: 3,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.2, [0,1] );
		this.addAnim( 'attack', 0.2, [2,3] );
		this.addAnim( 'death', 0.1, [4, 5, 6, 7], true);

		// It moves / stops moving every so often
		this.attackTimer = new ig.Timer(2);
	},

	handleTimers: function() {

		// Check if it's time to switch between moving and not moving
		if (this.attackTimer.delta() > 0 && this.currentAnim != this.anims.death) {
			if (this.currentAnim == this.anims.idle && this.distanceTo(ig.game.player) < this.attackRange) {
				this.currentAnim = this.anims.attack;
				this.attackTimer.set(2);
				this.prepareAttack();
			} else {
				this.currentAnim = this.anims.idle;
				this.attackTimer.set(5);
			}
		}

		this.parent();
	},

	// Any other ghost types that override this can make calculations when it's time to attack
	prepareAttack: function() {

	},

	// Calculate the velocities
	setVelocity: function() {
		if (this.currentAnim == this.anims.attack) { // Move towards the player

			// Change the flip value if you're not roughly in the same x loc
			if (this.pos.x - 4 > ig.game.player.pos.x || this.pos.x + 4 < ig.game.player.pos.x) {
				this.flip = (ig.game.player.pos.x > this.pos.x);
			}

			this.vel.y = (ig.game.player.pos.y > this.pos.y) ? this.speed : -this.speed;
		} else {
			this.vel.y = 0;
		}

		this.vel.x = this.flip ? this.speed : -this.speed;
	},
	
	myUpdate: function() {
		
		if (!this.tempInvincible && !this.dead) {
			this.setVelocity();
		}

		// Turn partially transparent when in a wall
		if( ig.game.collisionMap.getTile(this.pos.x + 10, this.pos.y) || ig.game.collisionMap.getTile(this.pos.x + 10, this.pos.y + this.size.y) ) {
			if (this.currAlpha > this.alphaMin) {
				this.currAlpha -= 0.01;
			}
		} else if (this.currAlpha < 1) {
			this.currAlpha += 0.01;
		}

		this.currentAnim.alpha = this.currAlpha;
		
		this.parent();

		this.currentAnim.flip.x = !this.flip;
	}
});

});