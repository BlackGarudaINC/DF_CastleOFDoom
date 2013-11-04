ig.module(
	'game.entities.enemy.gravewraith'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){
	
	EntityGravewraith = EntityEnemy.extend({
		health: 6,
		
		size: {x: 32, y: 28},
		offset: {x: 0, y: 2},
		maxVel: {x: 100, y: 100},

		attackTimer: null,	 // countdown to when it moves (attacks) or stands still

		damageFlash: true,   // Enemy flashes when damaged
		knockback: false,
		killWhenDead: false, // Use death animation
		instantDeath: true,  // Immediate removal after death animation is complete
		wallReverse: false,  // Don't reverse direction when a wall is hit
		speed: 0.6,			 // Moves independently of physics
		alphaMin: 0.5,       // Minimum alpha threshold
		currAlpha: 1,        // Current transparency value

		goldDropValue: 15,	 // Value of gold that this enemy drops

		animSheet: new ig.AnimationSheet( 'media/sprites/GraveWraith.png', 32, 32 ),

		//debugDraw: true,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			this.addAnim( 'idle', 0.17, [0,1] );
			this.addAnim( 'attack', 0.2, [2,3] );
			this.addAnim( 'death', 0.1, [4,5,6,7], true);

			// Float (don't use gravity)
			this.gravityFactor = 0;

			// It moves / stops moving every so often
			this.attackTimer = new ig.Timer(2);
		},

		handleTimers: function() {

			// Check if it's time to switch between moving and not moving
			if (this.attackTimer.delta() > 0 && this.currentAnim != this.anims.death) {
				if (this.currentAnim == this.anims.idle) {
					this.currentAnim = this.anims.attack;
					this.vel.x = 0;
					this.attackTimer.set(2);
				} else {
					this.currentAnim = this.anims.idle;
					this.attackTimer.set(5);
				}
			}

			this.parent();
		},
		
		myUpdate: function() {
			
			if (!this.tempInvincible && !this.dead) {
				if (this.currentAnim == this.anims.attack) { // Move towards the player

					// Change the flip value if you're not roughly in the same x loc
					if (this.pos.x - 4 > ig.game.player.pos.x || this.pos.x + 4 < ig.game.player.pos.x) {
						this.flip = (ig.game.player.pos.x > this.pos.x);
					}

					var ydir = (ig.game.player.pos.y > this.pos.y) ? 1 : -1;
					this.pos.y += this.speed * ydir;
				} 

				var xdir = this.flip ? 1 : -1;
				this.pos.x += this.speed * xdir;
			}

			this.currentAnim.flip.x = !this.flip;

			// Turn partially transparent when in a wall
			if( ig.game.collisionMap.getTile(this.pos.x, this.pos.y) ) {
				if (this.currAlpha > this.alphaMin) {
					this.currAlpha -= 0.01;
				}
			} else if (this.currAlpha < 1) {
				this.currAlpha += 0.01;
			}

			this.currentAnim.alpha = this.currAlpha;
			
			this.parent();
		}
	});
});