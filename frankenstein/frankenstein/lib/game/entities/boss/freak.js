ig.module(
	'game.entities.boss.freak'
)
.requires(
	'impact.entity',
	'game.entities.boss.boss'
)
.defines(function(){
	
EntityFreak = EntityBoss.extend({
	size: {x: 28, y: 32},
	offset: {x: 18, y: 32},
	maxVel: {x: 200, y: 600},
	friction: {x: 150, y: 0},

	edgeReverse: false,
	killWhenDead: false, // Use death animation instead of killing right away
	knockback: true,    // If they bounce back from damage
	knockbackForce: 100, // How much force pushes them back
	speed: 120,
	damageFlash: true,

	attackTimer: null, 	 // countdown to when it attacks
	
	animSheet: new ig.AnimationSheet( 'media/sprites/Freak.png', 64, 64 ),
	
	health: 3,
	// debugDraw: true,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.2, [0,1] );
		this.addAnim( 'pain', 0.2, [2,3] );
		this.addAnim( 'prepare', 0.5, [4] );
		this.addAnim( 'death', 0.1, [0, 2, 3, 5, 12, 13, 14, 15, 6], true );
		this.addAnim( 'attack', 0.1, [8, 9, 10, 11]);

		this.attackTimer = new ig.Timer(5);
		
	},

	defaultAnimation: function() {
		return this.anims.idle;
	},

	handleTimers: function() {

		// Check if it's time to attack again
		if (this.attackTimer != null && this.attackTimer.delta() > 0) {

			// Get ready to attack
			if (this.currentAnim == this.anims.idle) {
				this.currentAnim = this.anims.prepare.rewind();
				this.attackTimer = null;
				this.showsPain = false;
			} 
			
		}

		this.parent();
	},

	handleAnimations: function() {

		// Check if done preparing to attack
		if (this.currentAnim == this.anims.prepare && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.attack;
		}

		this.parent();
	},

	// Depending on the battle phase, attacks end when you hit the wall
	flipOver: function(direction) {
		var rand = Math.random();

		// It stops for the first half of the battle and randomly stops infrequently in the second half
		if (this.currentAnim == this.anims.attack && (this.phase < 2 || rand < 0.38)) {
			this.currentAnim = this.anims.idle;
			this.attackTimer = new ig.Timer(2);
			this.vel.x = 0;
			this.vel.y = 0;
			this.showPain = true;
		}

		this.parent(direction);
	},
	
	
	myUpdate: function() {

		// If idle, always look at the player
		if (this.currentAnim == this.anims.idle || this.currentAnim == this.anims.prepare) {
			this.flip = (ig.game.player.pos.x > this.pos.x);
		}

		// If attacking, move 
		if (this.currentAnim == this.anims.attack) {
			this.vel.x = (this.flip ? this.speed : -this.speed)

			// During certain phases of battle, jump while moving
			if (this.standing && (this.phase == 1 || this.phase == 3)) {
				this.vel.y = -350;
			}
		}

		this.currentAnim.flip.x = !this.flip;

		this.parent();
		
	}
});

});